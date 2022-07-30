const express = require("express");
const {
  getAllUser,
  createUser,
  getUserById,
} = require("../controllers/user.controllers");
const router = express.Router();

/**
 * @route GET api/user
 * @description get list of user
 * @access public
 */
router.get("/", getAllUser);

/**
 * @route CREATE api/
 * @description get list of boos
 * @access public
 */
router.post("/", createUser);

/**
 * @route GET api/:id
 * @description get list of boos
 * @access public
 */
router.get("/:id", getUserById);

module.exports = router;
