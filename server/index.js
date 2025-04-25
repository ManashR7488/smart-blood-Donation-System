import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// import {user} from "./src/constants/tempConst.js" 

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://smart-blood-donation-system.vercel.app" : "http://localhost:5173",
    credentials: true,
  }));
  
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world!");
})

app.post("/api/getuser",(req,res)=>{
    res.json(user);
})


app.listen(PORT, (req, res) =>{
    console.log(`app listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})