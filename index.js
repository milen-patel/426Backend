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

// Add API for gathering homepage stats
app.get("/api/stats", async (req, res) => {
  let allPlayers = await User.find({});
  let sum = 0;
  allPlayers.forEach(e => (sum+=e.experience));
  res.json(
    {
      numUsers: await User.countDocuments(),
      numProperties: await Property.countDocuments(),
      totalEarnings: sum,
    }
  )
});

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
        u.balance += u.multiplier * (targetProperty.hourlyIncome ** 1);
        u.experience += targetProperty.hourlyIncome ** 1;
      }
      if (targetProperty.ownerEmailT2 == u.email) {
        u.balance += u.multiplier * (targetProperty.hourlyIncome ** 2);
        u.experience += targetProperty.hourlyIncome ** 2;
      }
      if (targetProperty.ownerEmailT3 == u.email) {
        u.balance += u.multiplier * (targetProperty.hourlyIncome ** 3);
        u.experience += targetProperty.hourlyIncome ** 3;
      }
      if (targetProperty.ownerEmailT4 == u.email) {
        u.balance += u.multiplier * (targetProperty.hourlyIncome ** 4);
        u.experience += targetProperty.hourlyIncome ** 4;
      }
      if (targetProperty.ownerEmailT5 == u.email) {
        u.balance += u.multiplier * (targetProperty.hourlyIncome ** 5);
        u.experience += targetProperty.hourlyIncome ** 5;
      }
    });

    // Save changes, move onto next user
    console.log(`Credited ${u.email} with ${u.balance - startBalance}`);
    u.save();
  });
}, 1*60*1000);
