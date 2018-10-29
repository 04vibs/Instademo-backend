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


router.get('/images/:imagename',(req,res)=>{
   console.log('Inside get of image upload')
   console.log(__dirname)
    let imagename = req.params.imagename
    let imagePath = "./images/" + imagename
    console.log(imagePath);
    let image = fs.readFileSync(imagePath)
    let mime = fileType(image).mime

    res.writeHead(200,{
        'Content-Type': mime
    })
    res.end(image,'binary')
})

router.post('/images/upload/:id',(req,res)=>{
    console.log(req.params.id);

    upload(req,res,(err)=>{
        if(err) {
            res.status(400).json({
                message: err.message
            })
        } else {
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