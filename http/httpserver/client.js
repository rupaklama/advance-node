const http = require("node:http");

// Agent is responsible for managing connection persistence and reuse for HTTP clients through TCP connection. It maintains a queue of pending requests for a given host and port, reusing a single socket connection for each until the queue is empty, Whether it is destroyed or pooled depends on the keepAlive option.
const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent, // if not provided, a new agent is created for every request by default
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
    name: "John Doe",
  },
});

// This event is emitted only once, no matter how many times we write to the request
request.on("response", response => {
  console.log("-----STATUS:-----", response.statusCode);
  console.log("-----HEADERS:-----", response.headers);

  response.on("data", chunk => {
    console.log("-----BODY:-----", chunk.toString());
  });

  response.on("end", () => {
    console.log("-----NO MORE DATA in response-----");
  });
});

// writable.write() method writes some data to the stream, and calls the supplied callback once the data has been fully handled. If an error occurs, the callback will be called with the error as its first argument. The callback is called asynchronously and before 'error' is emitted.
// note: sending data to the server
request.write(JSON.stringify({ title: "Post 1", body: "This is post 1" }));
// request.write(JSON.stringify({ title: "Post 2", body: "This is post 2" }));
// request.write(JSON.stringify({ title: "Post 3", body: "This is post 3" }));

// writable.end() method signals that no more data will be written to the Writable. The optional 'chunk' and 'encoding' arguments allow one final additional chunk of data to be written immediately before closing the stream.
// note: ending the request
request.end();
