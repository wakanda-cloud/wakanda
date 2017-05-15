'use strict';

class Wakanda {

    constructor(encryptPassword, token, server) {
        this.encryptPassword = encryptPassword;
        this.token = token;
        this.server = server;

        var wakanda = this;
        jQuery(".wakanda").bind('click', function(event) {
            wakanda.fireRegisterStatistic(wakanda, event);
        });
    }

    fireRegisterStatistic(context, event) {
        var element = event.target;
        var altAttribute = element.attributes['alt'];
        var data = context.encrypt(JSON.stringify({
            "client": context.client,
            "module": context.module,
            "submodule": context.submodule,
            "title": context.title,
            "linkClicked": altAttribute === undefined ? element.innerHTML.trim() : altAttribute.value,
            "token": context.token.call(this)
        }));

        var settings = {
            "async": true,
            "crossDomain": true,
            "headers" : {
                "content-type" : "text/plain"
            },
            "url": context.server + "/registerStatistic",
            "method": "POST",
            "data": data
        };

        jQuery.post(settings);
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