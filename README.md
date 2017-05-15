<table width="100%" cellspacing="0" cellpadding="0" style="border:none">
<tr>
<td width="50%" valign="top">
<h1>Wakanda Service</h1><br>
This service was created to help developers a register statistic of use of your applications, like crm, erp, mobile, apps, etc.
<td>

<td><img src="https://images5.alphacoders.com/606/606490.jpg"/></td>
</tr>
</table>

<h2> Its simple </h2>

Have to ways to communicate with wakanda:<br>

```POST -> /listStatistic```<br>
<br>
```Send '*' to list all statistics;```<br>
```Send "client code" to list all statistics by this client;```<br>

```POST -> /registerStatistic```<br>
<br>

JSON FORMAT
```json
"client": "",
"module": "",
"submodule": "",
"title": "",
"linkClicked": "",
"token": ""
```
*For now its a fixed layout to register statistics;<br>
<br>
<h2> Usage </h2>
<h3>Import this scripts on your HTML page</h3>

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script><br>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/aes.js"></script><br>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script><br>
<script src="https://cdn.jsdelivr.net/gh/lucasventurasc/wakandanode@1.0/webapi/wakanda.js"></script><br>
```
<h3> Instance Wakanda as global variable</h3>
This will bind your DOM Elements with ".wakanda" class to fire statistic register when clicked<br>
Wakanda expect password, token and server in your constructor<br><br>

```html
<button class="wakanda">Save</button>
```

```javascript

//Password must be 8 characters in length because aes256 encrypt
var password = function() {
    return '12345678';
};

//Token its a any word you want, its be used to verify if token received was valid to server
var token = function() {
    return 'abcdeifghyjklmnopqrstuvxz';
};
//password and token must be a callback function, its a design pattern to prevent you from cache the password and token on your
//page, you must get then of your server when you need it

//You need to set the general wakanda data in this moment too like, client, module, submodule and title;
var wakanda = new Wakanda(password, token, 'http://yourwakandaserver.com'); //Server URL to call
wk.client = '7894';
wk.module = 'Some Module';
wk.submodule = 'Some Submodule';
wk.title = 'Some Title';

//Wakanda by default will get property 'alt' of your element and will set as the linkClicked property, 
//if alt property does not exists will get innerHTML;
```

<h3>Security Tips</h3>

* **Your password and token must be stored on a security place in your cloud**<br>
For example using process.env on heroku to store this words
See https://devcenter.heroku.com/articles/config-vars to more detail

Currently this app works without any change just with the Redis Cloud , if want will use other Redis Service, you need config this manually
