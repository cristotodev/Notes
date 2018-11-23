const router = require('express').Router();
const UserModel = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', async(req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length == 0) {
        errors.push({ text: 'Please insert your name' });
    }
    if (email.length == 0) {
        errors.push({ text: 'Please insert your email' });
    }

    if (password != confirm_password || password == '') {
        errors.push({ text: 'Password do not match' });
    }

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        });
    } else {
        const emailUser = await UserModel.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use')
            res.redirect('/users/signup');
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered')
        res.redirect('/users/signin');
    }
});
module.exports = router;