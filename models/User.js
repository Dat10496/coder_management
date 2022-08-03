const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "employee", enum: ["manager", "employee"] },
    myTask: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
