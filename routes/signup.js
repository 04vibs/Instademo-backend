const express = require('express');
const router = express.Router();

const User = require('../db').User;

router.post('/',(req,res)=>{
    console.log('Inside signup');
    console.log(req.body.name)
    console.log(req.body.password)

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then((users)=>{
        console.log("inside create signup")
        res.status(201).send(users)
    }).catch((err)=>{
        console.log('Inside err of signup')
        res.status(501).send({
            err: 'could not post'
        })
    })
})

module.exports = router