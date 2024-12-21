// Uzantının yüklendiğinde çalışacak kod
chrome.runtime.onInstalled.addListener(() => {
    console.log("Kelime Kaydetme Uygulaması uzantısı başarıyla yüklendi!");
  });
  
  // Pop-up ile iletişim kurmak için bir mesaj dinleyici ekleyelim
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveWord") {
      saveWordToStorage(message.word);
      sendResponse({ status: "success", message: "Kelime kaydedildi!" });
    }
  });
  
  // Kelimeyi Chrome'un yerel depolamasına kaydeden işlev
  function saveWordToStorage(word) {
    chrome.storage.local.get({ words: [] }, (result) => {
      const updatedWords = [...result.words, word];
      chrome.storage.local.set({ words: updatedWords }, () => {
        console.log(`${word} kelimesi başarıyla kaydedildi!`);
      });
    });
  }
  
  // Kelimeyi Chrome'un yerel depolamasına kaydet
// Mesaj dinleyici: kelimeyi kaydeder ve gönderir
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveWord") {
      const word = message.word;
      chrome.storage.local.get({ words: [] }, (result) => {
        const updatedWords = [...new Set([...result.words, word])]; // Aynı kelimeyi iki kez ekleme
        chrome.storage.local.set({ words: updatedWords }, () => {
          console.log(`${word} kelimesi başarıyla kaydedildi!`);
          sendResponse({ status: "success", message: "Kelime başarıyla kaydedildi!" });
  
          // Tarayıcı sekmesine vurgulama mesajı gönder
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "highlightWord", word });
          });
        });
      });
  
      return true; // Asenkron işlem için true döndür
    }
  });
  
  