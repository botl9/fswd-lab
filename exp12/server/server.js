require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    rating: Number
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model("Project", projectSchema);
const Contact = mongoose.model("Contact", contactSchema);

app.get("/api/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.post("/api/contacts", async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});