# About Secure Text

![Icon](./icons/icon128.png)

Secure Text is a chrome web extension which can help you to encrypt the text that you will provide with the password and then that encrypted text can be shared to the other person can then password can be shared over phone call ,which will ensure that only original person will read the text after decryption.


### Encryption Algorithum Supported

##### 1.AES-GCM :
 AES-GCM stands for Advanced Encryption Standard - Galois/Counter Mode. It is a symmetric encryption algorithm that combines the AES block cipher with GCM for both encryption and authentication, ensuring data confidentiality and integrity.
 
##### 2.AES-CBC :
AES-CBC (Advanced Encryption Standard-Cipher Block Chaining) is a symmetric encryption algorithm that encrypts data in fixed-size blocks using a cipher key and an initialization vector (IV) for added security. In CBC mode, each block of plaintext is XORed with the previous ciphertext block before being encrypted, ensuring that identical plaintext blocks produce different ciphertext blocks.

##### 3.HMAC :
HMAC, which stands for Hash-based Message Authentication Code, is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It can be represented simply as HMAC(key, message) = hash(key XOR opad || hash(key XOR ipad || message)), where opad and ipad are fixed, predefined padding constants.


##### 4.HMAC :
HMAC, which stands for Hash-based Message Authentication Code, is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It can be represented simply as HMAC(key, message) = hash(key XOR opad || hash(key XOR ipad || message)), where opad and ipad are fixed, predefined padding constants.

##### 5.RAS-PSS :
RSA-PSS (Probabilistic Signature Scheme) is a cryptographic algorithm that enhances the RSA signature scheme by incorporating a random salt value to generate probabilistic signatures, which improves security by ensuring that each signature is unique even for the same message and private key. The algorithm follows the steps of generating a hash of the message, incorporating a salt, and using the RSA private key to produce the signature, thus ensuring both the security and authenticity of the signed message.

##### 6.RSA-OAEP :
RSA-OAEP (RSA Optimal Asymmetric Encryption Padding) is a public-key cryptosystem that enhances the security of RSA encryption by using a combination of RSA encryption and OAEP padding to provide message confidentiality and integrity. OAEP (Optimal Asymmetric Encryption Padding) involves adding padding to the plaintext before RSA encryption, which helps prevent chosen plaintext attacks and provides semantic security by ensuring that the same plaintext will result in different ciphertexts each time it is encrypted.


### Encoding Algorithm Supported

##### 1.BASE-64 : [NO]
Base64 is an encoding scheme that converts binary data into an ASCII string format. This is done to ensure the data remains intact without modification during transport. It uses a specific 64-character alphabet.

##### 1.BASE-32 : [NO]
Base64 is an encoding scheme that converts binary data into an ASCII string format. This is done to ensure the data remains intact without modification during transport. It uses a specific 64-character alphabet.


### Extension Link
![Icon](./pulblishing%20extension/md1.png)
| ![Icon](./pulblishing%20extension/md2.png) | ![Icon](./pulblishing%20extension/md3.png) |
|:------------------------------------------:|:------------------------------------------:|

[Click here to check our extension...](https://chrome.google.com/webstore/detail/ankgchfieiimiijhlcjcongijapefmei)