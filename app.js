
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var routes = require('./routes');
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Environment varibale configuration

require('./DB_CONNECTION/db');

app.use("/asset/uploads/images/auctions", express.static("asset/uploads/images/auctions"))

app.use(routes);
app.listen(port);
console.log('app is listening on ' + port);