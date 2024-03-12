const express=require('express')
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
{/*mongoose.connect('mongodb://localhost:27017/Student',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})*/}//this is for insert data into database
app.post('/message',(req,res)=>{
    
    const receivedData=req.body;
   
    console.log('data received on Express',receivedData.password,receivedData.username);
    //res.json({message:'data send successfully!'})
    const UserSchema=new mongoose.Schema({
        username:String,
        password:String
    
    })
    const studetails=mongoose.model("studetails",UserSchema)
const stud=new studetails(receivedData);
stud.save().then(
    ()=>console.log("one entry added"),
    (err)=>console.log(err),
);//this for insert data into database


const UserModel=mongoose.model("studentdetails",UserSchema)
module.exports=UserModel,

mongoose.connect("mongodb://localhost:27017/Student")
        UserModel.find({},{_id:0,password:1})
        .where("username")
        .equals(receivedData.username)
        //.where("password")
        //.equals(receivedData.password)
        .then(users=>res.send(users))
        .catch(err=>res.json(err))
        //res.send({message:'success'})
});
app.listen(3300,()=>console.log("server is up"))