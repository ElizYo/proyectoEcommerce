const env = require('./env');

const express = require('express');

const port = env.devServer.PORT || 8080;
const app = express();
const path = require("path");

const router = express.Router();

//DB CONECTION
require(path.join(__dirname + "/db.js"))


app.use(express.static(__dirname + '/dist/'));


//app.get(/.*/, function (req, res) {
 // res.sendFile(__dirname + '/dist/index.html');
//})

app.get(/^\/(?!api).*$/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

const route = require(path.join(__dirname, "/route.js"));

app.use(route);

// Middleware para analizar datos JSON y datos codificados en URL
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(port);

console.log("server started on ", port);