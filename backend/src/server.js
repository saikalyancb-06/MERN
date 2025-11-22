/* const express = require("express"); */
import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 6969 

//middleware
app.use(express.json()); //This middle Layer is used to parse JSON Bodies: req.body

app.use(rateLimiter);

// Our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`request method is ${req.method} and rrequest url is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);
app.listen(PORT, ()=>{
    console.log("Server started on Port :",{PORT}); 
});