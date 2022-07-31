const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTask,
  updateTask,
  getDetailDescription,
  deleteTask,
} = require("../controllers/task.controller");

/**
 * @route POST api/tasks
 * @description Create new task
 * @access private, assigner
 */
router.post("/", createTask);

/**
 * @route GET api/tasks
 * @description Get all task
 * @access private, assigner
 */
router.get("/", getAllTask);

/**
 * @route PUT api/tasks/:id
 * @description update task
 * @access private, assigner
 */
router.put("/:id", updateTask);

/**
 * @route GET api/tasks/:id
 * @description update task
 * @access private, assigner
 */
router.get("/:id", getDetailDescription);

/**
 * @route DELETE api/tasks/:id
 * @description delete task
 * @access private, assigner
 */
router.delete("/:id", deleteTask);

module.exports = router;
