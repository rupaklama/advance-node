// node:net module provides an asynchronous network API for creating stream-based TCP or IPC servers
const net = require("net");

// TCP (Transmission Control Protocol) is a standard that defines how to establish and maintain a network conversation through which application programs can exchange data
// Create a new TCP server
const server = net.createServer(socket => {
  socket.on("data", data => {
    console.log("Data received from client:", data.toString());
    // socket.write("Server received your data.");
  });
});

// Our app is part of the network which requires a port to listen on or route to
server.listen(3099, "127.0.0.1", () => {
  console.log("Server started on", server.address());
});
