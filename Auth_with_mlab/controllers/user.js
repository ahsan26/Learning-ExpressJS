const express = require("express");
const User = require("../models/user_model");
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
    res.status(200).json({ user: "created" });
    },
    signIn: async (req, res) => {

    },
    secret: async (req, res) => {

    }
}