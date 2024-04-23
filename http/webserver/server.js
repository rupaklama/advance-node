const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const server = http.createServer();

server.on("request", async (req, res) => {
  console.log("-----METHOD:-----", req.method);
  console.log("-----URL:-----", req.url);

  if (req.url === "/" && req.method === "GET") {
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, { "Content-Type": "text/html" });

    try {
      const fileHandler = await fs.open("./public/index.html", "r");
      const fileStream = fileHandler.createReadStream();
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error reading index.html file:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }

  if (req.url === "/style.css" && req.method === "GET") {
    try {
      const fileHandler = await fs.open(path.join(__dirname, "public", "style.css"), "r");
      const fileStream = fileHandler.createReadStream();
      // res.writeHead(200, { "Content-Type": "text/css" });
      res.setHeader("Content-Type", "text/css");
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error reading style.css file:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }

  if (req.url === "/script.js" && req.method === "GET") {
    try {
      const fileHandler = await fs.open(path.join(__dirname, "public", "script.js"), "r");
      const fileStream = fileHandler.createReadStream();
      res.setHeader("Content-Type", "application/javascript");
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error reading script.js file:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }

  if (req.url === "/login" && req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    const body = {
      message: "Login successful!",
    };

    res.end(JSON.stringify(body));
  }

  if (req.url === "/user" && req.method === "PUT") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;

    const body = {
      message: "User needs to first login",
    };

    res.end(JSON.stringify(body));
  }

  if (req.url === "/upload" && req.method === "POST") {
    try {
      if (req.headers["content-type"] !== "image/png") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid file type" }));
        return;
      }

      if (req.url === "/upload" && req.method === "POST") {
        // create new file in storage directory with the name image.png
        const fileHandler = await fs.open("./storage/image.png", "w");
        const fileStream = fileHandler.createWriteStream();
        req.pipe(fileStream);

        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;

        req.on("end", () => {
          res.end(JSON.stringify({ message: "Image uploaded successfully" }));
        });
      }
    } catch (error) {
      console.error("Error reading image file:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

server.listen(8050, () => {
  console.log("Server listening on port http://localhost:8050");
});
