import { encryptGCM, decryptGCM } from "./Algorithums/AES-GCM.js";
import { encryptCBC, decryptCBC } from "./Algorithums/AES-CBC.js";
import { encodeToBase64, decodeFromBase64 } from "./Algorithums/Base64.js";
import { encryptHMAC, decryptHMAC } from "./Algorithums/HMAC.js";
import { base32Encode, base32Decode } from "./Algorithums/Base32.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll('input[name="encryption-type"]')
    .forEach((radio) => {
      radio.addEventListener("change", (event) => {
        console.log(`Selected encryption type: ${event.target.value}`);
        let passwordInput = document.getElementById("encryptionPassword");
        if (event.target.value == "BASE32" || event.target.value == "BASE64") {
          passwordInput.value = "";
          passwordInput.disabled = true;
          passwordInput.style.backgroundColor = "#d3d3d3";
        } else {
          passwordInput.disabled = false;
          passwordInput.style.backgroundColor = "";
        }
      });
    });
  document
    .getElementById("encryptModeBtn")
    .addEventListener("click", showEncrypt);
  document
    .getElementById("decryptModeBtn")
    .addEventListener("click", showDecrypt);

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
  }

  function copyToClipboardDecrypted() {
    const decryptedData = document.getElementById("decryptedData");
    decryptedData.select();
    document.execCommand("copy");
    const copyButton = document.getElementById("copyDecryptedBtn");
    copyButton.style.backgroundColor = "#808080";
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.style.backgroundColor = "#e0e0e0";
      copyButton.textContent = "Copy";
    }, 2000);
  }

  document.getElementById("encryptBtn").addEventListener("click", async () => {
    const selectedRadioButton = document.querySelector(
      'input[name="encryption-type"]:checked'
    ).value;
    console.log(selectedRadioButton);
    const textToEncrypt = document.getElementById("textString").value;
    const password = document.getElementById("encryptionPassword").value;
    let encryptedText;

    switch (selectedRadioButton) {
      case "AES-GCM":
        encryptedText = await encryptGCM(textToEncrypt, password);
        break;
      case "AES-CBC":
        encryptedText = await encryptCBC(textToEncrypt, password);
        break;
      case "BASE64":
        encryptedText = await encodeToBase64(textToEncrypt, password);
        break;
      case "BASE32":
        encryptedText = await base32Encode(textToEncrypt, password);
        break;
      default:
        return "Unknown encryption method.";
    }
    document.getElementById("encryptedData").value = encryptedText;
  });

  document.getElementById("decryptBtn").addEventListener("click", async () => {
    const selectedRadioButton = document.querySelector(
      'input[name="encryption-type"]:checked'
    ).value;
    const encryptedText = document.getElementById("encryptedString").value;
    const password = document.getElementById("decryptionPassword").value;
    let decryptedText;

    switch (selectedRadioButton) {
      case "AES-GCM":
        decryptedText = await decryptGCM(encryptedText, password);
        break;
      case "AES-CBC":
        decryptedText = await decryptCBC(encryptedText, password);
        break;
      case "BASE64":
        decryptedText = await decodeFromBase64(encryptedText, password);
        break;
      case "BASE32":
        decryptedText = await base32Decode(encryptedText, password);
        break;
      default:
        return "Unknown encryption method.";
    }
    document.getElementById("decryptedData").value = decryptedText;
  });
});
