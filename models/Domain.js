//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const tagSchema=new mongoose.Schema({

name:{
    type:String,
    required:true,
},

description:{
    type:String,

},

placement:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Placement",
},

internship:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Intership",
},


   

});

//3.Exporting the Schema
module.exports=mongoose.model("Domain",tagSchema);