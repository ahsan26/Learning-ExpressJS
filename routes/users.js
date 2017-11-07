const express = require("express");
let Router = express.Router();
let Users = require("../Models/Users");
let bcrypt = require("bcryptjs");

Router.get("/register", function (req, res) {
    res.render("register");
});

Router.post("/register", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirm_Password = req.body.confirmpassword;

    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("username", "UserName is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("confirmpassword", "Password is not Match").equals(password);

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render("register", {
            errors: errors
        });
    } else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    console.log("2", err);
                    return;
                }
                let newUser = new Users({ name: name, email: email, password: password, username: username });
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log("3 ", err);
                        return;
                    }
                    req.flash("success", "You are now registered and can login");
                    res.redirect("/users/login");
                });
            });
        });
    }
});

Router.get("/login", function (req, res) {
    res.render("login");
})

module.exports = Router;