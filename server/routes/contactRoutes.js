const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");
const { protct } = require("../middleware/authMiddleware");
router.get("/", protct, getContact);
router.post("/", protct, createContact);
router.put("/:id", protct, updateContact);
router.delete("/:id", protct, deleteContact);

module.exports = router;
