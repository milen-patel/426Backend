const Property = require("../models/Property");
const User = require("../models/User");
const router = require("express").Router();

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

router.post("/sell", async (req, res) => {
  // Make sure we have input
  if (!req.body.id) {
    res.json({ error: "No property id" });
    return;
  }

  if (!req.body.email) {
    res.json({ error: "No email" });
    return;
  }

  if (!req.body.tier) {
    res.json({ error: "No tier" });
    return;
  }

  // Find the user
  let usr = await User.findOne({ email: req.body.email });
  if (!usr) {
    res.json({ error: "No such user found" });
    return;
  }

  let prop = await Property.findById(req.body.id);
  if (!prop) {
    res.json({ error: "No such property found" });
    return;
  }

  // Make sure user owns property
  const tier = req.body.tier;
  if (tier == 1) {
    if (prop.ownerEmailT1 != req.body.email) {
      res.json({ error: "User doesn't own this property" });
      return;
    }
  } else if (tier == 2) {
    if (prop.ownerEmailT2 != req.body.email) {
      res.json({ error: "User doesn't own this property" });
      return;
    }
  } else if (tier == 3) {
    if (prop.ownerEmailT3 != req.body.email) {
      res.json({ error: "User doesn't own this property" });
      return;
    }
  } else if (tier == 4) {
    if (prop.ownerEmailT4 != req.body.email) {
      res.json({ error: "User doesn't own this property" });
      return;
    }
  } else {
    if (prop.ownerEmailT5 != req.body.email) {
      res.json({ error: "User doesn't own this property" });
      return;
    }
  }

  // Remove the user from the property
  if (tier == 1) {
    prop.ownerEmailT1 = "";
  } else if (tier == 2) {
    prop.ownerEmailT2 = "";
  } else if (tier == 3) {
    prop.ownerEmailT3 = "";
  } else if (tier == 4) {
    prop.ownerEmailT4 = "";
  } else {
    prop.ownerEmailT5 = "";
  }

  // Only remove prop from user if they own no other tiers
  let ownsOtherTier = false;
  if (prop.ownerEmailT1 == req.body.email) {
    ownsOtherTier = true;
  }
  if (prop.ownerEmailT2 == req.body.email) {
    ownsOtherTier = true;
  }
  if (prop.ownerEmailT3 == req.body.email) {
    ownsOtherTier = true;
  }
  if (prop.ownerEmailT4 == req.body.email) {
    ownsOtherTier = true;
  }
  if (prop.ownerEmailT5 == req.body.email) {
    ownsOtherTier = true;
  }

  if (!ownsOtherTier) {
    console.log("User sold last tier of this property they owned, deleting it from their property list")
    const idx = usr.properties.indexOf(req.body.id)
    usr.properties.splice(idx, 1);
  } else{
    console.log("User sold a tier of this property but owns other tiers, keeping it in the property list")
  }

  prop.level++;

  await usr.save();
  await prop.save();
  
  res.json({ error: null, data: { 
    user: usr,
    properties: await Property.find({ _id: { $in: usr.properties } }),
   } });
  
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
    res.json({ error: "Missing range" });
    return;
  }

  const targetLat = req.body.lat;
  const targetLon = req.body.lon;
  const range = req.body.range;

  let results;
  try {
    results = await Property.find({
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
  } catch (error) {
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
  targetProperty.level++;

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
  if (
    user.properties.length == user.maxProperties &&
    !user.properties.includes(req.body.id)
  ) {
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
  await user.save(); 
  await targetProperty.save();

  res.json({
    error: null,
    data: {
      user: user,
      property: targetProperty,
    },
  });
});

/*
router.post("/reloadProperties", async (req, res) => {
  console.log("Request to add store");

  randomCity = randomCity.map((e) => {
    return {
      name: e.name,
      value: Math.floor(Math.random() * 1000),
      hourlyIncome: Math.floor(Math.random() * 1000),
      location: e.location,
    }
  });

  let bigProcessed = big.map((e) => {
    return {
      name: e.name,
      value: e.value,
      location: [e.lat, e.lng],
      hourlyIncome: Math.floor(Math.random() * 1000),
    }
  });

  bigProcessed.map((e) => {
    new Property(e).save();
  });

  res.send("Done");
});
*/


module.exports = router;
