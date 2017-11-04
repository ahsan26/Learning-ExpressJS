const express = require("express");
let Router = express.Router();
let Article = require("../Models/Article");

Router.get("/add", function (req, res) {
    res.render("add_article", {
        title: "Add Article"
    });
});

Router.post("/add", function (req, res) {
    req.checkBody("title", "Title is required").notEmpty();
    req.checkBody("author", "Author is required").notEmpty();
    req.checkBody("body", "Body is required").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.render("add_article", {
            title: "Add Article",
            errors: errors
        });
    } else {
        let new_Articles = new Article();
        new_Articles.title = req.body.title;
        new_Articles.author = req.body.author;
        new_Articles.body = req.body.body;
        new_Articles.save(function (err) {
            if (err) {
                console.log("error !!!!! ", err);
                return;
            }
            req.flash("success", "Article Added");
            res.redirect("/");
        });
    }
});

Router.get("/:id", function (req, res) {
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

Router.get("/edit/:id", function (req, res) {
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

Router.post("/edit/:id", function (req, res) {
    req.checkBody("title", "Title is required").notEmpty();
    req.checkBody("author", "Author is required").notEmpty();
    req.checkBody("body", "Body is required").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.render("/edit/" + req.params.id, {
            title: "Edit Article",
            errors: errors
        });
    }
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
        req.flash("success", "Article Updated");
        res.redirect("/");
    });
});

Router.delete("/:id", function (req, res) {
    let query = { _id: req.params.id };
    Article.remove(query, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.flash("success", "Article Deleted");
        res.send("success");
    });
});
module.exports = Router;