const Property = require("../models/Property");
const User = require("../models/User");
const router = require("express").Router();

router.post("/addPropertyTemp", async (req, res) => {
  console.log("Request to add store");

  const randomCity = [
    {
      name: "Larke",
      value: 250,
      hourlyIncome: 60,
      location: [35.917807, -79.052262],
    },
    {
      name: "Union",
      value: 250,
      hourlyIncome: 60,
      location: [35.91942, -79.0526],
    },
    {
      name: "Home",
      value: 290,
      hourlyIncome: 65,
      location: [35.793781, -78.808533],
    },
    {
      name: "Cary Academy",
      value: 291,
      hourlyIncome: 85,
      location: [35.81996, -78.76825],
    },
    {
      name: "Downtown Cary",
      value: 363,
      hourlyIncome: 85,
      location: [35.79147, -78.781143],
    },
  ];

  randomCity.map((e) => {
    new Property(e).save();
  });

  res.send("E");
});

router.post("/propertyByID", async (req, res) => {
  if (!req.body.id) {
    res.json({ error: "No ID specified" });
    return;
  }
  if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({ error: "Invalid ID specified" });
    return;
  }

  let target = await Property.findById(req.body.id);
  if (!target) {
    res.json({ error: "No Such Property Found" });
    return;
  }
  res.json({ error: null, body: target });
});

router.post("/nearbyProperties", async (req, res) => {
  //Make sure we have input
  if (!req.body.lat) {
    res.json({ error: "Missing lat" });
    return;
  }

  if (!req.body.lon) {
    res.json({ error: "Missing lon" });
    return;
  }

  if (!req.body.range) {
    //TODO Make sure all of these are numbers
    res.json({ error: "Missing range" });
    return;
  }

  const targetLat = req.body.lat;
  const targetLon = req.body.lon;
  const range = req.body.range;

  let results;
  try {
    await Property.find({
      location: {
        $near: {
          $maxDistance: range,
          $geometry: {
            type: "Point",
            coordinates: [targetLat, targetLon],
          },
        },
      },
    });
  } catch (error){
    console.log("Error");
    console.log(error);
    console.log(error.toString());
  }

  res.send(results);
});

router.post("/buy", async (req, res) => {
  // Validate input: user, propertyID, tier
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json({ error: "No such user" });
    return;
  }

  if (!req.body.propertyId) {
    res.json({ error: "No ID specified" });
    return;
  }
  if (!req.body.propertyId.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({ error: "Invalid ID specified" });
    return;
  }

  let targetProperty = await Property.findById(req.body.propertyId);

  if (!targetProperty) {
    res.json({ error: "No Such Property Found" });
    return;
  }

  if (!req.body.tier) {
    res.json({ error: "No tier given" });
    return;
  }

  // Make sure tier is available
  const t = req.body.tier;
  if (t == 1) {
    if (targetProperty.ownerEmailT1 !== "") {
      res.json({ error: "Tier already owned" });
      return;
    }
  } else if (t == 2) {
    if (targetProperty.ownerEmailT2 !== "") {
      res.json({ error: "Tier already owned" });
      return;
    }
  } else if (t == 3) {
    if (targetProperty.ownerEmailT3 !== "") {
      res.json({ error: "Tier already owned" });
      return;
    }
  } else if (t == 4) {
    if (targetProperty.ownerEmailT4 !== "") {
      res.json({ error: "Tier already owned" });
      return;
    }
  } else {
    if (targetProperty.ownerEmailT5 !== "") {
      res.json({ error: "Tier already owned" });
      return;
    }
  }

  // Make sure user has balance
  const price = targetProperty.value ** t;
  if (price > user.balance) {
    res.json({
      error: `Insufficient Funds. Need ${price} but only have ${user.balance}`,
    });
    return;
  }

  // Make sure user has property space
  if (user.properties.length == user.maxProperties) {
    res.json({ error: "Not enough property space" });
    return;
  }

  // Charge user
  user.balance -= price;

  // Update property owners
  if (t == 1) {
    targetProperty.ownerEmailT1 = user.email;
  } else if (t == 2) {
    targetProperty.ownerEmailT2 = user.email;
  } else if (t == 3) {
    targetProperty.ownerEmailT3 = user.email;
  } else if (t == 4) {
    targetProperty.ownerEmailT4 = user.email;
  } else {
    targetProperty.ownerEmailT5 = user.email;
  }

  // Update user properties owned
  if (!user.properties.includes(targetProperty._id)) {
    user.properties.push(targetProperty._id);
  }

  // Save property and user to db
  await user.save(); //TODO shouldn't return password
  await targetProperty.save();

  res.json({
    error: null,
    data: {
      user: user,
      property: targetProperty,
    },
  });
});

module.exports = router;
