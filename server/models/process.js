const mongoose = require("mongoose");

const processSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: null },
  completed: { type: Boolean, default: false },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports =
  mongoose.models.Process || mongoose.model("Process", processSchema);
