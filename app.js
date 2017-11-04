const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
let Article = require("./Models/Article");
mongoose.connect("mongodb://localhost/Practice");
const expressValidator = require("express-validator");
let db = mongoose.connection;
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

db.once("open", function () { console.log("Connected to Database") });
db.on("err", function (err) { console.log(err) });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.get("/", function (req, res) {
    Article.find({}, function (err, articles) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("index", {
            title: "Articles",
            articles: articles
        });
    });
});

let articles = require("./routes/articles");
app.use("/articles", articles);

app.listen(19000, function () {
    console.log("Server is hited!");
});