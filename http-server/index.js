const http = require("http");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
let homeCont = "";
let projectCont = "";
let regCont = "";
let cssCont = "";
let jsCont = "";

fs.readFile("reg.html", (err, reg) => {
  if (err) {
    throw err;
  }
  regCont = reg;
});

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeCont = home;
});

fs.readFile("proj.html", (err, proj) => {
  if (err) {
    throw err;
  }
  projectCont = proj;
});

fs.readFile("style.css", (err, css) => {
  if (err) {
    throw err;
  }
  cssCont = css;
});

fs.readFile("script.js", (err, js) => {
  if (err) {
    throw err;
  }
  jsCont = js;
});

const port = argv.port || 5000;
http.createServer((request, response) => {
  let url = request.url;
  if (url === "/style.css") {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(cssCont);
    response.end();
    return;
  } else if (url === "/script.js") {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.write(jsCont);
    response.end();
    return;
  }

  response.writeHead(200, { "Content-Type": "text/html" });

  switch (url) {
    case "/reg":
      response.write(regCont);
      break;
    case "/projects":
      response.write(projectCont);
      break;
    default:
      response.write(homeCont);
      break;
  }

  response.end();
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
