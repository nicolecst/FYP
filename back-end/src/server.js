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
  const path = require("path");

  const MAX_SIZE = 100000000;
  const multer = require("multer");
  const nodeMailer = require("nodemailer");

  const html = `
    <h1>Hello World!!<h1/>
    <p>Have a nice day!<p/>
  `;

  const uploads = multer({
    dest: "src/uploads",
    limits: {
      fileSize: MAX_SIZE,
    },
  });

  await client.connect();
  const db = client.db("itineraryPlanner");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const staticPath = path.join(__dirname, "uploads"); // Replace 'uploads' with the actual relative path to your image directory
  app.use(express.static(staticPath));

  app.post("/api/upload", uploads.single("file"), (req, res) => {
    res.json({ file: req.file });
  });

  //send email
  app.get("/api/sendmail", async function (req, res, next) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodeMailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "etripofficialsite@gmail.com", // generated ethereal user
        pass: "eucm kjnz xnpu llos", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <etripofficialsite@gmail.com>', // sender address
      to: "nicolechan1217st@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: req.query.message, // html body
    });

    console.log(req.query.message);
    return res.json({
      message: "mail sent",
      info: info,
      previewUrl: nodeMailer.getTestMessageUrl(info),
    });
  });

  //home page listing all activities
  app.get("/api/", async (req, res) => {
    const activities = await db.collection("Activities").find({}).toArray();
    console.log("hello");
    res.send(activities);
  });

  //all activities with pagination
  app.get("/api/allAct", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Items per page

    const activities = await db.collection("Activities").find({}).toArray();

    // Calculate starting and ending indices for pagination
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const paginatedItems = activities.slice(startIndex, endIndex);

    console.log("hello");
    // res.send(activities);
    res.json({
      totalItems: activities.length,
      currentPage: page,
      totalPages: Math.ceil(activities.length / limit),
      activities: activities,
    });
  });

  //getting one activity
  app.get("/api/activities/:id", async (req, res) => {
    const activity = await db
      .collection("Activities")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.send(activity);
  });

  //Update activities
  app.put("/api/activities/:id", async (req, res) => {
    const activity = await db
      .collection("Activities")
      .findOneAndReplace({ _id: new ObjectId(req.params.id) }, req.body);
    res.json(activity);
  });

  //Add new activities
  app.post("/api/addAct", uploads.single("file"), async (req, res) => {
    try {
      console.log(req.body);

      const actdata = {
        Act_name: req.body.actName,
        Location: req.body.location,
        Area: req.body.area,
        District: req.body.district,
        Type: req.body.type,
        Category: req.body.category,
        Charge: req.body.charge,
        Info: req.body.info,
        Description: req.body.description,
        file: req.file, // Store the uploaded file in the actdata object
        Approved: false,
      };
      console.log(actdata.file);
      console.log("filename" + actdata.file.filename);

      const existAct = await db
        .collection("Activities")
        .findOne({ Act_name: req.body.actName });
      if (existAct) {
        res.send("Activity already exists, please use a different name");
      } else {
        const activity = await db.collection("Activities").insertOne(actdata);
        res.status(201).send("Thanks for your proposal!");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while processing the request");
    }
  });

  //Get all users
  app.get("/api/users", async (req, res) => {
    const users = await db.collection("Users").find({}).toArray();
    res.send(users);
  });

  //Get one user details
  app.get("/api/users/:id", async (req, res) => {
    // console.log(req.params.id)
    const user = await db
      .collection("Users")
      .findOne({ _id: new ObjectId(req.params.id) });
    console.log(user._id);
    res.json(user);
  });

  //Update user detail
  app.put("/api/users/:id", async (req, res) => {
    const user = await db
      .collection("Users")
      .findOneAndReplace({ _id: new ObjectId(req.params.id) }, req.body);
    res.json(user);
  });

  //Create Itinerary
  app.post("/api/create", async (req, res) => {
    console.log(req.body);

    const itinData = {
      author: new ObjectId(req.body.author),
      authorName: req.body.authorName,
      name: req.body.iname,
      type: req.body.itype,
      participants: req.body.participants,
      from: req.body.from,
      to: req.body.to,
      dailyItin: req.body.dailyItin,
      is_public: req.body.is_public,
    };

    const plan = await db.collection("Plans");
    plan.insertOne(itinData);
    res.status(201).send("Created!");
  });

  //View All Itineray History
  app.get("/api/itinHistory", async (req, res) => {
    const itin = await db.collection("Plans").find({}).toArray();
    res.send(itin);
  });

  //View All Itinerary
  app.get("/api/itinHistory", async (req, res) => {
    const itinHist = await db
      .collection("Plans")
      .find({ is_public: true })
      .toArray();
    res.send(itinHist);
  });

  //Send Itinerary Details to Email
  app.get("/api/sendItin", async function (req, res, next) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "etripofficialsite@gmail.com", // generated ethereal user
        pass: "eucm kjnz xnpu llos", // generated ethereal password
      },
    });

    const dataArray = JSON.parse(req.query.message);

    // Recursive function to process nested arrays and objects
    function processNested(data, d) {
      let result = "";

      data.forEach((item) => {
        if (Array.isArray(item)) {
          result += processNested(item, d); // Recursively process the nested array
        } else if (typeof item === "object" && item !== null) {
          // Process the object and extract the details
          const { itin } = item;
          const { act_name, location, day, startTime, endTime, memo } = itin;

          // Construct the desired output using the extracted details
          if(day==d){
          result += `
            <li>Activity: ${act_name}</li>
            <li>Location: ${location}</li>
            <li>Day: ${day}</li>
            <li>Start Time: ${startTime}</li>
            <li>End Time: ${endTime}</li>
            <li>Memo: ${memo}</li>
            <hr width="100%" size="2">
          `;
        }
      }
      });

      return result;
    }

    let messageHTML = `
    <html>
    <head>
      <style>
      table, th, td{
        border: 1px solid;
      }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Itinerary Plan</h1>
        <table>
          <tr>
            <th>Day 1</th>
          
    `;
    messageHTML += processNested(dataArray,1);

    messageHTML += `
        </tr>
        <tr>
            <th>Day 2</th>`;
            messageHTML += processNested(dataArray,2);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 3</th>`;
            messageHTML += processNested(dataArray,3);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 4</th>`;
            messageHTML += processNested(dataArray,4);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 5</th>`;
            messageHTML += processNested(dataArray,5);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 6</th>`;
            messageHTML += processNested(dataArray,6);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 7</th>`;
            messageHTML += processNested(dataArray,7);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 8</th>`;
            messageHTML += processNested(dataArray,8);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 9</th>`;
            messageHTML += processNested(dataArray,9);

            messageHTML += `
        </tr>
        <tr>
            <th>Day 10</th>`;
            messageHTML += processNested(dataArray,10);

            messageHTML += `
        </tr>
        </table>
      </div>
    </body>
  </html>
