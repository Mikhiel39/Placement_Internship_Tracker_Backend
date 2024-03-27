//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const profileSchema=new mongoose.Schema({

    gender:{
        type:String,
        //required:true,
        //enum:["Male","Female"],
    },


    dateOfBirth:{
        type:String,
    },

    about:{
        type:String,
        trim:true,
    },

    contactNumber:{
        type:Number,
        trim:true,
    },
     prnNo:{
        PRNNO :Number,
        
     },
     regId:{
        PRNNO :Number,
        
     },

});

//3.Exporting the Schema
module.exports=mongoose.model("Profile",profileSchema);