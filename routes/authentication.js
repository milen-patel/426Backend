const User = require("../models/User");
const router = require("express").Router();
const { newUserSchema } = require("./validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register API
router.post("/register", async (req, res) => {
  // Inform the log
  console.log(
    `Register API Called. Information: Name: ${req.body.name}, Email: ${req.body.email}`
  );

  // Validate input
  const { error } = newUserSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.details[0].message,
    });
    return;
  }

  // Check to see if a user already exists with the current email
  const emailAlreadyExists = await User.findOne({ email: req.body.email });

  if (emailAlreadyExists) {
    res.status(400).json({ error: "Email is being used by another acccount" });
    return;
  }

  // Validation passed!
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    location: [35.9132, 79.0558]
  });

  // Try to save user into database
  try {
    newUser.save().then((e) => {
      res.json({ error: null, data: { id: e._id } });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Login API
router.post("/login", async (req, res) => {
  // Validate the input TODO

  // Try search the user in the database
  const user = await User.findOne({ email: req.body.email });

  // Did we find a user?
  if (!user) {
    res.status(400).json({
      error: "No user found with this email!",
    });
    return;
  }

  // Check for password match
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    res.status(400).json({
      error: "Invalid password!",
    });
    return;
  }

  // Create JWT Token
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.TOKEN_SECRET
  );

  // Return the correct information to the caller
  res.json({
    error: null,
    data: {
      token,
    },
  });
});

module.exports = router;
