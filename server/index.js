import express from "express";
import cors from "cors";
import "dotenv/config";

//routers imports:
import authRoute from "./router/authRoute.js";
import productRoute from "./router/productRoute.js";
import esewaRoute from "./router/esewaRoute.js";
import orderRoute from "./router/orderRoute.js";
import salesRoute from "./router/salesRoute.js";
import transactionRoute from "./router/transactionRoute.js";
import userRoute from "./router/userRoute.js";

import { createServer } from "http";
import { Server } from "socket.io";
import {
  getAllNotifications,
  sendNotification,
} from "./controller/notification.js";
import { db } from "./db/db.js";

const port = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send previous notifications when a user connects
  db.query(
    "SELECT * FROM notification ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        return console.log(err);
      }

      socket.emit("previous-notifications", rows);
      // console.log(rows, ":Main file log");
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/notifications", getAllNotifications);
app.post("/send-notification", (req, res) => sendNotification(req, res, io));

//Routes:
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", esewaRoute);
app.use("/api", orderRoute);
app.use("/api", salesRoute);
app.use("/api", transactionRoute);
app.use("/api", userRoute);

app.use(express.static("public"));

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
