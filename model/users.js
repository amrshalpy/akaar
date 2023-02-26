const mongoose = require('mongoose');
const User = mongoose.Schema({
    name:{type:String},
    phone:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
    isAdmin:{type:Boolean,default:false},
},{timestamps:true});
module.exports= mongoose.model('user',User);