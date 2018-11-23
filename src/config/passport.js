const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const UserModel = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    // Match Email's User
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Not User found.' });
    }
    const match = await user.matchPassword(password);
    if (match) {
        return done(null, user);
    }
    return done(null, false, { message: 'Incorrect Password.' });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});