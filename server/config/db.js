const mongoose = require("mongoose");
const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongoo");
  } catch (e) {
    console.log(e);
  }
};
module.exports = db;
