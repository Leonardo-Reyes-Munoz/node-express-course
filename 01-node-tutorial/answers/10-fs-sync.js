const { readFileSync, writeFileSync } = require("fs");

writeFileSync("./temporary/fileA.txt", "This is the first line.", {
  flag: "a",
});

writeFileSync("./temporary/fileA.txt", "Second is the next line.", {
  flag: "a",
});

writeFileSync("./temporary/fileA.txt", "Third is the last line.", {
  flag: "a",
});

const testFile = readFileSync("./temporary/fileA.txt", "utf8");
console.log(testFile);
