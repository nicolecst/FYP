import express from "express";
import bodyParser from 'body-parser';
import { MongoClient } from "mongodb";

async function start() {
  const app = express();
  const router = express.Router();
  const port = 3000;

  const url = "mongodb+srv://nicolecst:7fUWUtSb@cluster0.j43pz4m.mongodb.net/";
  const client = new MongoClient(url);
  const ObjectId = require("mongodb").ObjectId;

  await client.connect();
  const db = client.db("itineraryPlanner");

  app.use(bodyParser.json())

  app.get("/api/", async (req, res) => {
    const activities = await db.collection("Activities").find({}).toArray();
    console.log('hello');
    res.send(activities);
  });
  app.get("/api/activities/:id", async (req, res) => {
    const activity = await db
      .collection("Activities")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.send(activity);
  });

  app.get("/api/users", async (req, res) => {
    res.send("This are the users");
  });

  app.post("/api/user", async (req, res) => {
    res.send("add users")
    // const user = await db
    //   .collection("Users")
    //   .insertOne(req.body);
    // res.status(201).json(user);
  });

  app.get("/api/login", async (req, res) => {
    console.log("Login page")
    const users = await db.collection("Users").find({}).toArray();
    res.send(users);
  });

  app.post("/api/register", async (req, res) =>{
    const users = await db.collection("Users");
    users.insertOne({
        username: req.body.username,
        password: req.body.password,
    });
    res.status(201).send();
  })

  app.get("/api/home", async (req, res) => {
    res.send("home");
  });

  app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
  });
}

start();
