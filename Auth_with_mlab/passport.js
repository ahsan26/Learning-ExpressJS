const passport = require("passport");

const JWTSTRATEGY = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { secret } = require("./configurations/index");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user_model");

passport.use(new JWTSTRATEGY({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: secret
}, async (payload, done) => {
    try {
        let user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) { return done(null, false) };
    let isMatch = user.isValidPassword(password);
    if (!isMatch) { return done(null, false) };
    done(null, user);
}));