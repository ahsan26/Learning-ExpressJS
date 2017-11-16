// Importing Modules
const express = require("express");
const Router = require("express-promise-router")();
const UserControls = require("../controllers/user");
const { validateBody, schemas } = require("../helpers/route_helper");

// Set the Routes
Router.get("/", function (req, res) {
    res.send("Welcome");
});
Router.route("/signUp").post(validateBody(schemas.authSchema), UserControls.signUp);
Router.route("/signIn").post(UserControls.signIn);
Router.route("/secret").get(UserControls.secret);

// Exporting our Routes
module.exports = Router;