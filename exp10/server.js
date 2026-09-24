require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

// Project schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    rating: Number
});

const Project = mongoose.model("Project", projectSchema);

// Contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

// GET projects
app.get("/api/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// POST project
app.post("/api/projects", async (req, res) => {
    const project = await Project.create(req.body);
    res.status(201).json(project);
});

// PUT project
app.put("/api/projects/:id", async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(project);
});

// DELETE project
app.delete("/api/projects/:id", async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
});

// POST contact
app.post("/api/contacts", async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
