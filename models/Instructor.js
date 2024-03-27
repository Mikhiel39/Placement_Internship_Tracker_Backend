//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const instructorSchema=new mongoose.Schema({

    firstname :{
        type :string,
        required:true,
    },

    lastname:{
        type : string,
        required :true,
    },

    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },


    // dateOfBirth:{
    //     type:date,
    // },

    about:{
        type:String,
        trim:true,
    },

    contactNumber:{
        type:Number,
        trim:true,
    },
     

});

//3.Exporting the Schema
module.exports=mongoose.model("Instructor",instructorSchema);