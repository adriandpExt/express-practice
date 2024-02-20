import express, { json } from "express";
import { config } from "dotenv";

import errorHandler from "./middleware/errorHandler.mjs";
import connectDb from "./config/dbConnection.mjs";

import todoRoutes from "./routes/todoRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

config();

const app = express();

const port = process.env.PORT || 5000;

connectDb();

app.use(json());
app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
