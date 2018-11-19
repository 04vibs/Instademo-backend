
const jwt = require('jsonwebtoken');
const express = require('express');
const fileType = require('file-type')
const fs = require('fs')
const Image = require('../db').image
const User = require('../db').User

const router = express.Router()


router.post('/images/upload/:id',ensureToken,(req,res)=>{
    
    if(false){        
        res.sendStatus(403).message('forbidden not a valid token');
    } else {
        console.log('Inside post of image.js line 17');
        Image.create({
            imagepath: req.body.image,
            userId: req.params.id
        }).then((Images)=>{
            console.log('Inside then of image post line 22');
            res.status(200).send(Images)
        }).catch((err)=>{
            console.log(err);
        })     
        
    }
})


router.get('/images/get/:id',ensureToken,(req,res)=>{
    console.log('Inside get of image upload')
    console.log(req.token);     
        if(false){
            res.sendStatus(403).message('forbidden not a valid token');
        }else{
            Image.findAll({
                where: {
                    userId: req.params.id
                }
            }).then((images)=>{
                console.log(images);
                res.status(200).send(images)
            }).catch((err)=>{
                console.log(err);
                err: err
            })   
        }
    });
    
router.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})

function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    console.log('---------', bearerHeader);
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken =bearer[1];
        req.token = bearerToken;
        next();
    } else {
        
        res.sendStatus(403,'Token does not match');
    }
}
module.exports = router;