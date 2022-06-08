import "dotenv/config";
import cookieParser from "cookie-parser";
import "./databases/connectdb.js";
import authRouter from "./routes/auth.route.js";
import express from "express";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`estoy en http://localhost:${PORT}`);
});
