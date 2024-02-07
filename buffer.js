// This file is used to import the buffer module
const { Buffer } = require("buffer");
console.log(Buffer);

// Allocates a new Buffer Container of size bytes. If fill is undefined, theBuffer will be zero-filled
const memoryContainer = Buffer.alloc(4); // 4 bytes: 32 bits since 1 byte = 8 bits

// note: the memory contents or binary data of a file is usually displayed in 'hexadecimal' format
// compare to 'binary' format since it is easier to read and understand instead of 0s and 1s.
// It can be used to represent large numbers with fewer digits than 'Decimal' format.
// Hexadecimal -- also known as Base 16 or hex -- is one of four numbering systems.
// The other three are decimal (base 10), octal (base 8) & binary (base 2).
// The hexadecimal system contains 16 sequential numbers as base units, including 0.
console.log(memoryContainer);

// access elements of the buffer
console.log(memoryContainer[0]);
console.log(memoryContainer[3]);

// write data to the buffer in hexadecimal format
memoryContainer[0] = 0xf4; // 244 in decimal
memoryContainer[1] = 0x2e; // 46 in decimal
memoryContainer[2] = 0x12; // 18 in decimal
memoryContainer[3] = 0x99; // 153 in decimal

console.log(memoryContainer);
