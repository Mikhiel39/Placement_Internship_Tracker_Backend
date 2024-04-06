// Set environment variables
require("dotenv").config();
const studentRouter =require("./routes/student");
const instructorRouter = require("./routes/instructor");

// External Dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {connectMongoDB}=require("./config/database");

connectMongoDB(process.env.USER);

// Internal Dependencies
// const admin_routes = require("./routes/admin");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// // Routes
// app.get("/", (req, res) => res.json({ message: "hello world" }));
// // app.use("/admin", admin_routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Routes
app.get("/students", studentRouter);
app.get("/instructors", instructorRouter);
// listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
