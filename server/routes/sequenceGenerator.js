var Sequence = require("../models/sequence");

var maxTaskId;
var maxProcessId;
var maxProjectId;
var sequenceId = null;

function SequenceGenerator() {
  (async () => {
    try {
      const sequence = await Sequence.findOne().exec();

      if (!sequence) {
        throw new Error("No sequence found");
      }

      sequenceId = sequence._id;
      maxTaskId = sequence.maxTaskId;
      maxProcessId = sequence.maxProcessId;
      maxProjectId = sequence.maxProjectId;
    } catch (error) {
      console.error("Error initializing SequenceGenerator:", error);
    }
  })();
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "tasks":
      maxTaskId++;
      updateObject = { maxTaskId: maxTaskId };
      nextId = maxTaskId;
      break;
    case "processes":
      maxProcessId++;
      updateObject = { maxProcessId: maxProcessId };
      nextId = maxProcessId;
      break;
    case "projects":
      maxProjectId++;
      updateObject = { maxProjectId: maxProjectId };
      nextId = maxProjectId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .exec()
    .catch((error) => {
      console.log("nextId error = " + error);
      return null;
    });
  return nextId;
};

module.exports = new SequenceGenerator();
