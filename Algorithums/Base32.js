const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(input) {
  let output = "";
  let buffer = 0;
  let bitsLeft = 0;

  for (let i = 0; i < input.length; i++) {
    buffer = (buffer << 8) | input.charCodeAt(i);
    bitsLeft += 8;

    while (bitsLeft >= 5) {
      const index = (buffer >> (bitsLeft - 5)) & 31;
      output += base32Chars[index];
      bitsLeft -= 5;
    }
  }

  if (bitsLeft > 0) {
    const index = (buffer << (5 - bitsLeft)) & 31;
    output += base32Chars[index];
  }

  return output;
}

export function base32Decode(input) {
  const base32Lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let output = "";
  let buffer = 0;
  let bitsLeft = 0;

  input = input.toUpperCase().replace(/=+$/, "");

  for (let i = 0; i < input.length; i++) {
    const index = base32Lookup.indexOf(input[i]);
    if (index === -1) {
      throw new Error("Invalid Base32 character");
    }

    buffer = (buffer << 5) | index;
    bitsLeft += 5;

    if (bitsLeft >= 8) {
      output += String.fromCharCode((buffer >> (bitsLeft - 8)) & 255);
      bitsLeft -= 8;
    }
  }

  return output;
}

