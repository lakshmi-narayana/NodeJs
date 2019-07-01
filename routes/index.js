const express = require('express');
const mongoose = require('mongoose');

const {body, validationResult } = require('express-validator/check');

const router = express.Router();
const registration = mongoose.model('registration');
router.get('/',(req, res) => {
    //res.send('it works');
    res.render('form',{title: 'Registration Form'});
});

router.get('/registrations',(req, res) => {
    registration.find()
        .then((registrations) => {
            res.render('index',{title: 'Listing Registation', registrations });
        })
        .catch(() => { res.send('Sorry! Someting went wrong.');});
});

router.post('/',
[
    body('name').isLength({ min: 1 }).withMessage('Please enetr a name'),
    body('email').isLength({ min:1 }).withMessage('Please enter an email'),

],
(req,res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
       // res.send('Thank you for registration!');
       const registration = new registration(req.body);
       registration.save()
       .then(() => {res.send('Thank you for your resgistration!');})
       .catch(() => {res.send('Sorry! Something went wrong');})
    }else{
        res.render('form',{
            title: 'Registration form',
            errors: errors.array(),
            data: req.body,
        });
    }
    
});
module.exports = router;