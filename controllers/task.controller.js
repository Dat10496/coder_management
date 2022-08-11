const { sendResponse, AppError } = require("../helpers/utils");
const Task = require("../models/Task");
const { check, body, validationResult } = require("express-validator");
const User = require("../models/User");
const isValidObjectId = require("./validateObjecId");

const taskController = {};

taskController.createTask = async (req, res, next) => {
  const info = req.body;

  if (!info) throw new AppError(406, "Path is required", "Bad request");

  // check name of task must be string
  body("name").isString().isExist();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppError("400", "Path name must be string", "Bad request");
  }

  try {
    // check if task is existence
    const checkValueOfTask = await Task.find({ name: info.name });
    if (checkValueOfTask.length) {
      sendResponse(res, 406, false, null, true, "Task is already");
      return;
    }
    // check if contain description
    if (!info.description) {
      sendResponse(res, 406, false, null, true, "description is required");
      return;
    }

    // create new task
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
  // set filter to search status of task
  if (status) {
    filter = { isDeleted: { $eq: false }, status: status };
  } else {
    filter;
  }

  try {
    const lisOfTask = await Task.find(filter).populate("assignee").sort({
      updatedAt: -1,
      createdAt: -1,
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
  const allowStatus = ["archive", "review"];

  const { id } = req.params;
  const { assignee, status } = req.body;

  const updateInfo = { assignee, status };
  const options = { new: true };

  if (!updateInfo) throw new AppError(406, "Path is required", "Bad request");
  if (!id) throw new AppError(402, "Cannot access task", "Bad request");

  // check assignee of task must be array
  check("assignee").isArray();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppError(406, "Path assignee must be array", "Bad request");
  }

  try {
    // check if id is valid in UserModel & ObjectId
    isValidObjectId(id);

    if (assignee) {
      for (let i = 0; i < assignee.length; i++) {
        isValidObjectId(assignee[i]);

        const user = await User.exists({ _id: assignee[i] });
        if (!user) {
          throw new AppError(406, "userId is not exist", "Bad request");
        }
      }
    }

    // Find status of task
    const found = await Task.findOne({ _id: `${id}` });

    // Check requirement 10
    if (status) {
      if (found.status === "done") {
        if (!allowStatus.includes(status)) {
          throw new AppError(406, "Value is not acceptable", "Bad request");
        }
      } else if (found.status === "archive") {
        throw new AppError(406, "Cannot change", "Bad request");
      }
    }

    // Update status & assignee
    const updated = await Task.findByIdAndUpdate(id, updateInfo, options);
    return sendResponse(
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
    // check if id is valid ObjectId
    isValidObjectId(id);

    // Find task by id
    const found = await Task.findOne({ _id: `${id}` });

    const description = found.description;

    sendResponse(
      res,
      200,
      true,
      { description: description },
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
    // check if id is valid ObjectId
    isValidObjectId(id);

    //  Update field isDeleted to true -- soft delete
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
