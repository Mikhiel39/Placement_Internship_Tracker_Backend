//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const progressSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types,ObjectId,
        ref:"User",
    },

    acedemics:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Acedemics",
        }
    ],
    intershipStatus:{
        type:Boolean,
        enum:["Yes","No"],
        required:true,

    },

    placementStatus:{
        type:Boolean,
        enum:["Yes","No"],
        required:true,

    },


    

});

//3.Exporting the Schema
module.exports=mongoose.model("Progress",progressSchema);