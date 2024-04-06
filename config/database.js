const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDB(url){
    return mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));
}

module.exports={
    connectMongoDB,
}
