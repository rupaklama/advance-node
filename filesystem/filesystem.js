// callback api
const fs = require("fs");

// promise api
// const fs = require("fs/promises");

const content = fs.readFileSync("./sample.txt");

// normally binary data is displayed in hexadecimal format
// It can be used to represent large numbers with fewer digits.
console.log(content);

// READ FILE
// character encoding is used to convert the binary data to string format
// converting the binary data to string format as a readable text output
console.log(content.toString("utf-8"));
