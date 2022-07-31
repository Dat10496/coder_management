var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send(" Welcome to coderschool");
});

const userRouter = require("./user.api.js");
router.use("/users", userRouter);

const taskRouter = require("./task.api");
router.use("/tasks", taskRouter);

module.exports = router;
