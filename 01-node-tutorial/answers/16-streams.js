const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  highWaterMark: 200,
  encoding: "utf8",
});

let counter = 0;

stream.on("data", (res) => {
  console.log(counter++);
  console.log(res);
});

stream.on("end", () => {
  console.log(`The total count is: ${counter}`);
});

stream.on("error", (err) => {
  console.log(err);
});
