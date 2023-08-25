const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.NODE_APP_PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "250mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes path
const contactUsRoutes = require("./routes/contactUs");

app.use("/api/contacts/", contactUsRoutes.routes);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "storage/logs/access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

app.listen(port, () => console.log(`Compiled successfully on port: ${port}`));
