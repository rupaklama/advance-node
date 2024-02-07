const fs = require("fs/promises");
const { resolve, join } = require("path");

// note: __dirname is an environment variable that tells you the absolute path of the directory
// containing the currently executing file.
// console.log(__dirname); // /Users/rupaklama/Desktop/node/advanced-node/filesystem

// note: first step is to Open File
// You get a unique number like id known as 'file descriptor' on opening a file.
// This id is used to perform operations on the file.The file descriptor is a unique number
// that the operating system assigns to an open file to keep track of the file internally.

// note: second step is to Read or Write File

(async () => {
  // OPEN FILE - 'r' flag is for read mode only
  const commandFileHandler = await fs.open("./command.txt", "r");

  // note: FileHandle objects are <EventEmitter> since it is a subclass of EventEmitter
  // therefore, using event listeners to listen for events emitted by the file handle
  commandFileHandler.on("change", async () => {
    const { size } = await commandFileHandler.stat();

    const content = await commandFileHandler.readFile(Buffer.alloc(size), 0, size, 0);

    // decoder to convert binary data to string format
    console.log(content.toString("utf-8"));
  });

  // note: decoder 01 => meaningful
  // encoder meaningful => 01
  // Node JS doesn't understand image & video encoder/decoder,
  // it only understands text encoding/decoding. Use third-party libraries for image & video encoding/decoding.

  // Watch for changes on filename, where filename is either a file or a directory,
  // returning an FSWatcher async iterable.
  const watcher = fs.watch("./command.txt");

  // note: Async Iterators and Generators usually use when you want to read a data and
  // data is coming asynchronously. It is a new way to work with asynchronous code.
  // Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
  for await (const event of watcher) {
    // console.log(event); { eventType: 'change', filename: 'command.txt' }

    // watching for specific event on specific file
    if (event.eventType === "change") {
      // Emit an event using event emitter
      commandFileHandler.emit("change");

      // note: Using Event Emitter to listen for events emitted by the file handle above instead
      // try {
      //   // get the size of the file to allocate the right amount of buffer than needed to save memory
      //   // allocate our buffer with the size of the file
      //   const { size } = await commandFileHandler.stat();
      //   // console.log(size); // number of bytes in the file

      //   // READ FILE - filehandle.read(buffer, offset, length, position)
      //   // we always want to read whole content from beginning of the file so position is 0
      //   const content = await commandFileHandler.readFile(Buffer.alloc(size), 0, size, 0);
      //   console.log(content);
      // } catch (error) {
      //   console.error("Error reading file:", error);
      // }
    }
  }

  // CLOSE FILE
  // need to close the file after reading or writing to avoid memory leaks
  // await commandFileHandler.close();
})();

// https://hackernoon.com/whats-the-difference-between-pathjoin-and-pathresolve
