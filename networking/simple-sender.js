const net = require("net");

// Create a new TCP socket connection to any TCP server
const socket = new net.createConnection(
  {
    host: "127.0.0.1",
    port: 3099,
  },
  () => {
    console.log("Connected to server!");
    socket.write("A simple message coming from the simple-sender.js module!");
  }
);
