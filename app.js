var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

require("dotenv").config();
const cors = require("cors");
const { AppError, sendResponse } = require("./helpers/utils");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log(`Connected ${mongoUri}`))
  .catch((err) => console.log(err));

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new AppError(404, "Not found", "Bad request");
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err, "ERROR");
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    err.isOperational ? err.errorType : "Internal server error",
    { message: err.message }
  );
});

module.exports = app;
