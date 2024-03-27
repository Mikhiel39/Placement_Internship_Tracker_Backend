//1.Importing mongoose
const mongoose=required("mongoose");

//2.Creating Schema
const OTPSchema=new mongoose.Schema({

email:{
    type:String,
    required:true,
},

otp:{
    type:String,
    required:true,

},

createdAt:{
    type:Date,
    default:Date.now(),
    expire:5*60,
},

});

//4.Creating asyn function whose inten is to send tthe mail.
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from LearnO",otp);
        console.log("Email sent Successfully",mailResponse);

    }
    catch(error){
        console.log("error while sendin the otp email",error);
        throw error;

    }

}

//5.Using premiddle ware as a hook(pre middleware)
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next(); // after performing above process ham next middleware ki taraf chale jayange,


})//Middle ware me next pass karne se kay hota?

//3.Exporting the Schema
module.exports=mongoose.model("OTP",OTPSchema);