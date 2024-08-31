import express from "express";
const app = express();

import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;