const express = require('express');
const app = express();
const Building = require('../model/building');
const User = require('../model/users')
app.post('/building',async(req,res)=>{
    try{
        const user = await User.find({user:req.body.user})
        const building =  Building(req.body);
        const saveBuilding = await building.save();
        res.status(200).json({'data': saveBuilding})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// update
app.patch('/building/:id',async(req,res)=>{
    try{
        const user = await User.find({user:req.body.user})
        const building = await Building.findByIdAndUpdate(req.params.id,
            {$set: req.body},{$new:true});
        res.status(200).json({'data': building})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// delete
app.delete('/building/:id',async(req,res)=>{
    try{
        const building = await Building.findByIdAndDelete({['_id']:req.params.id},);
        res.status(200).json({'data': building})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// get building
app.get('/building/:id',async(req,res)=>{

    try{
        
        const building = await Building.findById(req.params.id).populate('user');
        res.status(200).json({'data': building})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// get building
app.get('/building',async(req,res)=>{
const qNew = req.query.new;
const qCategory = req.query.category;
const qRoomKind = req.query.roomKind;
const qRintType = req.query.rintType;
const qDesc = req.query.desc;
const qWcNumber = req.query.wcNumber;
const qCarEnteries = req.query.carEnteries;
const qHoleNumber = req.query.holeNumber;
const qRoomNumber = req.query.roomNumber;
const qPrice = req.query.carEnteries;
const qBuilingAge = req.query.builingAge;
const qNumberEnteries= req.query.numberEnteries;
const qSpecialRoof = req.query.specialRoof;
const qRefridger = req.query.refridger;

    try{
      let  building;
      if(qNew){
        building = await Building.find().sort({'_id':-1}).populate(['user']);
   
      }else if(qPrice){
        building = await Building.find({price:{$in:qPrice}}).populate(['user']);

      }else if(qDesc){
        building = await Building.find({desc:{$in:qDesc}}).populate(['user']);

      }else if(qCarEnteries){
        building = await Building.find({carEnteries:{$in:qCarEnteries}}).populate(['user']);

      }else if(qRoomNumber){
        building = await Building.find({roomNumber:{$in:qRoomNumber}}).populate(['user']);

      }else if(qHoleNumber){
        building = await Building.find({holeNumber:{$in:qHoleNumber}}).populate(['user']);

      }else if(qBuilingAge){
        building = await Building.find({builingAge:{$in:qBuilingAge}}).populate(['user']);

      }
      else if(qNumberEnteries){
        building = await Building.find({numberEnteries:{$in:qNumberEnteries}}).populate(['user']);

      }
      
      else if(qRefridger){
        building = await Building.find({refridger:{$in:qRefridger}}).populate(['user']);

      }else if(qRintType){
        building = await Building.find({rintType:{$in:qRintType}}).populate(['user']);

      }else if(qRoomKind){
        building = await Building.find({roomKind:{$in:qRoomKind}}).populate(['user']);

      }else if(qSpecialRoof){
        building = await Building.find({specialRoof:{$in:qSpecialRoof}}).populate(['user']);

      }else if(qWcNumber){
        building = await Building.find({wcNumber:{$in:qWcNumber}}).populate(['user']);

      }else if(qCategory){
        building = await Building.find({category:{$in:qCategory}}).populate(['user']);

      }else{
         building = await Building.find().populate(['user']);}
        res.status(200).json({'data': building})
    }catch(er){
        res.status(500).json({'data':er})
    }
})

// filter
app.get('/buildings',async(req,res)=>{
    try{   
        const qPriceFrom = req.query.priceFrom;
        const qPriceTo = req.query.priceTo;
    const building = await Building.find({price:{$gte:qPriceFrom,$lte:qPriceTo}}).populate('user');
        res.status(200).json({'data': building})
}catch(er){
    res.status(500).json({'data':er})
}
})
app.get('/building',async(req,res)=>{
  try{
    const qLat= req.query.lat;
    const qlong= req.query.long;
    const building= await Building.find({lat:{$eq:qLat},long:{$eq:qlong}});
    res.status(200).json({'data':building})
  }catch(er){
    res.status(500).json({'data':'error'})
  }
})


module.exports= app;