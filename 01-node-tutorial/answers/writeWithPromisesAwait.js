const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile(
      "./content/tempt.txt",
      "This is the first paragraph\nThis is the second\n This is the third line"
    );
  } catch (err) {
    console.log(err);
  }
};

const reader = async () => {
  try {
    const first = await readFile("./content/tempt.txt", "utf8");
    console.log(first);
  } catch (err) {
    console.log(err);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (err) {
    console.log(err);
  }
};

readWrite();
