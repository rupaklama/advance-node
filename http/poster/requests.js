const http = require("node:http");
const fs = require("node:fs/promises");

// mini express like framework
class Requests {
  constructor() {
    this.server = http.createServer();
    this.routes = {};

    this.server.on("request", (req, res) => {
      // console.log("-----METHOD:-----", req.method);
      // console.log("-----URL:-----", req.url);

      // func to send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);

        // the pipe() method is transferring data from a file stream (fileStream) to a response object (res)
        fileStream.pipe(res);
      };

      // func to set the status code of the response
      res.status = code => {
        res.statusCode = code;
        return res;
      };

      // func to send a response back to the client
      res.json = data => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      if (!this.routes[req.method.toLowerCase() + req.url]) {
        return res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
      }

      // call this method on every request to send above response back to the client
      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Requests;
