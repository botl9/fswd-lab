// Experiment 14 - Simple GraphQL API for project management
const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");

const app = express();

let projects = [
  { id: 1, title: "Library Management System", stack: "Java, MySQL" },
  { id: 2, title: "Weather App", stack: "HTML, CSS, JavaScript" },
  { id: 3, title: "Result Portal", stack: "React, Node.js" }
];
let nextId = 4;

const schema = buildSchema(`
  type Project {
    id: Int!
    title: String!
    stack: String!
  }
  input ProjectInput {
    title: String!
    stack: String!
  }
  type Query {
    projects: [Project!]!
    project(id: Int!): Project
  }
  type Mutation {
    addProject(input: ProjectInput!): Project!
    updateProject(id: Int!, input: ProjectInput!): Project
    deleteProject(id: Int!): String!
  }
`);

const root = {
  projects: () => projects,
  project: ({ id }) => projects.find((item) => item.id === id),
  addProject: ({ input }) => {
    const newProject = { id: nextId++, title: input.title, stack: input.stack };
    projects.push(newProject);
    return newProject;
  },
  updateProject: ({ id, input }) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return null;
    project.title = input.title;
    project.stack = input.stack;
    return project;
  },
  deleteProject: ({ id }) => {
    const index = projects.findIndex((item) => item.id === id);
    if (index === -1) return "Project not found";
    projects.splice(index, 1);
    return "Project deleted successfully";
  }
};

app.all("/graphql", createHandler({ schema, rootValue: root }));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
});
