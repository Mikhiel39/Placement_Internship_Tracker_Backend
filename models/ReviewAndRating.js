//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const ratingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    rating:{
        type:Number,
        required:true,
        enum:["1","2","3","4","5"],
    },

    review:{
        type:String,
        required:true,
    },
    
    

});

//3.Exporting the Schema
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);