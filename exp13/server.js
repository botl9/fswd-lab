// Experiment 13 - REST API for Postman testing
const express = require("express");

const app = express();
app.use(express.json());

let projects = [
  { id: 1, title: "Library Management System", stack: "Java, MySQL" },
  { id: 2, title: "Weather App", stack: "HTML, CSS, JavaScript" },
  { id: 3, title: "Result Portal", stack: "React, Node.js" }
];
let nextId = 4;

app.get("/api/projects", (req, res) => {
  res.status(200).json(projects);
});

app.post("/api/projects", (req, res) => {
  const { title, stack } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Project title is required" });
  }

  const newProject = { id: nextId++, title, stack: stack || "" };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  const { title, stack } = req.body;
  if (title !== undefined) project.title = title;
  if (stack !== undefined) project.stack = stack;
  res.status(200).json(project);
});

app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Project not found" });
  }

  const deletedProject = projects.splice(index, 1)[0];
  res.status(200).json({
    message: "Project deleted successfully",
    project: deletedProject
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`REST API server running at http://localhost:${PORT}`);
});
