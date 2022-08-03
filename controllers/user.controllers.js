const userController = {};
const User = require("../models/User");
const { sendResponse, AppError } = require("../helpers/utils");
const { body, validationResult } = require("express-validator");
const isValidObjectId = require("./validateObjecId");

userController.createUser = async (req, res, next) => {
  const data = req.body;

  if (!data) throw new AppError(406, "Path name is required", "Bad request");

  // check field name must be a string
  body("name").isString();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "Path name must be string", "Bad request");
  }

  try {
    // check if name is existence
    const checkValueOfName = await User.find({ name: data.name });
    if (checkValueOfName.length) {
      throw new AppError(406, "name is used already", "Bad request");
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
  // set filter if have query name
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
    // check if id is valid ObjectId
    isValidObjectId(id);

    // find user's task
    const found = await User.findOne({ _id: `${id}` }).populate("myTask");

    const task = found.myTask;

    // if no task assigned
    if (!task.length) {
      sendResponse(res, 200, true, null, false, "Task is empty");
      return;
    }

    sendResponse(res, 200, true, { task: task }, null, "Get task successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
