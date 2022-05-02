const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { port } = require("./env");
const words = require("../routes/words.route");

const app = express();

app.set("port", port);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", words);

module.exports = app;