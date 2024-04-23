// Http module is built on top of the 'net' module
const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("-----METHOD:-----", req.method);
  console.log("-----URL:-----", req.url);
  console.log("-----HEADERS:-----", req.headers);
  const name = req.headers.name;

  // note: Bad practice to access req body with req.body as we are loading the entire body into memory
  // which will give us huge amount of memory and performance issues.
  // console.log("-----BODY:-----", req.body);

  let data = "";

  // note: Good practice is to use 'streams' to read the body of the request
  // We can send huge http request body in chunks such as json, image, video, etc.
  // No memory issues and better performance since we are not loading the entire body into memory
  // and reading one chunk at a time.
  // NOTE: 'req' is a readable stream
  req.on("data", chunk => {
    // chunk is a buffer data type
    data += chunk.toString();
  });

  req.on("end", () => {
    // data = JSON.parse(data);

    console.log(data);
    console.log(name);
  });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `Post created by ${name}!` }));
});

server.listen(8050, () => {
  console.log("Server listening on port http://localhost:8050");
});
