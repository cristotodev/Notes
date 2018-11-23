const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.send('Sign in into the application');
});

router.get('/users/signup', (req, res) => {
    res.send('Authentication form');
});
module.exports = router;