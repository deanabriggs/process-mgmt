const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  assignedTo: { type: String, default: null },
});

module.exports = mongoose.model("Task", taskSchema);
