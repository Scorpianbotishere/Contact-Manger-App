const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/userController");
const { protct } = require("../middleware/authMiddleware");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/getuser", protct, getUser);

module.exports = router;
