const express = require("express");
const db = require("./config/db");
const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv").config();

db();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
