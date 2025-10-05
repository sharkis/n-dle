const http = require("http");
const { spawn } = require("node:child_process");

const hostname = "127.0.0.1";
const port = "8001";

const server = http.createServer(async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000'); // Allow requests from this origin
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow these methods
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow these headers
  let rbody = "";
  req.on("data", (data) => {
    rbody += data;
  });
  req.on("end", () => {
    resBody = "";
    resCode = 200;
    try {
      const getWord = spawn("bash", ["./lib/getWord.sh", rbody]);
      getWord.stdout.on("data", (data) => {
        resBody += data.toString();
      });
      getWord.stdout.on("close", (code) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(resBody);
      });
      getWord.stderr.on("data", (data) => {
        console.log(data.toString());
      });
    } catch (e) {
      resBody = e.toString();
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(resBody);
    }
  });
});

server.listen(port, hostname, () => {
  console.log("server started");
});
