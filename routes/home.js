const express = require('express');
const settings = require('./variables');
const router = express.Router();

router.get('/', (req, res) => {
    if (settings.isValid === true) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;