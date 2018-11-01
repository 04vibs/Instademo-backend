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
// login
router.post('/',(req,res)=>{

    console.log('Inside users');
    user = req.body;
    User.findAll()
    .then((users)=>{
        index = users.findIndex(x => x.email === user.email && x.password === user.password);
        res.status(200).send(users[index])
    }).catch((err)=>{
        err
    })
})



// image upload particular id

// router.post('/:name/upload',(req,res)=>{
//     console.log('Inside name of login');
//     User.findOne({
//         where:{
//             name: req.params.name
//         }
//     }).then((username)=>{
//         console.log(username);
//         if(username == null){
//             res.status(404).send('No such user exists')
//         }
//         res.status(200).send(username)
//     }).catch((err)=>{
//         error: 'could not found'
//     })
// })
module.exports = router;