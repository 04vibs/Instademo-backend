const express = require('express');
const router = express.Router();

const User = require('../db').User

// find all users
router.get('/',(req,res)=>{

    console.log('Inside users');
    User.findAll()
    .then((users)=>{
        res.status(200).send(users)
    }).catch((err)=>{
        err
    })
})


// particular id

router.get('/:name',(req,res)=>{
    console.log('Inside name of login');
    User.findOne({
        where:{
            name: req.params.name
        }
    }).then((username)=>{
        console.log(username);
        if(username == null){
            res.status(404).send('No such name exists')
        }
        res.status(200).send(username)
    }).catch((err)=>{
        error: 'could not found'
    })
})

module.exports = router;