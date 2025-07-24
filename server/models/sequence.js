const mongoose = require("mongoose");
const sequenceSchema = mongoose.Schema({
  maxTaskId: { type: Number, default: 100 },
  maxProcessId: { type: Number, default: 100 },
  maxProjectId: { type: Number, default: 100 },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
