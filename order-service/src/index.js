const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const api = require("./api/index");

const app = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(limiter);

app.use(express.json({ limit: "10kb" }));

app.use("/", api);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
