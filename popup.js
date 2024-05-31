import { encryptGCM, decryptGCM } from "./Algorithums/AES-GCM.js";
import { encryptCBC, decryptCBC } from "./Algorithums/AES-CBC.js";
import { encodeToBase64, decodeFromBase64 } from "./Algorithums/Base64.js";
import { base32Encode, base32Decode } from "./Algorithums/Base32.js";

document.addEventListener("DOMContentLoaded", () => {

    let selectedSection = "Encrypt"
    let selectedAlgo = "AES-GCM"
    document.getElementById("copyDataBtn").addEventListener("click", copyToClipboard);

    document.querySelectorAll('input[name="encryption-type"]').forEach(radio => {
        radio.addEventListener('click', () => {
            if (selectedAlgo != radio.id) {
                document.getElementById("encryptedDecryptedData").value= ""
            }
            selectedAlgo = radio.id
            console.log(radio.id);
            let passwordInput = document.getElementById("passwordBox");
            if (radio.id== "BASE32" || radio.id == "BASE64") {
                passwordInput.value = "";
                passwordInput.disabled = true;
                passwordInput.style.backgroundColor = "#d3d3d3";
                passwordInput.placeholder = "No password required"
            } else {
                passwordInput.disabled = false;
                passwordInput.style.backgroundColor = "";
                passwordInput.placeholder = "Enter password"
            }
        });
    });

    function displayEncrypt(){
        if (selectedSection == "Decrypt"){
            selectedSection = "Encrypt"
            document.getElementById("encryptModeBtn").style.backgroundColor = "#007bff"
            document.getElementById("decryptModeBtn").style.backgroundColor = "#4ebb78"

            document.getElementById("methodLabel").innerHTML = "Select Encryption Method"
            document.getElementById("stringLabel").innerHTML = "Text String"
            document.getElementById("passwordLabel").innerHTML = "Encryption Password"
            document.getElementById("encryptDecryptBtn").innerHTML = "Encrypt"
            document.getElementById("resultLabel").innerHTML = "Encrypted Data"

            document.getElementById("stringBox").value = ""
            document.getElementById("stringBox").placeholder = "Enter text to encrypt"
            document.getElementById("passwordBox").value = ""
            document.getElementById("encryptedDecryptedData").value= ""
        }
    }

    function displayDecrypt(){
        if (selectedSection == "Encrypt"){
            selectedSection = "Decrypt"
            document.getElementById("encryptModeBtn").style.backgroundColor = "#4ebb78"
            document.getElementById("decryptModeBtn").style.backgroundColor = "#007bff"

            document.getElementById("methodLabel").innerHTML = "Select Decryption Method"
            document.getElementById("stringLabel").innerHTML = "Encrypted String"
            document.getElementById("passwordLabel").innerHTML = "Decryption Password"
            document.getElementById("encryptDecryptBtn").innerHTML = "Decrypt"
            document.getElementById("resultLabel").innerHTML = "Decrypted Data"

            document.getElementById("stringBox").value = ""
            document.getElementById("stringBox").placeholder = "Enter text to decrypt"
            document.getElementById("passwordBox").value = ""
            document.getElementById("encryptedDecryptedData").value= ""
        }
    }

    document.getElementById('encryptModeBtn').addEventListener('click', function() {
        console.log('Encrypt mode selected');
        displayEncrypt()
        
    });

    document.getElementById('decryptModeBtn').addEventListener('click', function() {
        console.log('Decrypt mode selected');
        displayDecrypt()
    });

    document.getElementById("encryptDecryptBtn").addEventListener("click", async () => {

        document.getElementById("encryptedDecryptedData").value = ""
        const stringToOperate = document.getElementById("stringBox").value;
        const password = document.getElementById("passwordBox").value;

        if (selectedSection === "Encrypt"){

            if (selectedAlgo == "BASE64" ||selectedAlgo == "BASE32"){
                if (stringToOperate == ""){
                    alert("Please enter text to encrypt.")
                    return
                }
            }else{
                if (stringToOperate == "" || password == ""){
                    alert("Please enter both text and password to encrypt.")
                    return
                }
            }

            let encryptedTextOutput;

            switch (selectedAlgo) {
            case "AES-GCM":
                encryptedTextOutput = await encryptGCM(stringToOperate, password);
                break;
            case "AES-CBC":
                encryptedTextOutput = await encryptCBC(stringToOperate, password);
                break;
            case "BASE64":
                encryptedTextOutput =  encodeToBase64(stringToOperate, password);
                break;
            case "BASE32":
                encryptedTextOutput =  base32Encode(stringToOperate, password);
                break;
            default:
                return "Unknown encryption method.";
            }
            document.getElementById("encryptedDecryptedData").value = encryptedTextOutput;

        }else{

            if (selectedAlgo == "BASE64" ||selectedAlgo == "BASE32"){
                if (stringToOperate == ""){
                    alert("Please enter text to decrypt.")
                    return 
                }
            }else{
                if (stringToOperate == "" || password == ""){
                    alert("Please enter both text and password to encrypt.")
                    return
                }
            }

            let decryptedTextOutput;

            switch (selectedAlgo) {
            case "AES-GCM":
                decryptedTextOutput = await decryptGCM(stringToOperate, password);
                break;
            case "AES-CBC":
                decryptedTextOutput = await decryptCBC(stringToOperate, password);
                break;
            case "BASE64":
                decryptedTextOutput =  decodeFromBase64(stringToOperate, password);
                break;
            case "BASE32":
                decryptedTextOutput =  base32Decode(stringToOperate, password);
                break;
            default:
                return "Unknown decryption method.";
            }
            document.getElementById("encryptedDecryptedData").value = decryptedTextOutput;
        }

    });

     function copyToClipboard() {
        const outputData = document.getElementById("encryptedDecryptedData");
        outputData.select();
        document.execCommand("copy");
        const copyButton = document.getElementById("copyDataBtn");
        copyButton.style.backgroundColor = "#808080";
        copyButton.textContent = "Copied";
        setTimeout(() => {
        copyButton.style.backgroundColor = "#e0e0e0";
        copyButton.textContent = "Copy";
        }, 2000);
    }


})