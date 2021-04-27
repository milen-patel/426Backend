const Property = require("../models/Property");
const User = require("../models/User");
const router = require("express").Router();

router.post("/addPropertyTemp", async (req, res) => {
  return;
  console.log("Request to add store");

  
  const randomCity = [
    {
      name: 'Hinton James',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.902348, -79.043302 ]
    },
    {
      name: 'Khoury',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.903599, -79.043533 ]
    },
    {
      name: 'SASB South',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.904116, -79.04504 ]
    },
    {
      name: 'Ehaus',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.90439, -79.042921 ]
    },
    {
      name: 'SASB North',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.90446, -79.044735 ]
    },
    {
      name: 'Craige Deck',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.902795, -79.047014 ]
    },
    {
      name: 'Hardin',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.904016, -79.045995 ]
    },
    {
      name: 'Rams Head Recreation Center',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.905837, -79.04636 ]
    },
    {
      name: 'Chase Dining Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.905959, -79.045614 ]
    },
    {
      name: 'Kenan Stadium',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.907014, -79.047926 ]
    },
    {
      name: 'Avery',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.906224, -79.044236 ]
    },
    {
      name: 'Parker',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.906936, -79.044391 ]
    },
    {
      name: 'Teague',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.907718, -79.045115 ]
    },
    {
      name: 'Carmichael',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.908201, -79.045716 ]
    },
    {
      name: 'Woolen Gym',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909443, -79.045813 ]
    },
    {
      name: 'Fetzer Gym',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909156, -79.046966 ]
    },
    {
      name: 'Wilson',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909448, -79.049707 ]
    },
    {
      name: 'House Undergraduate Library',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909878, -79.04908 ]
    },
    {
      name: 'Student Stores',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909808, -79.048404 ]
    },
    {
      name: 'Student Union',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.91039, -79.047508 ]
    },
    {
      name: 'Davis',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910968, -79.047959 ]
    },
    {
      name: 'Lenoir',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910599, -79.048758 ]
    },
    {
      name: 'Winston',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910347, -79.046102 ]
    },
    {
      name: 'Alexander',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911385, -79.04636 ]
    },
    {
      name: 'Joyner',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911798, -79.0468 ]
    },
    {
      name: 'Cobb Parking Deck',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911716, -79.045443 ]
    },
    {
      name: 'Greenlaw',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910369, -79.049267 ]
    },
    {
      name: 'Bingham',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910321, -79.049605 ]
    },
    {
      name: 'Murphey',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.91076, -79.04974 ]
    },
    {
      name: 'Dey Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909843, -79.050802 ]
    },
    {
      name: 'Gardner Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910295, -79.050989 ]
    },
    {
      name: 'Venable Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.909713, -79.051344 ]
    },
    {
      name: 'Murray Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.9095, -79.051735 ]
    },
    {
      name: 'Carroll Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910238, -79.051934 ]
    },
    {
      name: 'Chapman',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910069, -79.052572 ]
    },
    {
      name: 'Sitterson',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.90993, -79.053318 ]
    },
    {
      name: 'Peabody',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910564, -79.053602 ]
    },
    {
      name: 'Memorial Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911129, -79.052014 ]
    },
    {
      name: 'Hanes Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.910781, -79.051349 ]
    },
    {
      name: 'Carolina Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911272, -79.049981 ]
    },
    {
      name: 'Campus Y',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911385, -79.05122 ]
    },
    {
      name: 'Steele Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911585, -79.050356 ]
    },
    {
      name: 'Bynum Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911716, -79.049788 ]
    },
    {
      name: 'South Building',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911776, -79.051016 ]
    },
    {
      name: 'Gerrard Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911559, -79.051585 ]
    },
    {
      name: 'Carr Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912228, -79.049659 ]
    },
    {
      name: 'New East',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912724, -79.050276 ]
    },
    {
      name: 'Old East',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912359, -79.05085 ]
    },
    {
      name: 'Howell Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913341, -79.050013 ]
    },
    {
      name: 'Alumni Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913193, -79.051048 ]
    },
    {
      name: 'Morehead Planetarium',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913923, -79.050566 ]
    },
    {
      name: 'Garham Memorial Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.914144, -79.051655 ]
    },
    {
      name: 'Chapel of the Cross',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.914514, -79.049959 ]
    },
    {
      name: 'Spencer Residence Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.914913, -79.049423 ]
    },
    {
      name: 'Battle Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913927, -79.053082 ]
    },
    {
      name: 'Vance Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913801, -79.052931 ]
    },
    {
      name: 'Pettigrew Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.913623, -79.05284 ]
    },
    {
      name: 'Pearson Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912515, -79.052534 ]
    },
    {
      name: 'New West',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911894, -79.052443 ]
    },
    {
      name: 'Old West',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.91202, -79.051826 ]
    },
    {
      name: 'Old Well',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912072, -79.051252 ]
    },
    {
      name: 'Hill Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.912558, -79.053248 ]
    },
    {
      name: 'Swain Hall',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911442, -79.053731 ]
    },
    {
      name: 'Kenan Music Center',
      value: 250,
      hourlyIncome: 60,
      location: [ 35.911885, -79.05454 ]
    },
  ];

  //tmp = tmp.map((e) => ({
  //  name: e.name,
  //  value: 10000,
  //  hourlyIncome: 10000,
  //  location: [e.Latitude, e.Longitude],
  //}));

  //tmp.map((e) => {
    //new Property(e).save();
  //});
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

  await usr.save();
  await prop.save();
  
  res.json({ error: null, data: { 
    user: usr,
    properties: await Property.find({ _id: { $in: usr.properties } }),
   } });
  
});

router.post("/nearbyProperties", async (req, res) => {
  console.log(req.body.lat);
  console.log(req.body.lon);
  console.log(req.body.range);
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

  // Make sure user has property space TODO Fix this
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
