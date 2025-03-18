document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.getElementById('copyButton');
  
    copyButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
  
        chrome.scripting
        .executeScript({
          target: { tabId: activeTab.id },
          function: function () {
            const katexMathML = document.querySelector('.katex-mathml');
            const annotations = katexMathML.querySelectorAll('annotation');
            const lastAnnotation = annotations[annotations.length - 1];
            return lastAnnotation ? lastAnnotation.textContent : '';
          },
        }, function (result) {
          const latexExpression = result[0].result;
  
          // Use Clipboard API to copy the LaTeX expression to clipboard
          navigator.clipboard.writeText(latexExpression)
            .then(function () {
              console.log('LaTeX expression copied to clipboard:', latexExpression);
              window.close();
            })
            .catch(function (err) {
              console.error('Error copying to clipboard:', err);
            });
        });
      });
    });
  });
