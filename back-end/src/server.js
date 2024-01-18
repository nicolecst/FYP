import express from "express";
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { MongoClient } from "mongodb";
var ObjectId = require("mongodb").ObjectId;

async function start() {
  const app = express();
  const router = express.Router();
  const port = 3000;

  const url = "mongodb+srv://nicolecst:7fUWUtSb@cluster0.j43pz4m.mongodb.net/";
  const client = new MongoClient(url);
  const ObjectId = require("mongodb").ObjectId;

  await client.connect();
  const db = client.db("itineraryPlanner");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //home page listing all activities
  app.get("/api/", async (req, res) => {
    const activities = await db.collection("Activities").find({}).toArray();
    console.log("hello");
    res.send(activities);
  });

  //getting one activity
  app.get("/api/activities/:id", async (req, res) => {
    const activity = await db
      .collection("Activities")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.send(activity);
  });
//Get all users
  app.get("/api/users", async (req, res) => {
    const users = await db.collection("Users").find({}).toArray();
    res.send(users);
  });
//Get one user details
  app.get("/api/users/:id", async (req, res) => {
    // console.log(req.params.id)
    const user = await db.collection("Users").findOne({_id: new ObjectId(req.params.id)});
    console.log(user._id)
    res.json(user);
  });

  //Login Page
  app.post("/api/login", async (req, res) => {
    let user = req.body;
    console.log(user);

    try {
      const check = await db
        .collection("Users")
        .findOne({ username: req.body.username });
      if (!check) {
        res.status(201).send("User does not exists!");
        return;
      }
      console.log(req.body.password);
      console.log(check.password);
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (passwordMatch) {
        //user token
        const user = {
          id: check._id,
          username: check.username,
        };

        const token = jwt.sign(
          user,
          "process.env.JWT_KEY",
          {
            expiresIn: "2h",
          }
        );

        user.token = token;
        console.log(check._id)
        console.log(token)
        return res.status(200).json(user);
        // res.status(200).send("Successful Login", token);
      } else {
        res.status(201).send("Wrong password!");
      }
    } catch {
      res.status(201).send("Incorrect Information");
    }

  });

  //Register Page
  app.post("/api/register", async (req, res) => {
    console.log(req.body);

    const userdata = {
      username: req.body.username,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      email: req.body.email,
      createdAt: new Date().toLocaleString(),
    };

    const existUser = await db
      .collection("Users")
      .findOne({ username: req.body.username });
    if (existUser) {
      res.send("User already exists, please use a different name");
    } else {
      //hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userdata.password, saltRounds);
      userdata.password = hashedPassword;

      const users = await db.collection("Users");
      users.insertOne(userdata);
      res.status(201).send("Account created");
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
