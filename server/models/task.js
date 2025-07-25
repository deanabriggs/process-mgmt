const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  assignedTo: { type: String, default: null },
});

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
