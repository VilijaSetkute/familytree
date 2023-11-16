const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoute = require("./Routes/AuthRoute");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { MONGO_URL, PORT, PUBLIC_CLIENT_URL, LOCAL_CLIENT_URL, PRODUCTION } =
  process.env;
const originUrl =
  String(PRODUCTION) === "true"
    ? String(PUBLIC_CLIENT_URL)
    : String(LOCAL_CLIENT_URL);

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: originUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", originUrl);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: originUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.use("/", authRoute);

io.on("connection", (socket) => {
  console.log("someone has connected to", socket.id);

  socket.on("user_activated", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
