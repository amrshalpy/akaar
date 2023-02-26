const express = require('express');
const app = express();
const User = require('../model/users');
const cryptoJs= require('crypto-js');
const jwt= require('jsonwebtoken');

// register

app.post('/register',async(req,res)=>{
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password,process.env.PASS_URL).toString(),
        phone: req.body.phone,
    })
    try{
    const saveUser = await user.save();
    res.status(200).json({
        'success':true,
        'data':saveUser})
    }catch(er){
        res.status(500).json(
            { 'success':false,
        "data":'error'
        }
           )
        console.log(er);
    }
})

// login
app.post('/login',async(req,res)=>{
    try{
       const user = await User.findOne({email:req.body.email})
       !user &&  res.status(500).json('email or password invalid')
      const hashPassword = cryptoJs.AES.decrypt(user.password,process.env.PASS_URL);
      const originalPassword = hashPassword.toString(cryptoJs.enc.Utf8);
      
      !originalPassword == req.body.password &&  res.status(500).json('email or password invalid')
  
const accessToken = jwt.sign({
    id: user._id,
    isAdmin : user.isAdmin,
},process.env.JWT_URL,{expiresIn:'3d'})

res.status(200).json({'data':{user,accessToken}})
    
    
    }catch(er){
        res.status(500).json(
            { 'success':false,
        "data":'error'
        }
           )
        console.log(er);
    }
})

// update
app.patch('/user/:id',async(req,res)=>{
    try{
        if(req.body.password){
            req.body.password = cryptoJs.AES.encrypt(req.body.password,process.env.PASS_URL).toString();   
        }
        const user = await User.findByIdAndUpdate(req.params.id,
       {$set: req.body},
       {$new:true})
       res.status(200).json({'data':user})
    }catch(er){
        res.status(500).json({'data':'error'})
        console.log(er);
    }
})
// get all User
app.get('/user',async(req,res)=>{
    try{
  const user = await User.find();
        res.status(200).json({'data':user})
    }catch(er){
        res.status(500).json({'data':'error'})
      console.log(er);  

    }
})

// get user
app.get('/user/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({'data':user})
    }catch(er){
        res.status(500).json({'data':'error'})

    }
})
// delete
app.delete('/user/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({['_id']:req.params.id});
        res.status(200).json({'data':user})
    }catch(er){
        res.status(500).json({'data':'error'})

    }
})
module.exports= app;