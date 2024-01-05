const express=require('express')//display the data from database
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const UserSchema=new mongoose.Schema
({
    username:String,
    password:String,
    
})
const UserSchema1=new mongoose.Schema
({
    username: String,
  password: String,
  teacherid:String,
  teachermail:String,
  department:String,
  address:String,
  contact:String,
    
})
mongoose.connect("mongodb://localhost:27017/Student")
const UserModel=mongoose.model("Admindetails",UserSchema)



{/*app.get('/message',(req,res)=>{
    UserModel.find({},{_id:0,password:1})
    .where("username")
    .equals("dhana")
    .select("password")
    //.limit(2)
    //.sort({name:1})
    //.select("name")
    .then(users=>res.json(users))

    .catch(err=>res.json(err))
})*/}
app.get("/message",(req,res)=>{
    UserModel.find({teacherid:"21bq1a0507"}, { _id: 0})
    .then(users => res.send(users))
    .catch(err => res.json(err));
  
  })
{/*app.get("/mes",(req,res)=>{
    UserModel.find({teacherid:"21bq1a0507"}, { _id: 0})
    .then(users => res.send(users))
    .catch(err => res.json(err));
  
  })*/}
 
app.listen(3300,()=>{
    console.log("server is running")
})


//[{"name":"vasavi","id":"102","marks":"500"}]