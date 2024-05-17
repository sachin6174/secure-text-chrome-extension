document.getElementById('encrypt-button').addEventListener('click', function() {
  document.getElementById('encrypt-section').style.display = 'block';
  document.getElementById('decrypt-section').style.display = 'none';
});

document.getElementById('decrypt-button').addEventListener('click', function() {
  document.getElementById('encrypt-section').style.display = 'none';
  document.getElementById('decrypt-section').style.display = 'block';
});

document.getElementById('copy-encrypted').addEventListener('click', function() {
  copyToClipboard(document.getElementById('encrypted-data').value);
});

document.getElementById('copy-decrypted').addEventListener('click', function() {
  copyToClipboard(document.getElementById('decrypted-data').value);
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Text copied to clipboard');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
}

document.getElementById('encrypt-button').addEventListener('click', function() {
  const text = document.getElementById('text-string').value;
  const password = document.getElementById('encryption-password').value;
  const encryptedData = encryptText(text, password);
  document.getElementById('encrypted-data').value = encryptedData;
});

document.getElementById('decrypt-button').addEventListener('click', function() {
  const encryptedString = document.getElementById('encrypted-string').value;
  const password = document.getElementById('decryption-password').value;
  const decryptedData = decryptText(encryptedString, password);
  document.getElementById('decrypted-data').value = decryptedData;
});

function encryptText(text, password) {
  // Simple encryption logic (use a proper encryption library for better security)
  return btoa(text + password);
}

function decryptText(encryptedText, password) {
  // Simple decryption logic (use a proper decryption library for better security)
  const decodedText = atob(encryptedText);
  return decodedText.replace(password, '');
}
