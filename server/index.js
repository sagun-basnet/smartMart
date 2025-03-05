import express from "express";
import cors from "cors";
import "dotenv/config";

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

app.listen(port, () => {
  console.log(`listening on ${port}`);
});



