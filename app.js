import express from "express";
const app = express();

// dot env
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.routes.js";

import connectDB from "./utils/db.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(bodyParser.json());

//api route
app.use("/api", routes);

// 404 error
app.use((req, res, next) => {
  res.status(404).json({
    result: null,
    msg: "resource not found",
    status: false,
  });
});

//global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log("error listening to the server", err);
    } else {
      console.log("Server is running at port: ", PORT);
    }
  });
});
