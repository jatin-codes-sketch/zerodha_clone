import express from "express"
import dotenv from "dotenv"
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()

console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

const allowedOrigin = "https://main.d1jo1vg9zdi7iy.amplifyapp.com";

console.log("CORS_ORIGIN:", allowedOrigin);

app.use(cors({
  origin: allowedOrigin,
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