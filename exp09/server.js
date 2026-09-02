const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const projects = [
    { id: 1, name: "Holo", description: "P2P file sharing" },
    { id: 2, name: "Copia", description: "Database in Go" },
    { id: 3, name: "Jpeg Go", description: "JPEG encoder in Go" }
];

const messages = [];

// GET projects
app.get("/api/projects", (req, res) => {
    res.json(projects);
});

// POST contact message
app.post("/api/messages", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
        return res.status(400).json({ error: "All fields are required" });

    messages.push({ name, email, message });
    res.status(201).json({ message: "Message submitted successfully" });
});

// GET messages
app.get("/api/messages", (req, res) => {
    res.json(messages);
});

// error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});