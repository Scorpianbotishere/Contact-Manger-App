const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/api/contacts", require("./routes/contactRoutes"));
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
