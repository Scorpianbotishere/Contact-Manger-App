const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill all field");
  }
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: hashPassword,
      token: genToken(user.id),
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genToken({ id: user.id }),
    });
  } else {
    res.status(400).json({
      message: "Invalid Crediential",
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.user.name} and ${req.user.email}` });
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
