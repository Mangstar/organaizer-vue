const express  = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const db = "mongodb://localhost/taskstore";
const PORT = process.env.PORT || 8080;

app.get('/', function(req, res){
    res.ren(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    mongoose.connect( db );
});