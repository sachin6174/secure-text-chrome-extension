export function encodeToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function decodeFromBase64(encodedStr) {
    return decodeURIComponent(escape(atob(encodedStr)));
}

