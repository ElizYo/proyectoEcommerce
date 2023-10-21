const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const path = require("path");
const router = express.Router();

//DB CONECTION
require(path.join(__dirname + "db.js"))


app.use(express.static(__dirname + '/dist/'));

app.use(require(path.join(__dirname + "router.js")))
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.listen(port);

console.log("server started");
