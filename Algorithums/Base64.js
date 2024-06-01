export function encodeToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function decodeFromBase64(encodedStr) {
  try {
    return decodeURIComponent(escape(atob(encodedStr)));
  } catch (e) {
    // Handle decryption error (e.g., wrong password)
    alert("Either selceted algorithm or encrypted string is wrong.");
    return "";
  }
}


