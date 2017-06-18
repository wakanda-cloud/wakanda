'use strict'

var CryptoJS = require("crypto-js");
var bytes = require('bytes')

var securityService = function () {};

securityService.decryptJSON = function(text) {
    var bytes = CryptoJS.AES.decrypt(text, process.env.DECRYPT_KEY, {
        mode: CryptoJS.mode.CTR
    });

    return JSON.parse(bytes.toString());
};

module.exports = securityService;