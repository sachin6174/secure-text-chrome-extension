document
  .getElementById("encryptModeBtn")
  .addEventListener("click", showEncrypt);
document
  .getElementById("decryptModeBtn")
  .addEventListener("click", showDecrypt);
document.getElementById("encryptBtn").addEventListener("click", encryptText);
document.getElementById("decryptBtn").addEventListener("click", decryptText);
document
  .getElementById("copyEncryptedBtn")
  .addEventListener("click", copyToClipboard);
document
  .getElementById("copyDecryptedBtn")
  .addEventListener("click", copyToClipboardDecrypted);

function showEncrypt() {
  document.getElementById("encryptModeBtn").style.backgroundColor = "#017BFE";
  document.getElementById("decryptModeBtn").style.backgroundColor = "#4DBB78";
  document.getElementById("encryptSection").classList.remove("hidden");
  document.getElementById("decryptSection").classList.add("hidden");
}

function showDecrypt() {
  document.getElementById("decryptModeBtn").style.backgroundColor = "#017BFE";

  document.getElementById("encryptModeBtn").style.backgroundColor = "#4DBB78";

  document.getElementById("encryptSection").classList.add("hidden");
  document.getElementById("decryptSection").classList.remove("hidden");
}

function encryptText() {
  const text = document.getElementById("textString").value;
  const password = document.getElementById("encryptionPassword").value;
  if (text && password) {
    const encrypted = btoa(text + password); // Simple base64 encoding for demo
    document.getElementById("encryptedData").value = encrypted;
  } else {
    alert("Please enter both text and password to encrypt.");
  }
  blurBackground();
}

function decryptText() {
  const encryptedText = document.getElementById("encryptedString").value;
  const password = document.getElementById("decryptionPassword").value;
  if (encryptedText && password) {
    const decrypted = atob(encryptedText);
    const text = decrypted.replace(password, "");
    document.getElementById("decryptedData").value = text;
  } else {
    alert("Please enter both encrypted data and password to decrypt.");
  }
  blurBackground();
}

function copyToClipboard() {
  const encryptedData = document.getElementById("encryptedData");
  encryptedData.select();
  document.execCommand("copy");
  const copyButton = document.getElementById("copyEncryptedBtn");
  copyButton.style.backgroundColor = "#808080";
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.style.backgroundColor = "#e0e0e0";
    copyButton.textContent = "Copy";
  }, 2000);
  blurBackground();
}

function copyToClipboardDecrypted() {
  const decryptedData = document.getElementById("decryptedData");
  decryptedData.select();
  document.execCommand("copy");
  const copyButton = document.getElementById("copyDecryptedBtn");
  copyButton.style.backgroundColor = "#d0d0d0";
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.style.backgroundColor = "#e0e0e0";
    copyButton.textContent = "Copy";
  }, 5000);
  blurBackground();
}

function blurBackground() {
  document.body.classList.add("blur");
  setTimeout(() => {
    document.body.classList.remove("blur");
  }, 2000);
}
