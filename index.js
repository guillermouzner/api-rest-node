import "dotenv/config";
import cookieParser from "cookie-parser";
import "./databases/connectdb.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import express from "express";

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(
    cors({
        origin: function (origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(`Error de CORS: ${origin} No autorizado`);
        },
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`estoy en http://localhost:${PORT}`);
});
