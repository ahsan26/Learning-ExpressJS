// Importing Modules
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Importing database to the main file
require("./database");

// Setup middlewares
app.use(bodyParser.json());
app.use("/users", require("./routes/users"));
app.use(morgan("dev"));

// Initialize our app on the port
app.listen(19000, function () {
    console.log("Server is Started!");
});