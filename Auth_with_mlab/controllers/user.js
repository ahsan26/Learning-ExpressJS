// Importing Modules
const express = require("express");
const User = require("../models/user_model");
const JWT = require("jsonwebtoken");
const { secret } = require("../configurations/index");

// Token Maker
signToken = user => {
    return JWT.sign({
        iss: "auth",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, secret);
}

// Exporting
module.exports = {
    signUp: async (req, res, next) => {
        const { email, password } = req.value.body;
        let foundUser = await User.findOne({ email });
        if (foundUser) {
            res.status(403).json({ err: "Email is already in use" });
            return;
        }
        let newUser = new User({ email, password });
        newUser.save();
        const token = signToken(newUser);
        res.status(200).json({ token });
    },
    signIn: async (req, res) => {
        const token = signToken(req.user);
        return res.status(200).json({ token });
    },
    secret: async (req, res) => {
        res.json({ secret: "testing" });
    }
}