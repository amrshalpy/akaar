const express = require('express');
const app = express();
const dotenv=require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./routing/User')
const building = require('./routing/Building')
const category = require('./routing/Category')


app.use([express.urlencoded({extended: true}), express.json()]);
app.use('/',user);
app.use('/',category);
app.use('/',building);
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
}).then(()=>  console.log('connected'));
  
app.listen(process.env.PORT||8889,()=>{
console.log('succssess');
});