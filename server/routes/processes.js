var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Process = require("../models/process");

router.get("/", (req, res) => {
  Process.find()
    .populate("group")
    .then((processs) => {
      res.status(200).json(processs);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", async (req, res) => {
  try {
    const maxProcessId = await sequenceGenerator.nextId("processs");
    const process = new Process({
      id: maxProcessId,
      title: req.body.title,
      completed: req.body.completed,
      description: req.body.description,
      tasks: req.body.tasks,
    });

    const createdProcess = await process.save();

    res.status(201).json({
      message: "Process added successfully",
      process: createdProcess,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  Process.findOne({ id: req.params.id })
    .then((process) => {
      process.title = req.body.title;
      process.completed = req.body.completed;
      process.description = req.body.description;
      process.tasks = req.body.tasks;
      Process.updateOne({ id: req.params.id }, process)
        .then((result) => {
          res.status(204).json({
            message: "Process updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Process not found",
        error: { process: "Process not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Process.findOne({ id: req.params.id })
    .then((process) => {
      Process.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Process deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: { message: "Process not found" },
      });
    });
});

module.exports = router;
