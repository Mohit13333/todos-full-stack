import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./Routers/auth.router.js";
import todoRouter from "./Routers/todo.router.js";
import connectDB from "./utils/connectDB.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://todo-typescript-web.netlify.app",
  methods: "GET,PUT,POST,DELETE",
}));
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at Port:-${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("database connection failed", error);
  });
