import express from "express";
import cors from "cors";
import "dotenv/config";

//routers imports:
import authRoute from "./router/authRoute.js";
import productRoute from "./router/productRoute.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Routes:
app.use("/api", authRoute);
app.use("/api", productRoute);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
