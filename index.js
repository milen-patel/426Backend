const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const verifyToken = require("./routes/validate-token");
const cors = require("cors");
const Property = require("./models/Property");
const User = require("./models/User");
app.use(cors());

// Import all routes
const authenticationRoute = require("./routes/authentication");
const manageRoute = require("./routes/manage");
const userGettersRoute = require("./routes/userGetters");

dotenv.config();

// Inform the console when the server starts
app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started.");
});

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

// Every minute, update user balance
setInterval(async () => {
  console.log("Starting to pay users...");
  let allUsers = await User.find({});

  // Ignore users who don't own anything
  allUsers = allUsers.filter((e) => {
    return e.properties.length > 0;
  });

  // Get all propertes
  let allProperties = await Property.find({});

  // Iterate over each user
  allUsers.forEach((u) => {
    // Iterate over each property they own
    const startBalance = u.balance;
    u.properties.forEach((currProperty) => {
      // Find the property with this ID
      let targetProperty = allProperties.find((c) => {
        return String(c._id) == String(currProperty);
      });

      if (!targetProperty) {
        console.log("ERROR");
        return;
      }

      if (targetProperty.ownerEmailT1 == u.email) {
        u.balance += targetProperty.hourlyIncome ** 1;
      }
      if (targetProperty.ownerEmailT2 == u.email) {
        u.balance += targetProperty.hourlyIncome ** 2;
      }
      if (targetProperty.ownerEmailT3 == u.email) {
        u.balance += targetProperty.hourlyIncome ** 3;
      }
      if (targetProperty.ownerEmailT4 == u.email) {
        u.balance += targetProperty.hourlyIncome ** 4;
      }
      if (targetProperty.ownerEmailT5 == u.email) {
        u.balance += targetProperty.hourlyIncome ** 5;
      }
    });

    // Save changes, move onto next user
    console.log(`Credited ${u.email} with ${u.balance - startBalance}`);
    u.save();
  });
}, 5*60*1000);
