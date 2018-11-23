const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('All notes from DB');
});

module.exports = router;