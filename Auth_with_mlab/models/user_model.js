const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

let User = new Schema({
    email: String,
    password: String
});

User.pre("save", function (next) {
    const ref = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(ref.password, salt, function (err, hashed) {
            if (err) {
                return next(err);
            }
            ref.password = hashed;
            next();
        });
    });
})

User.methods.isValidPassword = async function (newPassword) {
    try {
        return bcrypt.compare(newPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = mongoose.model("User", User);