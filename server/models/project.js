const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  notes: { type: String, default: null },
  status: { type: String, default: "not-started" },
  processes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Process" }],
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
