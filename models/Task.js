const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "working", "review", "done", "archive"],
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
