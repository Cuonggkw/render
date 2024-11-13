require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./router/web");
const apiRouter = require("./router/api");
const connection = require("./config/database");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 8000;
const hostname = process.env.HOST_NAME;

// config file upload
app.use(fileUpload());

// config req.body
app.use(express.json()); //utilizes the body-parser package
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Declare router.
app.use("/", webRouter);
app.use("/v1/api/", apiRouter);

(async () => {
  try {
    // using mongoose
    await connection();

    // using mongodb driver
    // Connection URL
    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);

    // // Database Name
    // const dbName = process.env.DB_NAME;
    // await client.connect();
    // console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collection = db.collection("customers");

    // // collection.insertOne({ name: "Hoi dan IT" });
    // collection.insertOne({ address: "Ha Noi" });

    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
