// Kullanıcının çift tıkladığı kelimeyi yakala ve kaydet
document.addEventListener('dblclick', () => {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText) {
      // Arka plana kelimeyi gönder ve kaydet
      chrome.runtime.sendMessage({ action: "saveWord", word: selectedText }, (response) => {
        console.log(response.message || "Kelime kaydedildi!");
  
        // Kaydedilen kelimeyi renklendir
        highlightWord(selectedText);
      });
    }
  });
  
  // Kelimeyi vurgulayan işlev
  function highlightWord(word) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    document.body.innerHTML = document.body.innerHTML.replace(regex, (match) => {
      return `<span style="background-color: yellow; color: black;">${match}</span>`;
    });
  }
  // Arka plandan gelen mesajları dinle
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "highlightWord") {
      highlightWord(message.word);
    }
  });
  // Kaydedilen kelimeleri vurgula
function highlightSavedWords() {
    chrome.storage.local.get({ words: [] }, (result) => {
      const words = result.words || [];
      words.forEach((word) => {
        highlightWord(word);
      });
    });
  }
  
  // Sayfa yüklendiğinde kaydedilen kelimeleri renklendir
  document.addEventListener('DOMContentLoaded', () => {
    highlightSavedWords();
  });
  
  