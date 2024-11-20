const { NODE_ENV = "dev" } = process.env;
const { rateLimit } = require("express-rate-limit");
require("dotenv").config({ path: `./${NODE_ENV}.env` });
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const apiRouter = require("./routes/api.js");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleInternalErrors,
} = require("./controllers/errors");

app.set("trust proxy", 1);

const greenListCampusIpAddresses = (req) => {
  if (
    req.headers["true-client-ip"] === "193.178.113.73" ||
    req.headers["true-client-ip"] === "185.205.174.138"
  ) {
    return 350;
  } else {
    return 25;
  }
};

const setResponseMessage = (req) => {
  if (
    req.headers["true-client-ip"] === "193.178.113.73" ||
    req.headers["true-client-ip"] === "185.205.174.138"
  ) {
    return {
      msg: "Received too many requests from your campus ip address. You and your colleagues should check for infinite loops - once this is resolved, you can send requests again in 1 minute",
    };
  } else {
    return {
      msg: "Received too many requests - check your code for infinite loops. You can send requests again in 1 minute.",
    };
  }
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: greenListCampusIpAddresses,
  message: setResponseMessage,
  statusCode: 429,
  standardHeaders: "draft-7",
  keyGenerator: (req) => {
    return req.headers["true-client-ip"];
  },
  skip: (req, res) => {
    if (!req.path.startsWith("/api")) {
      return true;
    }
  },
});

app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.use(limiter);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public", "build")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "public", "index.html"));
});

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  next({ status: 404, msg: "Route not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleInternalErrors);

module.exports = app;
