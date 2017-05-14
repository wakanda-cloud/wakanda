"use strict";
var moment = require('moment');

class StatisticData {

    constructor(data) {
        this.client = data["client"];
        this.module = data["module"];
        this.submodule = data["submodule"];
        this.title = data["title"];
        this.capturedDate = moment().format("DD/MM/YYYY - HH:mm:ss");
        this.linkClicked = data["linkClicked"];
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

    toJSON() {
        return {
            client: this.client,
            module: this.module,
            submodule: this.submodule,
            title: this.title,
            capturedDate: this.capturedDate,
            linkClicked: this.linkClicked
        }
    }
}

module.exports = StatisticData;