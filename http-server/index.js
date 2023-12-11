
const http = require("http");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let cssContent = "";
let jsContent = "";
let users = [];

const readFile = (filename, callback) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      throw err;
    }
    callback(data);
  });
};

readFile("registration.html", (data) => {
  registrationContent = data;
});

readFile("home.html", (data) => {
  homeContent = data;
});

readFile("project.html", (data) => {
  projectContent = data;
});

readFile("index1.css", (data) => {
  cssContent = data;
});

readFile("index1.js", (data) => {
  jsContent = data;
});

const port = argv.port || 5000;

http.createServer((request, response) => {
  const url = request.url;

  if (url === "/index1.css") {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(cssContent);
    return response.end();
  } else if (url === "/index1.js") {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.write(jsContent);
    return response.end();
  }

  response.writeHead(200, { "Content-Type": "text/html" });

  switch (url) {
    case "/registration":
      response.write(registrationContent);
      break;
    case "/project":
      response.write(projectContent);
      break;
    default:
      response.write(homeContent);
      break;
  }

  return response.end();
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
