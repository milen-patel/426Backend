const { newUserSchema } = require("./validation");

const router = require("express").Router();
const User = require("../models/User");

const defaultError = {
  error: "No such user exists on the database",
};

router.get("/experience", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
  }
  res.json({
    error: null,
    data: {
      experience: user.experience,
    },
  });
});

router.get("/balance", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
  }
  res.json({
    error: null,
    data: {
      balance: user.balance,
    },
  });
});

router.get("/maxProperties", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
  }
  res.json({
    error: null,
    data: {
      maxProperties: user.maxProperties,
    },
  });
});

router.get("/location", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
  }
  console.log(user);
  res.json({
    error: null,
    data: {
      lat: user.location[0],
      lon: user.location[1],
    },
  });
});

// Information that won't change after accunt creation
router.get("/accountInformation", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
  }
  res.json({
    error: null,
    data: {
      accountCreationDate: user.accountCreatedDate,
      name: user.name,
      email: user.email,
    },
  });
});

router.post("/move", async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.json(defaultError);
    return;
  }

  // Validate inputs
  if (typeof req.body.lat !== "number") {
    res.json({ error: "Invalid latitude" });
    return;
  }

  if (typeof req.body.lon !== "number") {
    res.json({ error: "Invalid longitude" });
    return;
  }

  const currLat = user.location[0];
  const currLon = user.location[1];
  const newLat = req.body.lat;
  const newLon = req.body.lon;

  const meters =
    1000 *
    distanceInKmBetweenEarthCoordinates(currLat, currLon, newLat, newLon);

  // Make sure user has enough money
  if (user.balance < meters) {
    res.json({
      error: `Not enough funds. Need ${meters} and you only have ${user.balance}`,
    });
    return;
  }

  // Make changes
  user.balance -= meters;
  user.location = [newLat, newLon];
  await user.save();
  res.json({
    error: null,
    data: {
      balance: user.balance,
      lat: user.location[0],
      lon: user.location[1],
      metersTraveled: meters,
    },
  });
});

// From https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

router.post("/buyLevel", async (req, res) => {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      res.json(defaultError);
      return;
    }

    //Ensure that the user has enough money
    const bal = user.balance;
    const currLim = user.maxProperties;

    if (bal < currLim**3) {
        res.json({error: `Insufficient funds. Need ${currLim**3} but only have ${bal}`});
        return;
    }

    // Change user
    user.maxProperties*=2;
    user.balance-=currLim**3;

    await user.save();
    res.json({
        error:null,
        data: {
            balance: user.balance,
            maxProperties: user.maxProperties,
        }
    })
});

module.exports = router;
