document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("encryptModeBtn").addEventListener("click", showEncrypt);
  document.getElementById("decryptModeBtn").addEventListener("click", showDecrypt);

  document.getElementById("copyEncryptedBtn").addEventListener("click", copyToClipboard);
  document.getElementById("copyDecryptedBtn").addEventListener("click", copyToClipboardDecrypted);

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

  async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    return key;
  }

  async function encrypt(text, password) {
    const salt = new Uint8Array(16); // Fixed salt (all zeros)
    const iv = new Uint8Array(12);   // Fixed IV (all zeros)
    const key = await deriveKey(password, salt);
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      data
    );

    const encryptedArray = new Uint8Array(encrypted);
    const combinedArray = new Uint8Array(salt.length + iv.length + encryptedArray.length);
    combinedArray.set(salt);
    combinedArray.set(iv, salt.length);
    combinedArray.set(encryptedArray, salt.length + iv.length);

    return btoa(String.fromCharCode.apply(null, combinedArray));
  }

  async function decrypt(encryptedBase64, password) {
    const combinedArray = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const salt = combinedArray.slice(0, 16);
    const iv = combinedArray.slice(16, 28);
    const encryptedArray = combinedArray.slice(28);
    const key = await deriveKey(password, salt);

    try {
      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        encryptedArray
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (e) {
      // Handle decryption error (e.g., wrong password)
      return "wrong password";
    }
  }

  document.getElementById('encryptBtn').addEventListener('click', async () => {
    const textToEncrypt = document.getElementById("textString").value;
    const password = document.getElementById("encryptionPassword").value;
    if (textToEncrypt && password) {
      const encryptedText = await encrypt(textToEncrypt, password);
      document.getElementById('encryptedData').value = encryptedText;
    } else {
      alert("Please enter both text and password to encrypt.");
    }
  });

  document.getElementById('decryptBtn').addEventListener('click', async () => {
    const encryptedText = document.getElementById("encryptedString").value;
    const password = document.getElementById("decryptionPassword").value;
    if (encryptedText && password) {
      const decryptedText = await decrypt(encryptedText, password);
      document.getElementById("decryptedData").value = decryptedText;
    } else {
      alert("Please enter both encrypted data and password to decrypt.");
    }
  });
});
