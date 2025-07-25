var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Task = require("../models/task");

router.get("/", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", async (req, res) => {
  try {
    const maxTaskId = await sequenceGenerator.nextId("tasks");
    const task = new Task({
      id: maxTaskId,
      title: req.body.title,
      completed: req.body.completed,
      dueDate: req.body.dueDate,
      assignedTo: req.body.assignedTo,
    });

    console.log("Creating task:", task);
    const createdTask = await task.save();

    res.status(201).json({
      message: "Task added successfully",
      task: createdTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  Task.findOne({ id: req.params.id })
    .then((task) => {
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
          error: { task: "Task not found" },
        });
      }

      task.title = req.body.title;
      task.completed = req.body.completed;
      task.dueDate = req.body.dueDate;
      task.assignedTo = req.body.assignedTo;

      Task.updateOne({ id: req.params.id }, task)
        .then(() => {
          res.status(204).json({
            message: "Task updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred during update",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred during task lookup",
        error: error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Task.findOne({ id: req.params.id })
    .then((task) => {
      Task.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Task deleted successfully",
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
        error: { message: "Task not found" },
      });
    });
});

module.exports = router;
