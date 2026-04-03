import express from "express"
import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()

console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

const allowedOrigin = process.env.CORS_ORIGIN;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.options("*", cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import 
import userRouter from "./routes/user.route.js"
import holdingRoutes from "./routes/holding.route.js";
import orderRoutes from "./routes/order.route.js";
import summaryRoutes from "./routes/summary.route.js";


// // routes declaration 
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", holdingRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", summaryRoutes);


export default app