import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//common middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRoutes from "./routes/user.routes.js";
import scriptRoutes from "./routes/script.routes.js"

app.use("/api/v2/users", userRoutes);
app.use("/api/v2/scripts" ,  scriptRoutes)

app.use(errorHandler);

export { app };
