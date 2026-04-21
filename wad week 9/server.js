const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

const emitter = new EventEmitter();

// Event
emitter.on("requestReceived", () => {
    console.log("A request was received!");
});

const server = http.createServer((req, res) => {

    emitter.emit("requestReceived");

    if (req.url === "/") {
        res.write("Welcome to Home Page");
        res.end();
    }

    else if (req.url === "/os") {
        res.writeHead(200, { "Content-Type": "application/json" });

        const osData = {
            platform: os.platform(),
            cpu: os.cpus().length,
            freeMemory: os.freemem(),
            totalMemory: os.totalmem()
        };

        res.end(JSON.stringify(osData));
    }
else if (req.url === "/path") {
    const pathData = {
        filename: path.basename(__filename),
        dirname: path.dirname(__filename),
        extension: path.extname(__filename)
    };

    res.end(JSON.stringify(pathData));
}
    else {
        res.write("404 Not Found");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});