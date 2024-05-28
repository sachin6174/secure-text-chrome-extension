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

  export async function encryptGCM(text, password) {
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

  export async function decryptGCM(encryptedBase64, password) {
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
      alert("Please enter correct password.");
      return "";
    }
  }