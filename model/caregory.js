const mongoose= require('mongoose');
const category = mongoose.Schema({
    name:{type:String}
},{timestamps:true});

module.exports=mongoose.model('category',category);