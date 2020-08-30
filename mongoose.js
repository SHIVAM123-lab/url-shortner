  const mongoose =require('mongoose');
 var store=new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
    url:{type:String,required:true,},
  urlshort:{type:String,required:true}
 })
 module.exports=mongoose.model('Data',store);