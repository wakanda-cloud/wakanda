'use strict';

var CryptoJS = require("crypto-js");

class SecurityService {

    decryptJSON(text) {
        let bytes = CryptoJS.AES.decrypt(text, process.env.DECRYPT_KEY, {
            mode: CryptoJS.mode.CTR
        });

        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}
module.exports = SecurityService;