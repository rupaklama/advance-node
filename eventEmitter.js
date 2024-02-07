// NOTE: EventEmitter is to create and handle default/custom events in node
// EventEmitter is a class in Node.js that facilitates communication/interaction between objects in Node.js.
// It's part of the events module and it's used to emit and handle custom events.

// In simpler terms, an EventEmitter is an object that triggers an event whenever a particular action occurs on a server. It's a way to handle asynchronous events. They're commonly used to signal that a certain part of the application has completed a task, and something else can start.

const EventEmitter = require("events");

// Create a new instance of EventEmitter to handle custom events
const myEmitter = new EventEmitter();

// Define an event handler
const myEventHandler = () => {
  console.log("Event emitted!");
};

// Register the event handler for a specific event
myEmitter.on("myEvent", myEventHandler);

// Emit the event
myEmitter.emit("myEvent");

// class
class Emitter extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter2 = new Emitter();

// note: all the event handlers are stored in an array inside of Event object
myEmitter2.on("foo", () => {
  console.log("a foo event occurred1");
});

// call it only 'once' and then remove it from the event object
myEmitter2.once("foo", () => {
  console.log("a foo event occurred2");
});

myEmitter2.on("foo", x => {
  console.log("a foo event parameter occurred3", x);
});

// note: the emit method is used to trigger/call the event handlers inside of the event object above
myEmitter2.emit("foo", "hello world!");
myEmitter2.emit("foo", "hello world!");
