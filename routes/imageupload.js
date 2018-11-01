const express = require('express');
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const Image = require('../db').image
const User = require('../db').User

const router = express.Router()

const upload = multer({
    dest: './images',
    limits: { fileSize: 100000000,files:1},
    fileFilter: (req,file,callback)=>{
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')


router.get('/images/get/:id',(req,res)=>{
   console.log('Inside get of image upload')
   
   Image.findAll({
       where: {
           userId: req.params.id
       }
   }).then((images)=>{
    //    console.log('images======================', images);
     //  console.log(images);

   // console.log('images======================', images[1].dataValues.imagepath);
    let imagesAll = []
    const impagepaths=[]; 
    // let buf = new Buffer();
    // buf.
    let mime;
        for(let i = 0; i < images.length; i++){
            let imagesname = images[i].dataValues.id
            // console.log('Path : ',i + 1, images[i]);
            let imagePath = images[i].dataValues.imagepath
            impagepaths.push(imagePath)
            let image = fs.readFileSync(imagePath)
            mime = fileType(image).mime
            imagesAll.push(image)
        }
       // console.log(imagePath);
    //    for(let i = 0; i < imagesAll.length; i++){
    //        res.send(imagesAll[i]);
    //    }
    //res.attachment(imagesAll.toString(),'Binary');
    // res.writeHead(200,{
    //     'Content-Type': mime
    //    })
       res.header("Content-Type", mime);
       res.status(200).send(imagesAll)
   }).catch((err)=>{
       console.log(err);
       err: err
   })   
})

router.post('/images/upload/:id',(req,res)=>{
    console.log(req.params.id);
    upload(req,res,(err)=>{
        
        if(err) {
                console.log(err);
            res.status(400).json({
                message: err.message
            })
        } else {
            debugger;
            let path = `./images/${req.file.filename}`
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
})



router.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})

module.exports = router;