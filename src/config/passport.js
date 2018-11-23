const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}), async(email, password, done) => {
    const userModel = await UserModel.findOne({ email: email });
    if (!userModel) {
        return done(null, false, { message: 'Not user found.' });
    }

    const match = await userModel.matchPassword(password);
    if (match) {
        return done(null, user);
    }

    return done(done, null, { message: 'Incorrect password' });
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    await UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});