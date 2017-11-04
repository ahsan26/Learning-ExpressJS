const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
let Article = require("./Models/Article");
mongoose.connect("mongodb://localhost/Practice");
let db = mongoose.connection;
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

db.once("open", function () { console.log("Connected to Database") });
db.on("err", function (err) { console.log(err) });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

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

app.get("/article/:id", function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("article", {
            article: article
        });
    });
});

app.get("/articles/add", function (req, res) {
    res.render("add_article", {
        title: "Add Article"
    });
});

app.post("/articles/add", function (req, res) {
    let new_Articles = new Article();
    new_Articles.title = req.body.title;
    new_Articles.author = req.body.author;
    new_Articles.body = req.body.body;
    new_Articles.save(function (err) {
        if (err) {
            console.log("error !!!!! ", err);
            return;
        }
        res.redirect("/");
    });
});

app.get("/articles/edit/:id", function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("article_edit", {
            article: article
        });
    });
});

app.post("/articles/edit/:id", function (req, res) {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    let query = { _id: req.params.id };
    Article.update(query, article, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/");
    });
});

app.delete("/article/:id", function(req, res){
    let query = {_id: req.params.id};
    Article.remove(query, function(err){
        if(err){
            console.log(err);
            return;
        }
        res.send("success");
    });
});

app.listen(19000, function () {
    console.log("Server is hited!");
});