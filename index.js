const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const verifyToken = require("./routes/validate-token");

dotenv.config();


// Inform the console when the server starts
app.listen(3000, () => {
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

// Import all rouotes
const authenticationRoute = require("./routes/authentication");
const { newUserSchema } = require("./routes/validation");


// Middleware
// Read request bodies as JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
})

app.use("/api/users", authenticationRoute);
app.get("/api/userlevel", verifyToken, (req, res) => {
  res.json(
    {
      error: null,
      level: 50,
    }
  )
});
