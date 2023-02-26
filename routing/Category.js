const express = require('express');
const app = express();
const Category = require('../model/caregory');

// add
app.post('/category',async(req,res)=>{
    try{
        const category = await Category(req.body);
        res.status(200).json({'data': category})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// update
app.patch('/category/:id',async(req,res)=>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,
            {$set: req.body},{$new:true});
        res.status(200).json({'data': category})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// delete
app.delete('/category/:id',async(req,res)=>{
    try{
        const category = await Category.findByIdAndDelete({['_id']:req.params.id},);
        res.status(200).json({'data': category})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// get category
app.get('/category/:id',async(req,res)=>{
    try{
        
        const category = await Category.findById(req.params.id);
        res.status(200).json({'data': category})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// get category
app.get('/category',async(req,res)=>{
    try{
        const category = await Category.find();
        res.status(200).json({'data': category})
    }catch(er){
        res.status(500).json({'data':er})
    }
})


module.exports= app;