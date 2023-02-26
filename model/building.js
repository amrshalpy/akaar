const mongoose= require('mongoose');
const building = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        },
    name:{type:String},
    category:{type:String},
    roomKind:{type:String},
    rintType:{type:String},
    desc:{type:Number},
    price:{type:Number},
    lat:{type:Number},
    long:{type:Number},
    roomNumber:{type:Number},
    holeNumber:{type:Number},
    wcNumber:{type:Number},
    carEnteries:{type:Boolean, default:false},
    refridger:{type:Boolean, default:false},
    specialRoof:{type:Boolean, default:false},
    numberEnteries:{type:Number,},
    carEnteries:{type:Boolean, default:false},
    builingAge:{type:Number},
   
    distance:{type:String},
   

},{timestamps:true});

module.exports=mongoose.model('building',building);