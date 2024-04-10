// Set environment variables
require("dotenv").config();
const studentRouter = require("./routes/student");
const instructorRouter = require("./routes/instructor");
const adminRouter = require("./routes/admin");
// External Dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");

const { connectMongoDB } = require("./config/database");

connectMongoDB(process.env.USER);

// Internal Dependencies
// const admin_routes = require("./routes/admin");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routes
app.get("/api", (req, res) => res.send("Hello World"));
app.use("/api/students", studentRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/admins", adminRouter);

// listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
