const userController = {};
const User = require("../models/User");
const { sendResponse, AppError } = require("../helpers/utils");
const { body, validationResult } = require("express-validator");

userController.createUser = async (req, res, next) => {
  const data = req.body;
  if (!data) throw new AppError(406, "Path is required", "Bad request");
  try {
    // check field name must be a string
    body("name").isString();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(400, "Path name must be string", "Bad request");
    }

    const created = await User.create(data);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create user successfully!"
    );
  } catch (error) {
    next(error);
  }
};

userController.getAllUser = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    filter = { name: name };
  } else {
    filter = {};
  }
  try {
    const listOfUser = await User.find(filter).populate("myTask");

    sendResponse(
      res,
      200,
      true,
      { data: listOfUser },
      null,
      "Get users successfully"
    );
  } catch (error) {
    next(error);
  }
};

userController.getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const found = await User.findOne({ _id: `${id}` }).populate("myTask");

    const task = found.myTask;

    sendResponse(res, 200, true, { task: task }, null, "Get task successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
