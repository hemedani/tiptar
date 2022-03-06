// import bodyParser from "body-parser";
// import express from "express";
import http from "http";
import { connectToDatabase } from "./schemas";
import { serveLesan } from "./utils";
// const app = express();
const host = "localhost";
const port = 1396;

async function runServer(): Promise<void> {
  // 4. Connect to MongoDB

  const server = http.createServer(async (req, res) => {
    try {
      await connectToDatabase();
      await serveLesan(req, res);
    } catch (e) {
      res.end(`Somthing is wrong : => ${e.message}`);
    }
  });
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
  // parse application/json
  // app.use(bodyParser.json());
  //
  // app.listen(port, () => {
  //   return console.log(`Express is listening at http://localhost:${port}`);
  // });
  // app.get("/", (req, res) => {
  //   res.send("Sallam be backend");
  // });
  //
  // routes(app);
}

runServer().catch(err => console.log(err));
