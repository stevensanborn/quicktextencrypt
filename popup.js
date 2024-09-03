document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedText = urlParams.get('text');
  if (encodedText) {
    try {
      const decodedText = atob(decodeURIComponent(encodedText));
      document.getElementById('text').value = decodedText;
    } catch (error) {
      console.error('Error decoding text:', error);
    }
  }

  document.getElementById('encrypt').addEventListener('click', encrypt);
  document.getElementById('decrypt').addEventListener('click', decrypt);
  document.getElementById('copyButton').addEventListener('click', copyToClipboard);
});

function encrypt() {
  const text = document.getElementById('text').value;
  const pin = document.getElementById('pin').value;
  try {
    const encrypted = CryptoJS.AES.encrypt(text, pin).toString();
    setResult(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    setResult('Encryption failed. Please try again.');
  }
}

function decrypt() {
  const encryptedText = document.getElementById('text').value;
  const pin = document.getElementById('pin').value;
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, pin);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (decryptedText) {
      setResult(decryptedText);
    } else {
      throw new Error('Decryption resulted in empty string');
    }
  } catch (error) {
    console.error('Decryption error:', error);
    setResult('Decryption failed. Please check your PIN and try again.');
  }
}

function setResult(text) {
  document.getElementById('result').value = text;
  document.getElementById('copyButton').style.display = 'inline-block';
}

function copyToClipboard() {
  const resultText = document.getElementById('result');
  resultText.select();
  document.execCommand('copy');
  
  const copyButton = document.getElementById('copyButton');
  const originalText = copyButton.textContent;
  copyButton.textContent = 'Copied!';
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 1500);
}
