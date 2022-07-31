const { sendResponse, AppError } = require("../helpers/utils");
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");

const taskController = {};

taskController.createTask = async (req, res, next) => {
  const info = req.body;
  if (!info) throw new AppError(406, "Path is required", "Bad request");

  body("name").isString();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("400", "Path name must be string", "Bad request");
  }
  try {
    const created = await Task.create(info);
    sendResponse(
      res,
      201,
      true,
      { data: created },
      null,
      "Created task successfully"
    );
  } catch (error) {
    next(error);
  }
};

taskController.getAllTask = async (req, res, next) => {
  let filter = { isDeleted: { $eq: false } };
  const { status } = req.query;
  if (status) {
    filter = { isDeleted: { $eq: false }, status: status };
  } else {
    filter;
  }

  try {
    const lisOfTask = await Task.find(filter).populate("assignee").sort({
      updatedAt: -1,
      updatedAt: -1,
    });
    sendResponse(
      res,
      200,
      true,
      { data: lisOfTask },
      null,
      "Get list of task successfully"
    );
  } catch (error) {
    next(error);
  }
};

taskController.updateTask = async (req, res, next) => {
  const { assignee, status } = req.body;
  const { id } = req.params;
  const updateInfo = { assignee, status };
  const options = { new: true };

  if (!updateInfo) throw new AppError(406, "Path is required", "Bad request");
  if (!id) throw new AppError(402, "Cannot access task", "Bad request");

  try {
    const updated = await Task.findByIdAndUpdate(id, updateInfo, options);
    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update task successfully"
    );
  } catch (error) {
    next(error);
  }
};

taskController.getDetailDescription = async (req, res, next) => {
  const { id } = req.params;

  if (!id) throw new AppError(402, "Cannot access task", "Bad request");
  try {
    const found = await Task.findOne({ _id: `${id}` });

    const description = found.description;

    sendResponse(
      res,
      200,
      true,
      { data: description },
      null,
      "Get description successfully"
    );
  } catch (error) {
    next(error);
  }
};

taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };

  if (!id) throw new AppError(402, "Task not found", "Bad request");

  try {
    const deletedTask = await Task.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );
    sendResponse(
      res,
      200,
      true,
      { data: deletedTask },
      null,
      "Delete task successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = taskController;
