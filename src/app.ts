import bodyParser from "body-parser";
import express from "express";
import { connect } from "mongoose";
import { routes } from "./controllers";
const app = express();
const port = 1380;

async function runServer(): Promise<void> {
  try {
    // 4. Connect to MongoDB
    await connect("mongodb://localhost:27017/mosque");

    // const doc = new UserModel({
    //   name: "Bill",
    //   email: "bill@initech.com",
    //   avatar: "https://i.imgur.com/dM7Thhn.png",
    // });
    // await doc.save();
    //
    // console.log(doc.email); // 'bill@initech.com'

    // parse application/json
    app.use(bodyParser.json());

    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
    app.get("/", (req, res) => {
      res.send("Sallam be backend");
    });

    routes(app);
  } catch (e) {
    /*
    *  @LOG @DEBUG @INFO
    *  This log written by ::==> {{ syd }}
    *
    *  Please remove your log after debugging
    */
    console.group("err ------ ");
    console.log(" ============= ");
    console.log();
    console.info(e.message, " ------ ");
    console.log();
    console.log(" ============= ");
    console.groupEnd();
  }
}

runServer().catch(err => console.log(err));
