
const jwt = require('jsonwebtoken');
const express = require('express');
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const Image = require('../db').image
const User = require('../db').User

const router = express.Router()

const upload = multer({
    fileFilter: (req,file,callback)=>{
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')



router.post('/images/upload/:id',ensureToken,(req,res)=>{
    
    if(false){
        
        res.sendStatus(403).message('forbidden not a valid token');
    }
    else{
        console.log('upload',req.token);
        upload(req,res,(err)=>{     
            if(err) {
                    console.log(err);
                    res.status(400).json({
                    message: err.message 
                    
                })
            } else {
                debugger;
                console.log(req.file);
                let path = (req.file.buffer.toString('base64'));
                console.log(path);
                console.log('Inside image post');
                
                res.status(200).json({
                    message: 'Image uploaded successfully !',
                    path: path,
                    
                })
                console.log(path);      
                    Image.create({
                        userId : req.params.id,
                        imagepath : path,
    
        }).then((images)=>{
            console.log('Inside images create');
            
        }).catch((err)=>{
            err : 'cannnot post in db'
        })
            }
            console.log('outside of else')
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
    console.log( bearerHeader);
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