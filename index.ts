import express, { Router } from "express";
import main from "./main";
import cookieParser from "cookie-parser";

const app = express();
const router = Router()
const PORT = process.env.PORT || 8888;

app.use(cookieParser());
app.use(express.json());
app.use(main);
app.use("/axe", (req, res) => {
  res.json({ "test": "passed!" });
});
//app.get("/", main);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});