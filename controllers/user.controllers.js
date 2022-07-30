const userController = {};
const User = require("../models/User");
const { sendResponse, AppError } = require("../helpers/utils");

userController.createUser = async (req, res, next) => {
  const data = req.body;
  try {
    if (!data) throw new AppError(400, "Field is invalid", "Bad request");

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
  const filter = {};
  try {
    const listOfUser = await User.find(filter);

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

userController.getUserById = async (req, res, next) => {};

module.exports = userController;
