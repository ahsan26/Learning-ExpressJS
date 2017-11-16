// Importing Modules
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

// Connecting with DB
mongoose.connect("mongodb://admin:123456@ds159845.mlab.com:59845/testing", { useMongoClient: true });

let db = mongoose.connection;

// When there is error: 
db.on("error", console.error.bind(console, "error"));

// When our database is first open: 
db.once("open", function () {
    console.log("DB is Opened!");
    return db;
});