import express from "express";
import bodyParser from "body-parser";
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

  app.use(bodyParser.json());

  app.get("/api/", async (req, res) => {
    const activities = await db.collection("Activities").find({}).toArray();
    console.log("hello");
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
    res.send("add users");
    // const user = await db
    //   .collection("Users")
    //   .insertOne(req.body);
    // res.status(201).json(user);
  });

  //Login Page
  app.get("/api/login", async (req, res) => {
    console.log("Login page");
    const users = await db.collection("Users").find({}).toArray();
    res.send(users);
  });

  app.post("/api/login", async (req, res) => {
    const check = await db
      .collection("Users")
      .findOne({ username: req.body.username });
    if (!check) {
      res.send("User is not found!");
      return;
    } else {
      const match = await db
        .collection("Users")
        .findOne({ username: req.body.username, password: req.body.password });
      if (match) {
        const user = {};
        return res.json(user);
        //   res.send("OKK");
        //   res.status(200).send();
        //   return
      } else {
        res.send("Incorrect Information");
        res.status(400).send("Invalid Credentials");
        return;
      }
    }

    // if (req.body.password == "123456") {
    //   const user = {};
    //   return res.json(user);
    // } else {
    //   res.status(400).send("Invalid Credentials");
    // }
    // let user = req.body;
    // try {
    //   const check = await db.collection("Users").findOne({username: user.username})
    //   console.log(check)
    //   if(!check){
    //     res.send("User is not found!")
    //     return
    //   }
    //     const match = await db.collection("Users").findOne({username: req.body.username, password: req.body.password})
    //     console.log(match)
    //     if(match){
    //         res.send("ok")
    //         res.status(200).send();
    //     }else{
    //         res.send("Incorrect Information")
    //         return
    //     }
    // } catch (e) {
    //     return res.status(500).json(e);
    // }

    // res.send("Login");
  });

  //Register Page
  app.post("/api/register", async (req, res) => {
    const existUser = await db
      .collection("Users")
      .findOne({ username: req.body.username });
    if (existUser) {
      res.send("User already exists, please use a different name");
    } else {
      const users = await db.collection("Users");
      users.insertOne({
        username: req.body.username,
        password: req.body.password,
      });
      res.status(201).send();
    }
  });

  app.get("/api/home", async (req, res) => {
    res.send("home");
  });

  app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
  });
}

start();
