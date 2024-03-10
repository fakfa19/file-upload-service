require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT;

// API endpoint for home.html
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/pages/home.html`);
});

// API endpoint for routes: /upload
app.use("/", require("./routes/upload"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
