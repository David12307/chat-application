const express = require('express');
const router = express.Router();
const User = require('../models/user');
const settings = require('./variables');
let epicNumber = 0;

router.get('/', (req, res) => {
    if (settings.isValid === true) {
        res.redirect('/');
    } else {
        res.render('register');
    }
});

router.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    function checkNumber(n) {
        if (n === 2) {
            user.save()
             .then(result => {
                res.redirect('/login');
                epicNumber = 0;
             })
             .catch(err => console.log(err));
        } else {
            res.send('Username or Email already taken.');
            epicNumber = 0;
        }
    }

    function checkUser() {
        User.find({ username: req.body.username }) 
         .then(result => {
             if (result.length === 0) {
                epicNumber++;
             } else {
                console.log('Email already taken.');
             }
         })
         .catch(err => console.log(err));

        User.find({ email: req.body.email })
         .then(result => {
             if (result.length === 0) { 
                epicNumber++;
                checkNumber(epicNumber);
             } else {
                console.log('Username already taken.');
                checkNumber(epicNumber);
             }
         })
         .catch(err => console.log(err));
    }

    checkUser();
});

module.exports = router;