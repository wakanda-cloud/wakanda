'use strict';

class Wakanda {

    constructor(encryptPassword, server) {
        this.encryptPassword = encryptPassword;
        this.server = server;
        jQuery(".wakanda").bind('click', this.fireRegisterStatistic());
    }

    fireRegisterStatistic() {
        var wakanda = this;
        jQuery.ajax({
            type : "POST",
            contentType : "text",
            url : this.server + "/registerStatistic",
            data : wakanda.encrypt(JSON.stringify({
                "client" : this.client,
                "module" : this.module,
                "submodule" : this.submodule,
                "title" : this.title,
                "linkClicked" : this.linkClicked
            })),
            dataType : "text"
        });
    }

    set client(client) {
        this.client = client;
    }

    get client() {
        return this.client;
    }

    set module(module) {
        this.module = module;
    }

    get module() {
        this.module;
    }

    set submodule(submodule) {
        this.submodule = submodule;
    }

    get submodule() {
        return this.submodule;
    }

    set title(title) {
        this.title = title;
    }

    get title() {
        return this.title;
    }

    get linkClicked() {
        return this.linkClicked;
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.encryptPassword, {
            mode: CryptoJS.mode.CTR
        });
    }
}