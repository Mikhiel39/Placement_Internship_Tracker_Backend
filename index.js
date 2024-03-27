//Set environment variables
const dotnev = require("dotenv");
dotnev.config();

// External Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use(cors());
app.use(cookieParser());

// Internal Dependencies
const routes = require("routes");

app.use(express.json());
app.use(express.static('routes'));
// Routes
app.get("/", (req, res) => res.json({ message: "hello world" }));

app.use('/admin', routes.admin);
app.use("/resume", routes.resume);
app.use("/student", routes.student);
app.use("/stream", routes.stream);
app.use("/opportunity",routes.opportunity);

// listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
