const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../db').User

router.get('/',(req,res)=>{
       if(err){
           res.sendStatus(403);
       } else {
        User.findAll()
    .then((users)=>{
        res.status(200).send(users)
    }).catch((err)=>{
        err
    })
       }
   })


   //
   //testing
   // login
router.post('/',(req,res)=>{
    console.log('Inside users');
    user = req.body;
    const token = jwt.sign({User: user.email},
                            'my_secret_key',
                                { expiresIn: '1h' });
    User.findAll()
    .then((users)=>{
        index = users.findIndex(x => x.email === user.email && x.password === user.password);
        res.status(200).send({id :users[index].id, email: users[index].email, token: token})
        console.log(token);
    }).catch((err)=>{
        err
    })
})


module.exports = router;