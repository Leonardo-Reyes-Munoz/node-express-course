const EventEmitter = require("events");

const emitter = new EventEmitter();

let userID = 1;

function newUserID() {
  return userID++;
}

function numFollowers() {
  return Math.floor(Math.random() * 100000);
}

setInterval(() => {
  emitter.emit(
    "newUser",
    `hi there, I am a new user with user ID of ${newUserID()} and I have ${numFollowers()} followers`
  );
}, 2000);

emitter.on("newUser", (msg) => console.log(msg));
