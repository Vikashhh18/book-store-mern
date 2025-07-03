import express from 'express';
import 'dotenv/config'
import router from './src/book/book.route.js';
import cors from 'cors';
import orderRouter from './src/orders/order.route.js';
import dbConnection from './utils/dbConnection.js';
import userRoute from './src/users/user.route.js';
import adminRoute from './src/stats/admin.stats.js';


const app=express()
const port=process.env.PORT||5001;

// // middleware
app.use(express.json());
const allowedOrigins = ['https://book-store-mern-mu.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);s
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// // routes
app.use("/api/books",router)
// routers for book order 
app.use("/api/book-orders",orderRouter)
//route for users /admin
app.use("/api/auth",userRoute);
// routes for admin 
app.use("/api/admin",adminRoute);


// //database connection
dbConnection();

app.get("/",(req,res)=>{
    return res.send("hello vicky");
})

app.listen(port,()=>{
    console.log(`server will start at port no ${port}`);
})