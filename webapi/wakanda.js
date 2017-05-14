'use strict';

class Wakanda {

    constructor(encryptPassword, token, server) {
        this.encryptPassword = encryptPassword;
        this.token = token;
        this.server = server;
        jQuery(".wakanda").bind('click', this.fireRegisterStatistic());
    }

    fireRegisterStatistic() {
        var wakanda = this;
        jQuery.ajax({
            type : "POST",
            contentType : "text",
            header: 'Access-Control-Allow-Origin: *',
            url : this.server + "/registerStatistic",
            data : wakanda.encrypt(JSON.stringify({
                "client" : this.client,
                "module" : this.module,
                "submodule" : this.submodule,
                "title" : this.title,
                "linkClicked" : this.linkClicked,
                "token":  this.token.call(this)
            })),
            dataType : "text"
        });
    }

    set client(client) {
        this._client = client;
    }

    get client() {
        return this._client;
    }

    set module(module) {
        this._module = module;
    }

    get module() {
        this._module;
    }

    set submodule(submodule) {
        this._submodule = submodule;
    }

    get submodule() {
        return this._submodule;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set linkClicked(linkClicked) {
        this._linkClicked = linkClicked;
    }

    get linkClicked() {
        return this._linkClicked;
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.encryptPassword.call(this), {
            mode: CryptoJS.mode.CTR
        }).toString();
    }
}