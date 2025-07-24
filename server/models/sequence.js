const mongoose = require("mongoose");
const sequenceSchema = mongoose.Schema({
  maxDocumentId: { type: Number, default: 100 },
  maxMessageId: { type: Number, default: 100 },
  maxContactId: { type: Number, default: 100 },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