`;

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"E-Trip 🚨" <etripofficialsite@gmail.com>', // sender address
      to: req.query.email, // list of receivers
      subject: "Your Itinerary Plan", // Subject line
      text: "Hello world?", // plain text body
      html: messageHTML, // html body
    });

    console.log(req.query.message);
    return res.json({
      message: "mail sent",
      info: info,
      previewUrl: nodeMailer.getTestMessageUrl(info),
    });
  });

  //View Itineray History of an author
  app.get("/api/itinHistory/:id", async (req, res) => {
    const itinHist = await db
      .collection("Plans")
      .find({ author: new ObjectId(req.params.id) })
      .toArray();
    res.send(itinHist);
  });

  //View one Itinerary History
  app.get("/api/history/:id", async (req, res) => {
    const itinHist = await db
      .collection("Plans")
      .findOne({ _id: new ObjectId(req.params.id) });
    // console.log(itinHist);
    res.json(itinHist);
  });

  //Rate Itinerary
  app.put("/api/rate/:id", async (req, res) => {
    const rateUpdate = {
      author: new ObjectId(req.body.author),
      authorName: req.body.authorName,
      name: req.body.name,
      type: req.body.type,
      participants: req.body.participants,
      from: req.body.from,
      to: req.body.to,
      dailyItin: req.body.dailyItin,
      is_public: req.body.is_public,
      selectedRate: req.body.selectedRate,
      comment: req.body.comment,
    };

    const rate = await db
      .collection("Plans")
      .findOneAndReplace({ _id: new ObjectId(req.params.id) }, rateUpdate);
    res.json(rate);
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
          role: check.is_Admin,
          email: check.email,
        };

        const token = jwt.sign(user, "process.env.JWT_KEY", {
          expiresIn: "2h",
        });

        user.token = token;
        console.log(check._id);
        console.log(token);
        console.log(user.role);
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
      is_Admin: false,
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

      let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "etripofficialsite@gmail.com", // generated ethereal user
          pass: "eucm kjnz xnpu llos", // generated ethereal password
        },
      });
      await transporter.sendMail({
        from: '"E-Trip 🚨" <etripofficialsite@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome to E-trip", // Subject line
        text: "Hello world?", // plain text body
        html: "<h1>Welcome to E-trip! Start to plan your trip to HK with us!!!🪄</h1>", // html body
      });

      res.status(201).send("Account created");

      // send mail with defined transport object

      // console.log(req.query.message);
      // return res.json({
      //   message: "mail sent",
      //   info: info,
      //   previewUrl: nodeMailer.getTestMessageUrl(info),
      // });
    }
  });

  app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
  });
}

start();
