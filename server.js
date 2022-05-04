const express = require("express");
const mongoose = require("mongoose");

const UserModel = mongoose.model(
  "ableUser",
  new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    opening: [
      {
        role: String,
        desc: String,
        place: String,
        phone: Number,
      },
    ],
  })
);
const app = express();

mongoose.connect(
  process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/myDB"
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  let data = req.body;
  UserModel.findOne({ email: data.email, password: data.password })
    .then((result) => {
      return res.status(200).json({
        _id: result._id,
        email: result.email,
        name: result.name,
      });
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
});
app.post("/signup", (req, res) => {
  let user = new UserModel({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  user
    .save()
    .then((data) => {
      return res.status(200).json({
        _id: data._id,
        email: data.email,
        name: data.name,
      });
    })
    .catch((err) => {
      return {
        error: err,
      };
    });
});
app.post("/add", async (req, res) => {
  await UserModel.findOne({ _id: req.headers.id }).then((data) => {
    if (data.opening) {
      data.opening.push(req.body);
    } else {
      data.opening = [req.body];
    }
    data
      .save()
      .then(() => {
        return res.status(200).json({
          message: "done",
        });
      })
      .catch(() => {
        return res.status(400).json({
          error: "an error occured",
        });
      });
  });
});
app.get("/getJobs", async (req, res) => {
  await UserModel.findOne({ _id: req.headers.id })
    .then((data) => {
      return res.status(200).json({
        openings: data.opening,
      });
    })
    .catch(() => {
      return res.status(400).json({
        error: "an error occured",
      });
    });
});

app.listen(2000, () => {
  console.log("server started");
});
