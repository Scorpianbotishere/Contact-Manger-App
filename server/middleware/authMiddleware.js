const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protct = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      res.status(400);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("No Token");
  }
});

module.exports = { protct };
