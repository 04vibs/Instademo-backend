const express = require('express');
const cors = require('cors');
const app = express();

const login = require('./routes/login');
const signup = require('./routes/signup');
const imageUploader = require('./routes/imageupload');
const imagedemo = require('./routes/imagedemo');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/login',login);
app.use('/api/signup',signup);
//app.use('/api',imageUploader);
 app.use('/api',imagedemo);

const port = process.env.PORT ||3000;
app.listen(port,()=>{
    console.log(`listening port ${port}`);
})