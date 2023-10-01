const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter your name, choose a color, and choose the font size!";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${item}</p>
    <form method="POST">
      <label for="name">
        Name: <input type="text" id="name" name="user_name" />
      </label>
      <label for="user_color">
        <select id="colors" name="user_color">
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple" selected>Purple</option>
        </select>
      </label>
      <label for="size">
        Font Size (1 - 10): <input type="number" id="number" name="font_size" min="1" max="10"/>
      </label>
      <button type="submit">Submit</button>
    </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["user_name"]) {
        item = `<h1 style="color:${body["user_color"]}; font-size:${body["font_size"]}rem">${body["user_name"]}</h1>`;
      } else {
        item = "You must entered something into the name field.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
