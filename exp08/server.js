const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/")
        res.end("Welcome to Mohammed Ufraan's Server");
    else if (req.url === "/about")
        res.end("Computer Science Engineering Student");
    else if (req.url === "/projects")
        res.end("Holo, Copia, Jpeg Go, Toraje");
    else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(3000, () => console.log("Server running on port 3000"));

console.log("Start");

setTimeout(() => console.log("Delayed callback"), 0);

console.log("Synchronous operation");

const file = path.join(__dirname, "data.txt");

fs.readFile(file, "utf8", (err, data) => {
    if (err) console.log(err);
    else console.log("File:", data);
});

console.log("End");