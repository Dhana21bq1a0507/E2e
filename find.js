const express=require("express")
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/message",(req,res)=>{
    res.json([{
        "name":"bill",
        "age":66
    }])
})
app.listen(3300,()=>console.log("server is up"))