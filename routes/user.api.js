const express = require("express");
const {
  getAllUser,
  createUser,
  getTaskById,
} = require("../controllers/user.controllers");
const router = express.Router();

/**
 * @route GET API/users
 * @description Get a list of users
 * @access private
 */
router.get("/", getAllUser);

/**
 * @route POST api/users
 * @description Create new user
 * @access private, assigner
 */
router.post("/", createUser);

/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
router.get("/:id", getTaskById);

module.exports = router;
