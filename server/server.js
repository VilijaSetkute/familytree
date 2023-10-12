const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;
const bodyParser = require("body-parser");

console.log(MONGO_URL, PORT);

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

const publicOrigin = "http://104.248.192.185:4000";
const localOrigin = "http://localhost:4000";
const production = false;
const origin = production ? publicOrigin : localOrigin;

app.use((req, res, next) => {
  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", origin);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use(
  cors({
    // origin: ["http://localhost:7000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    origin: origin,
  })
);

app.use(cookieParser());

app.use(bodyParser.json());

app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
