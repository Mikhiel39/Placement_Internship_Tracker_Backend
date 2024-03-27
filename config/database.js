
//Tempalte of database connection
const mongoose=required("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Database Connection is Successfullt done!!"))
    .catch((error)=>{
        console.log("Unfortunately Database connection Failed!!");
        console.error(error);
        process.exit(1);
    })

};
