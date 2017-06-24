"use strict";
var moment = require('moment');
var crypto = require('crypto');

class Statistic {

    constructor(data) {
        this.client = data["client"] ? data["client"] : data._client;
        this.module = data["module"] ? data["module"] : data._module;
        this.submodule = data["submodule"] ? data["submodule"] : data._submodule;
        this.title = data["title"] ? data["title"] : data._title;
        this.capturedDate = moment().format("DD/MM/YYYY - HH:mm:ss");
        this.linkClicked = data["linkClicked"] ? data["linkClicked"] : data._linkClicked;
        this.location = data["location"] ? data["location"] : data._location;
    }

    set client(client) {
        this._client = client;
    }

    get client() {
        return this._client;
    }

    get module() {
        return this._module;
    }

    set module(module) {
        this._module = module;
    }
    get submodule() {
        return this._submodule;
    }

    set submodule(submodule) {
        this._submodule = submodule;
    }
    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }
    get capturedDate() {
        return this._capturedDate;
    }

    set capturedDate(capturedDate) {
        this._capturedDate = capturedDate;
    }
    get linkClicked() {
        return this._linkClicked;
    }

    set linkClicked(linkClicked) {
        this._linkClicked = linkClicked;
    }

    set location(location) {
        this._location = location;
    }

    get location() {
        return this._location;
    }

    toJSON() {
        return {
            client: this.client,
            module: this.module,
            submodule: this.submodule,
            title: this.title,
            capturedDate: this.capturedDate,
            linkClicked: this.linkClicked,
            location: this.location
        }
    }
}

module.exports = Statistic;