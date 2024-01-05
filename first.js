const express =require("express");//insert the data into database
const mongoose=require("mongoose");
const app=express();
mongoose.connect('mongodb://localhost:27017/Student',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const UserSchema=new mongoose.Schema({
    name:String,
    id:Number,
    marks:Number,

})
const studetails=mongoose.model("studetails",UserSchema)
const stud=new studetails({
    name:"syamala",
    id:540,
    marks:1000,
});
stud.save().then(
    ()=>console.log("one entry added"),
    (err)=>console.log(err),
);
app.get('/getUsers',(req,res)=>{
    studetails.find({},(err,found)=>{
        if(!err){
            res.send(found)
        }
        console.log(err);
        res.send("some error occurred!")
    }).catch(err=>console.log("Error ocuured,"+err));
});
app.listen(3001,()=>{
    console.log("server is Running")
})