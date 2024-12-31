const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
require("dotenv").config();
const connectDatabase = require("./src/connection/db");

const app = express();
const productRouter = require("./src/routes/product");
const categoryRouter = require("./src/routes/category");
const userRouter = require("./src/routes/user");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);

connectDatabase(process.env.DB_URL);
app.listen(3000, () => {
  console.log("listenning on 3000");
});
