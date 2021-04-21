const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const verifyToken = require("./routes/validate-token");


// Import all routes
const authenticationRoute = require("./routes/authentication");
const manageRoute = require("./routes/manage");
const userGettersRoute = require("./routes/userGetters");

dotenv.config();


// Inform the console when the server starts
app.listen((process.env.PORT || 5000), () => {
    console.log("Server has started.");
})

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://temp60:420@milencluster.zmag3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Successfully Connected to MongoDB.")
  );

// Read request bodies as JSON
app.use(express.json());

app.use("/api/users", authenticationRoute);
app.use("/api/property", verifyToken, manageRoute);
app.use("/api/user/", verifyToken, userGettersRoute);

//TODO Add Leaderboard
