//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const userSchema=new mongoose.Schema({
    firstname :{
        type:String,
        required:true,
        trim:true,
    },

    lastname :{
        type:String,
        required:true,
        trim:true,
    },

    email :{
        type:String,
        required:true,
        trim:true,
    },

    password :{
        type:String,
        required:true,
    },

    accountType :{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },

    additionalDetails :{
        type:mongoose.Schema.Types.ObjectId,//we use this as we refer another schema in this modalto fetch data
        ref:"Profile",
        required:true,
    },

    internship :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Intership",
        }
    ],

    placement :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Placement",
        }
    ],

    image:{
        type:String,
        required:true,
    },

    progress :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Progress",
            //Flag for placement or intership
        }
    ],


});

module.exports=mongoose.model("User",userSchema);



