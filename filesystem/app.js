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

  // Watch for changes on filename, where filename is either a file or a directory,
  // returning an FSWatcher async iterable.
  const watcher = fs.watch("./command.txt");

  // note: Async Iterators and Generators usually use when you want to read a data and
  // data is coming asynchronously. It is a new way to work with asynchronous code.
  // Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
  for await (const event of watcher) {
    // watching for specific event on specific file
    if (event.eventType === "change") {
      // console.log(event); { eventType: 'change', filename: 'command.txt' }

      try {
        // get the size of the file to allocate the right amount of buffer
        const { size } = await commandFileHandler.stat();
        // console.log(size); // 0

        // READ FILE - filehandle.read(buffer, offset, length, position)
        const content = await commandFileHandler.readFile(Buffer.alloc(size), 0, size, 0);
        console.log(content);
      } catch (error) {
        console.error("Error reading file:", error);
      } finally {
        // CLOSE FILE
        // need to close the file after reading or writing to avoid memory leaks
        await commandFileHandler.close();
      }
    }
  }
})();

// https://hackernoon.com/whats-the-difference-between-pathjoin-and-pathresolve
