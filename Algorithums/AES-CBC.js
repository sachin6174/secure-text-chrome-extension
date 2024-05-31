async function deriveKeyAES(password, salt) {
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
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

export async function encryptCBC(text, password) {
  const salt = new Uint8Array(16);
  const iv = new Uint8Array(16);
  const key = await deriveKeyAES(password, salt);
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
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

export async function decryptCBC(encryptedBase64, password) {
  const combinedArray = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
  const salt = combinedArray.slice(0, 16);
  const iv = combinedArray.slice(16, 32);
  const encryptedArray = combinedArray.slice(32);
  const key = await deriveKeyAES(password, salt);

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: iv
      },
      key,
        encryptedArray
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (e) {
    // Handle decryption error (e.g., wrong password)
    alert("Please check text and password.");
    return "";
  }
}
