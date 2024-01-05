const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/Student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var user;
var forgetmail;
// Define the schema outside the route handler
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  teacherid:String,
  teachermail:String,
  department:String,
  address:String,
  contact:String,
});
const UserSchema1 = new mongoose.Schema({
  teacherid:String,
  teachermail:String,
  mon:Object,
  tue:Object,
  wed:Object,
  thu:Object,
  fri:Object,
  sat:Object,
});
const UserModel = mongoose.model('teacherdetails', UserSchema);
const UserModel2= mongoose.model('admindetails', UserSchema);
const UserModel1 = mongoose.model('teachertimetables', UserSchema1);
module.exports=UserModel,

app.post('/Teacher', (req, res) => {
  const receivedData = req.body;
  //console.log('data received on Express', receivedData.Password, receivedData.Usermail);
  user=receivedData.Usermail;
  //console.log('within post method',user)
  // Use the existing UserModel for saving data
 {/*} const stud = new UserModel(receivedData);
  stud.save()
    .then(() => console.log('one entry added'))
.catch(err => console.log(err));*/}

  // Query the database using UserModel
  UserModel.find({ teachermail: receivedData.Usermail }, { _id: 0, password: 1 })
    .then(users => res.send(users))
    .catch(err => res.json(err));
});
app.post('/Admin', (req, res) => {
  const receivedData = req.body;
  user=receivedData.Usermail;
  UserModel2.find({ teachermail: receivedData.Usermail }, { _id: 0, password: 1 })
    .then(users => res.send(users))
    .catch(err => res.json(err));
});
app.get("/userdetails",(req,res)=>{
  UserModel.find({ teachermail: user}, { _id: 0})
  .then(users => res.send(users))
  .catch(err => res.json(err));

})
app.get("/oritable",(req,res)=>{
  UserModel1.find({ teachermail: user}, { _id: 0})
  .then(users => res.send(users))
  .catch(err => res.json(err));

})
app.post('/mes',(req,res)=>{
  const receivedData1 = req.body;
 // console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
  var myquery={teachermail:user};
  var newvalues={ $set:{username:receivedData1.Username,department:receivedData1.Department,address:receivedData1.Address,contact:receivedData1.Contact}}
  UserModel.updateOne(myquery,newvalues)
    .then(users=>res.send({message:'successfully updated'}))
    .catch(err=>res.json(err))
  })
  
  app.post('/change',(req,res)=>{
    const receivedData1 = req.body;
    //console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
    var myquery={teachermail:user};
    var newvalues={ $set:{password:receivedData1.Newpassword}}
    UserModel.updateOne(myquery,newvalues)
      .then(users=>res.send({message:'successfully updated'}))
      .catch(err=>res.json(err))
    })

   app.post('/timetable', (req, res) => {
        const receivedData = req.body;
      
        UserModel1.find({ teacherid: receivedData.teacherid }, { _id: 0})
          .then(users =>res.send(users) )
          .catch(err => res.json(err));
         
      });
    /*  app.post('/forget', (req, res) => {
        const receivedData = req.body;
        var forgetmail=receivedData.teachermail;
        console.log(forgetmail)
        
      });*/
      app.post('/forget', (req, res) => {
        forgetmail=req.body.teachermail;
        // rest of your code...
      });
      app.post('/resetpassword',(req,res)=>{
        const receivedData3 = req.body;
      
        //console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
        var myquery={teachermail:forgetmail};
        var newvalues={ $set:{password:receivedData3.password}}
        UserModel.updateOne(myquery,newvalues)
          .then(users=>res.send({message:'successfully update'}))
          .catch(err=>res.json(err))
        })
app.listen(3300, () => console.log('server is up'));
