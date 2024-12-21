// DOM elementlerini seçiyoruz
const wordInput = document.getElementById('wordInput');
const addWordButton = document.getElementById('addWordButton');
const wordList = document.getElementById('wordList');

// Yerel depolamadan kelimeleri yükle
function loadWords() {
  const words = JSON.parse(localStorage.getItem('words')) || [];
  words.forEach(word => {
    addWordToList(word);
  });
}

// Kelimeleri yerel depolama kaydet
function saveWords(words) {
  localStorage.setItem('words', JSON.stringify(words));
}

// Kelimeyi listeye ekleyen işlev
function addWordToList(word) {
  const li = document.createElement('li');
  li.textContent = word;

  // Silme butonu
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Sil';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', () => {
    removeWordFromList(word);
  });

  li.appendChild(deleteButton);
  wordList.appendChild(li);
}

// Kelimeyi listeden silme işlevi
function removeWordFromList(word) {
  let words = JSON.parse(localStorage.getItem('words')) || [];
  words = words.filter(w => w !== word);
  saveWords(words);
  wordList.innerHTML = '';
  loadWords();
}

// Kelime ekleme işlevi
addWordButton.addEventListener('click', () => {
  const word = wordInput.value.trim();
  if (word !== '') {
    addWordToList(word);

    let words = JSON.parse(localStorage.getItem('words')) || [];
    words.push(word);
    saveWords(words);

    wordInput.value = '';
  }
});

// Sayfa yüklendiğinde kelimeleri yerel depolamadan yükle


addWordButton.addEventListener('click', () => {
    const word = wordInput.value.trim();
    if (word !== '') {
      // Arka plana mesaj gönder
      chrome.runtime.sendMessage(
        { action: "saveWord", word },
        (response) => {
          console.log(response.message); // "Kelime kaydedildi!"
        }
      );
      wordInput.value = '';
    }
  });

  // Yerel depolamadan kelimeleri yükle
function loadWords() {
    chrome.storage.local.get({ words: [] }, (result) => {
      const words = result.words;
      wordList.innerHTML = '';
      words.forEach(word => {
        addWordToList(word);
      });
    });
  }
  
  // Sayfa yüklendiğinde kelimeleri yükle
  document.addEventListener('DOMContentLoaded', () => {
    loadWords();
  });
  

  loadWords();