const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify({
        message: "Microservices application is running successfully!",
        version: process.env.APP_VERSION || "1.0.0"
    }));
});

server.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
