var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Project = require("../models/project");

router.get("/", (req, res) => {
  Project.find()
    .populate("group")
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", async (req, res) => {
  try {
    const maxProjectId = await sequenceGenerator.nextId("projects");
    const project = new Project({
      id: maxProjectId,
      title: req.body.title,
      notes: req.body.notes,
      status: req.body.status,
      processes: req.body.processes,
    });

    const createdProject = await project.save();

    res.status(201).json({
      message: "Project added successfully",
      project: createdProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  Project.findOne({ id: req.params.id })
    .then((project) => {
      project.title = req.body.title;
      project.notes = req.body.notes;
      project.status = req.body.status;
      project.processes = req.body.processes;
      Project.updateOne({ id: req.params.id }, project)
        .then((result) => {
          res.status(204).json({
            message: "Project updated successfully",
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
        message: "Project not found",
        error: { project: "Project not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Project.findOne({ id: req.params.id })
    .then((project) => {
      Project.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Project deleted successfully",
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
        error: { message: "Project not found" },
      });
    });
});

module.exports = router;
