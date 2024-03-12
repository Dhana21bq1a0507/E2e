const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
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

const UserSchema4=new mongoose.Schema({
 
  toteachermali:String,
  date:String,
  class:String,
  time:String,
  fromteachermali:String,
  status:String,
})
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
const UserSchema3 = new mongoose.Schema({
  teachermail:String,
  date:String,
  teachername:String,
  leavetype:String,
  teacherid:String,
  Designature:String,
  status:String,
  Branch:String,
  LeaveAvailedTillDate:String,
  ReasonforLeave:String,
  date1:String,
  class1:String,time1:String,
  nameofalternative1:String,
  date2:String,
  class2:String,
  time2:String,
  nameofalternative2:String,
  date3:String,
  class3:String,
  time3:String,
  nameofalternative3:String,
  date4:String,
  class4:String,
  time4:String,
  nameofalternative4:String,
  date5:String,
  class5:String,
  time5:String,
  nameofalternative5:String
});

const timetableSchema = new mongoose.Schema({
 
  Teacher: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    Mon: {
      type: String,
      required: false,
    },
    Tue: {
      type: String,
      required: false,
    },
    Wed: {
      type: String,
      required: false,
    },
    Thu: {
      type: String,
      required: false,
    },
    Fri: {
      type: String,
      required: false,
    },
    Sat: {
      type: String,
      required: false,
    },
  },
});
const classtimetableSchema = new mongoose.Schema({
  Teacher: {
    Year: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Section: {
      type: String,
      required: true,
    },
    AcademicYear: {
      type: String,
      required: true,
    },
    Sem: {
      type: String,
      required: true,
    },
    WEF: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    RoomNo: {
      type: String,
      required: true,
    },
    ClassTeacher: {
      type: String,
      required: true,
    },
    Mon: {
      type: String,
      required: false,
    },
    Tue: {
      type: String,
      required: false,
    },
    Wed: {
      type: String,
      required: false,
    },
    Thu: {
      type: String,
      required: false,
    },
    Fri: {
      type: String,
      required: false,
    },
    Sat: {
      type: String,
      required: false,
    },
  },
}, { strict: false }); // Allow additional fields not defined in the schema

const grouptimetableSchema = new mongoose.Schema({
  Teacher: {
    AcademicYear: {
      type: String,
      required: true,
    },
    Sem: {
      type: String,
      required: true,
    },
    WEF: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    RoomNo: {
      type: String,
      required: true,
    },
    ClassTeacher: {
      type: String,
      required: true,
    },
    Mon: {
      type: String,
      required: false,
    },
    Tue: {
      type: String,
      required: false,
    },
    Wed: {
      type: String,
      required: false,
    },
    Thu: {
      type: String,
      required: false,
    },
    Fri: {
      type: String,
      required: false,
    },
    Sat: {
      type: String,
      required: false,
    },
  },
}, { strict: false }); // Allow additional fields not defined in the schema
const leavetypesschema=new mongoose.Schema({
  
    leavetype: { type: String, required: true },
    defaultallowance: { type: String, required: false }
  

})
const leaverefresh = new mongoose.Schema({
  username:String,
  teachermail:String,
  leave:String,

 });

const Timetable = mongoose.model('teachertimetables', timetableSchema);

const UserModel = mongoose.model('teacherdetails', UserSchema);
const UserModel2= mongoose.model('admindetails', UserSchema);
const UserModel1 = mongoose.model('teachertimetables', timetableSchema);
const UserModel3= mongoose.model('leaveform', UserSchema3);
const UserModel4 = mongoose.model('admindetails', UserSchema);
const UserModel5 = mongoose.model('classadjust', UserSchema4);
const hoddetails= mongoose.model('hoddetails', UserSchema);
const leavetype= mongoose.model('leavetype', leavetypesschema);
const leavebalance= mongoose.model('leavebalance', leaverefresh);
const classtimetablemodel= mongoose.model('classtimetables', classtimetableSchema);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



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
  UserModel.find({ teachermail: receivedData.Usermail }, { _id: 0, password:1})
    .then(users =>res.send(users))
    .catch(err => res.json(err));
});
app.post('/Username', (req, res) => {
  const receivedData = req.body;
 
  user=receivedData.Usermail;
  
  UserModel.find({ teachermail: receivedData.Usermail }, { _id: 0, username:1})
    .then(users =>{res.send(users);console.log(users)})
    .catch(err => res.json(err));
});
app.post('/HeadOfDepartment', (req, res) => {
  const receivedData = req.body;
  user=receivedData.Usermail;
  hoddetails.find({ teachermail: receivedData.Usermail }, { _id: 0, password: 1 })
    .then(users => res.send(users))
    .catch(err => res.json(err));
});
app.get("/userdetails",(req,res)=>{
  UserModel.find({ teachermail: user}, { _id: 0})
  .then(users => res.send(users))
  .catch(err => res.json(err));

})
app.get("/teacherdetails",(req,res)=>{
  UserModel.find({}, { _id: 0})
  .then(users => res.send(users))
  .catch(err => res.json(err));

})
app.get("/admindetails",(req,res)=>{
  UserModel.find({ teachermail: user}, { _id: 0})
  .then(users => res.send(users))
  .catch(err => res.json(err));

})
app.get("/oritable",(req,res)=>{
  UserModel1.find({ "Teacher.id": user}, { _id: 0})
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
      
        UserModel1.find({ "Teacher.id": receivedData.teacherid }, { _id: 0})
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
        app.post('/leaveform', (req, res) => {
          const receivedData = req.body;
          const leave = new UserModel3(receivedData);
          console.log("data same",receivedData);
           leave.save()
    .then(() =>res.send({message:"Data added successfully"}) )
.catch(err => console.log(err));
         
        });
        app.get("/leavedetails",(req,res)=>{
          UserModel3.find({}, { _id: 0})
          .then(users => res.send(users))
          .catch(err => res.json(err));
        
        })
        app.get("/hoddetailsprofile",(req,res)=>{
          hoddetails.find({ teachermail:user }, { _id: 0})
          .then(users => res.send(users))
          .catch(err => res.json(err));
        
        })
        app.get("/hodalldetails",(req,res)=>{
          hoddetails.find({}, { _id: 0,department:1})
          .then(users => res.send(users))
          .catch(err => res.json(err));
        
        })
         app.get("/allhoddetails",(req,res)=>{
          hoddetails.find({}, { _id: 0})
          .then(users => res.send(users))
          .catch(err => res.json(err));
        
        })
        app.post('/hodchangepassword',(req,res)=>{
          const receivedData1 = req.body;
          //console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
          var myquery={teachermail:user};
          var newvalues={ $set:{password:receivedData1.Newpassword}}
          hoddetails.updateOne(myquery,newvalues)
            .then(users=>res.send({message:'successfully updated'}))
            .catch(err=>res.json(err))
          })
          app.post('/leaveaccept',async(req,res)=>{
            const receivedData1 = req.body;
           // console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
            var myquery={teachermail:receivedData1.teachermail,date:receivedData1.date};
            var newvalues={ $set:{status:receivedData1.status}}
            var myquery1={teachermail:receivedData1.teachermail};
           
              const existingUsers = await leavebalance.find({teachermail:receivedData1.teachermail},{_id:0});
          
              
                var str='';
                const resu= existingUsers[0].leave.split(',');
                console.log(resu)
                resu.map((leaveItem, leaveIndex) => {
                  const a = leaveItem.split(':');
                  if(a[0].replace('{', '')===receivedData1.leavetype){
                    console.log(a[0].replace('{', '')+"  "+receivedData1.leavetype)
                    str+=a[0]+":"+String( parseInt(a[1]-1))+","
                     
                  }else{
                    if(leaveItem=='}')
                    str+=leaveItem;
                    else
                    str+=leaveItem+",";
                  }
                }
             
                )
               
                var newvalues1={ $set:{leave:str}}
                leavebalance.updateOne(myquery1,newvalues1)

              .catch(err=>res.json(err))
              UserModel3.updateOne(myquery,newvalues)
              .then(users=>res.send({message:'successfully updated'}))
              .catch(err=>res.json(err))
            })
            app.post('/hodeditdetails',(req,res)=>{
              const receivedData1 = req.body;
             // console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
              var myquery={teachermail:user};
              var newvalues={ $set:{username:receivedData1.Username,department:receivedData1.Department,address:receivedData1.Address,contact:receivedData1.Contact}}
              hoddetails.updateOne(myquery,newvalues)
                .then(users=>res.send({message:'successfully updated'}))
                .catch(err=>res.json(err))
              })
              app.post('/requestadjust', (req, res) => {
                const receivedData = req.body;
                receivedData.fromteachermali=user;
                const leave = new UserModel5(receivedData);
              //  console.log("data same",receivedData);
                 leave.save()
          .then(() =>res.send({message:"Data added successfully"}) )
      .catch(err => console.log(err));
               
              });
              app.get("/requestapproal",(req,res)=>{
                UserModel5.find({ toteachermali:user}, { _id: 0})
                .then(users => res.send(users))
                .catch(err => res.json(err));
              
              })
              app.post('/requestaccept',(req,res)=>{
                const receivedData1 = req.body;
               // console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
                var myquery={fromteachermali:receivedData1.teachermail,date:receivedData1.date};
                var newvalues={ $set:{status:receivedData1.status}}
                UserModel5.updateOne(myquery,newvalues)
                  .then(users=>res.send({message:'successfully updated'}))
                  .catch(err=>res.json(err))
                })
                app.post('/Admin', (req, res) => {
                  const receivedData = req.body;
                  user=receivedData.Usermail;
                  UserModel2.find({ teachermail: receivedData.Usermail }, { _id: 0, password: 1 })
                    .then(users => res.send(users))
                    .catch(err => res.json(err));
                });
                app.get("/requestresponse",(req,res)=>{
                  UserModel5.find({ fromteachermali:user}, { _id: 0})
                  .then(users => res.send(users))
                  .catch(err => res.json(err));
                
                })
                app.get("/admindetailsprofile",(req,res)=>{
                  UserModel2.find({ teachermail:user }, { _id: 0})
                  .then(users => res.send(users))
                  .catch(err => res.json(err));
                
                })
                app.post('/admineditdetails',(req,res)=>{
                  const receivedData1 = req.body;
                 // console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
                  var myquery={teachermail:user};
                  var newvalues={ $set:{username:receivedData1.Username,department:receivedData1.Department,address:receivedData1.Address,contact:receivedData1.Contact}}
                  UserModel2.updateOne(myquery,newvalues)
                    .then(users=>res.send({message:'successfully updated'}))
                    .catch(err=>res.json(err))
                  })
                  app.post('/adminchangepassword',async(req,res)=>{
                    const receivedData1 = req.body;
                    //console.log('data received on Express',receivedData1.Username,receivedData1.Department, receivedData1.Address);
                    var myquery={teachermail:user};
                    var newvalues={ $set:{password:receivedData1.Newpassword}}
                   UserModel2.updateOne(myquery,newvalues)
                      .then(users=>res.send({message:'successfully updated'}))
                      .catch(err=>res.json(err))
                    })
                    app.post('/addteacher', async(req, res) => {
                      const receivedData = req.body;
                      receivedData.password="vvit@123";
                      const leave = new UserModel(receivedData);
                     // console.log("data same",receivedData);
                       leave.save()
                .then()
                 .catch(err => console.log(err));
                  const existingUsers = await leavetype.find({},{_id:0});
                  const leaveTypeDictionary = {
                    username: receivedData.username,
                    teachermail: receivedData.teachermail,
                 };
                     data="{"
                  for (const existingUser of existingUsers) {
                     data =data+existingUser.leavetype.toString()+":"+existingUser.defaultallowance.toString()+",";  
                  }
                  data+="}";
                  leaveTypeDictionary['leave']=data;
                    const details = new leavebalance(leaveTypeDictionary);
                      await details.save();
                      res.json({message:"successfully inserted"})
                      });


                    app.post('/upload', upload.single('file'), async (req, res) => {
                      try {
                        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
                        const sheetName = workbook.SheetNames[0];
                        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    
                        //console.log('Excel Data:', excelData); // Log the Excel data for debugging
                    
                        const timetableData = [];
                    
                        for (const entry of excelData) {
                          const username = entry['username'];
                          const password = entry['password'];
                          const teacherid = entry['teacherid'];
                          const teachermail = entry['teachermail'];
                          const department = entry['department'];
                          const address = entry['address'];
                          const contact = entry['contact'];
                          // Use findOne to check if the user already exists in the database
                          const existingUser = await UserModel.findOne({ username: username });
                    
                          if (username && password && !existingUser) {
                            console.log(`Condition is true for: ${username}, ${password}`);
                    
                            const timetableEntry = new UserModel({
                              username: username,
                              password: password,
                              teacherid:teacherid,
                              teachermail:teachermail,
                              department:department,
                              address:address,
                              contact:contact,        

                            });
                    
                            timetableData.push(timetableEntry);
                          } else {
                            //console.log(`User with username ${username} already exists or missing data.`);
                          }
                        }
                    
                        await UserModel.insertMany(timetableData);
                        //console.log("Data successfully inserted");
                        res.status(200).json({ message: 'File Uploaded Successfully!' });
                      } catch (error) {
                        console.error('Error processing file:', error);
                        res.status(500).json({ message: 'Error processing file', error: error.message });
                      }
                    });


                    app.delete('/delete', (req, res) => {
                      const receivedData1 = req.body;
                      UserModel.deleteOne({ teacherid:receivedData1.teacherid })
                        .then(result => {
                          if (result.deletedCount === 1) {
                            res.json({ message: `User with username '${receivedData1.teacherid}' deleted successfully` });
                          } else {
                            res.json({ message: `User with username '${receivedData1.teacherid}' not found` });
                          }
                        })
                        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
                    });

                 
                    app.post('/onetimetableupload', upload.single('file'), async (req, res) => {
                      try {
                        const { teacherid } = req.body;
                        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
                      const sheetName = workbook.SheetNames[0];
                        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                      // console.log(excelData);
                        const timetableData = {
                          Teacher: {
                            name:excelData[0].__EMPTY,
                            id:excelData[0].__EMPTY_1,
                            Mon: "",
                            Tue: "",
                            Wed: "",
                            Thu: "",
                            Fri: "",
                            Sat: "",
                          },
                        };
                    
                        let currentDay = "";
                        const headerRow = excelData[1];
                        //console.log(headerRow);
                        const headerRowobj = Object.keys(headerRow).map(key => ({
                          [key]: headerRow[key]
                        }));
                        const scheduleRow =[];
                        for(let i=2;i<excelData.length;i++){
                           scheduleRow.push(excelData[i]);
                        }
                        //console.log(scheduleRow);
                    
                        for (let i = 2; i < excelData.length; i++) {
                          const day = excelData[i].__EMPTY;
                          if (day) {
                            currentDay = day;
                            //console.log(currentDay);
                            let daySchedule = "{";
                    
                            for (let j = 1; j <=headerRowobj.length; j++) {
                              const key = headerRow['__EMPTY_'+j];
                              //console.log(key);
                              const value = excelData[i][`__EMPTY_${j}`];
                             // console.log(value);
                              daySchedule += `"${key}": "${value}", `;
                              //console.log(daySchedule);
                            }
                            daySchedule+=`}`;
                    
                            // Remove trailing comma and space
                            //daySchedule = daySchedule.slice(0, -2);
                            //console.log(daySchedule);
                            // Assign the day's schedule to the correct day in timetableData
                            timetableData.Teacher[currentDay] = daySchedule;
                          }
                        }
                    
                        // Insert timetableData into MongoDB
                        const timetableEntry = new UserModel1(timetableData);
                        await timetableEntry.save();
                        console.log("Timetable data inserted successfully! ");
                    
                        res.status(200).json({ message: 'Timetable data inserted successfully!' });
                      } catch (error) {
                        console.error('Error processing file:', error);
                        res.status(500).json({ message: 'Error processing file' });
                      }
                    });
                    app.post('/grouptimetableupload', upload.single('file'), async (req, res) => {
                      try {
                        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
                        const sheetName = workbook.SheetNames[0];
                        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                        //console.log(excelData);
                        const result = [];
                        let currentPerson = [];
                    
                        for (const item of excelData) {
                          if (item.__EMPTY && item.__EMPTY_1 && item.__EMPTY_3 && item.__EMPTY_3.includes('SEM')) {
                            if (currentPerson.length > 0) {
                              result.push([...currentPerson]);
                              currentPerson = [];
                            }
                          }
                          currentPerson.push(item);
                        }
                    
                        if (currentPerson.length > 0) {
                          result.push([...currentPerson]);
                        }
                    
                        //console.log(result);
                    
                        for (let i = 0; i < result.length; i++) {
                          const entry = result[i];
                          const timetableData = {
                            Teacher: {
                              name:entry[0].__EMPTY,
                              id: entry[0].__EMPTY_1,
                              Mon: "",
                              Tue: "",
                              Wed: "",
                              Thu: "",
                              Fri: "",
                              Sat: "",
                            },
                          };
                    
                          let currentDay = "";
                          const headerRow = entry[1];
                          //console.log(headerRow);
                          const headerRowobj = Object.keys(headerRow).map(key => ({
                            [key]: headerRow[key]
                          }));
                          const scheduleRow = [];
                          for (let i = 2; i < entry.length; i++) {
                            scheduleRow.push(entry[i]);
                          }
                          //console.log(scheduleRow);
                          for (let i = 2; i< entry.length; i++) {
                            const day = entry[i].__EMPTY;
                            if (day) {
                              currentDay = day;
                              let daySchedule = "{";
                    
                              for (let j = 1; j <= headerRowobj.length; j++) {
                                const key = headerRow['__EMPTY_' + j];
                                //console.log(key);
                                const value = entry[i][`__EMPTY_${j}`];
                                //console.log(value);
                                daySchedule += `"${key}": "${value}", `;
                                //console.log(daySchedule);
                              }
                              daySchedule+=`}`;
                    
                              timetableData.Teacher[currentDay] = daySchedule;
                            }
                          }
                    
                          const timetableEntry = new Timetable(timetableData);
                          await timetableEntry.save();
                        }
                    
                        console.log("Timetable data inserted successfully!");
                        res.status(200).json({ message: 'Timetable data inserted successfully!' });
                      } catch (error) {
                        console.error('Error processing file:', error);
                        res.status(500).json({ message: 'Error processing file' });
                      }
                    });
                 
                  app.post('/leaverefresh', async(req, res) => {
                    
                    const existingUsers = await leavetype.find({},{_id:0});
                    data="{"
                    for (const existingUser of existingUsers) {
                       data =data+existingUser.leavetype.toString()+":"+existingUser.defaultallowance.toString()+",";  
                    }
                    data+="}";
                   // console.log(existingUsers)
                    const userdetails = await UserModel.find({},{_id:0});
            for(const user1 of userdetails){
              const duplicate = await leavebalance.findOne({ username: user1.username,teachermail:user1.teachermail });
                  if(duplicate){
                    //console.log(`Condition is true for ${user1.username}`);
                    var myquery={teachermail:user1.teachermail};
                    var newvalues={ $set:{leave:data}}
                   leavebalance.updateOne(myquery,newvalues)
                     
                      .catch(err=>res.json(err))
                  
                  }else{
                  //  console.log("condition is false for"+user1.username)
                    const leaveTypeDictionary = {
                      username: user1.username,
                      teachermail: user1.teachermail,
                   };
                   //console.log(leaveTypeDictionary)
                    leaveTypeDictionary['leave']=data;
                   // console.log("hello 1"+leaveTypeDictionary)
                      const details = new leavebalance(leaveTypeDictionary);
                        await details.save();
                        res.json({message:"successfully inserted"})
                  }
            }
                    
                
                    });
                    app.get("/teacherclassadjust",(req,res)=>{
                      UserModel1.find({}, { _id: 0})
                      .then(users => res.send(users))
                      .catch(err => res.json(err));
                    
                    })
                    app.get("/actionbutton",(req,res)=>{
                      UserModel5.find({}, { _id: 0})
                      .then(users => res.send(users))
                      .catch(err => res.json(err));
                    
                    })
                    app.get("/newleavedetails",(req,res)=>{
                      leavetype.find({}, { _id: 0})
                      .then(users => res.send(users))
                      .catch(err => res.json(err));
                    
                    })
                    app.post('/addnewleave', (req, res) => {
                      const receivedData = req.body;
                      const leaveData = {
                       
                            leavetype: receivedData.leavetype,
                            defaultallowance: receivedData.defaultallowance
                        
                    };
                      const leave = new leavetype(leaveData);
                     // console.log("data same",receivedData);
                       leave.save()
                .then(() =>res.send({message:"Data added successfully"}) )
            .catch(err => console.log(err));
                     
                    });
                    app.delete('/leavetypedelete', (req, res) => {
                      const receivedData1 = req.body;
                      leavetype.deleteOne({ leavetype:receivedData1.leavetype })
                        .then(result => {
                          if (result.deletedCount === 1) {
                            res.json({ message: `User with username '${receivedData1.teacherid}' deleted successfully` });
                          } else {
                            res.json({ message: `User with username '${receivedData1.teacherid}' not found` });
                          }
                        })
                        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
                    });
                    app.get("/teacherleavehistory",(req,res)=>{
                      leavebalance.find({ teachermail: user}, { _id: 0})
                      .then(users => res.send(users))
                      .catch(err => res.json(err));
                    
                    })
                    app.post('/particularleavehistory', (req, res) => {
                      const receivedData = req.body;
                
                      leavebalance.find({ teachermail: receivedData.teachermail }, { _id: 0})
                        .then(users =>{console.log(users); res.send(users)})
                        .catch(err => res.json(err));
                    });
                    app.get("/allleavetypes",(req,res)=>{
                      leavetype.find({}, { _id: 0})
                      .then(users => res.send(users))
                      .catch(err => res.json(err));
                    
                    })
                   /* app.post('/classtimetable', (req, res) => {
                      const receivedData = req.body;
                      console.log(receivedData)
                      classtimetablemodel.find({"Teacher.Year":receivedData.year,"Teacher.Department":receivedData.department,"Teacher.Section":receivedData.section})
                        .then(users =>{console.log(users[0].Teacher.Year);res.send(users)})
                        .catch(err => res.json(err))
                    });*/
                    app.post('/classtimetable', (req, res) => {
                      const receivedData = req.body;
                     // console.log(receivedData);
                    
                      classtimetablemodel.find({
                        "Teacher.Year": receivedData.year,
                        "Teacher.Department": receivedData.department,
                        "Teacher.Section": receivedData.section
                      })
                      .then(users =>  res.send(users))
                      .catch(err => res.json(err));
                    });
                     app.post('/addhoddetails', async(req, res) => {
                      const receivedData = req.body;
                      receivedData.password="vvit@123";
                      receivedData.teachermail=receivedData.teacherid+"@vvit.net"
                      const leave = new hoddetails(receivedData);
                     // console.log("data same",receivedData);
                       leave.save()
                .then()
                 .catch(err => console.log(err));
                
                      });
          app.post('/finddepartment', (req, res) => {
        const receivedData = req.body;
    //  console.log(receivedData.department)
      UserModel.find({ department: receivedData.department}, { _id: 0})
          .then(users =>res.send(users) )
          .catch(err => res.json(err));
         
      });
      app.delete('/hoddelete', (req, res) => {
        const receivedData1 = req.body;
        hoddetails.deleteOne({ teacherid:receivedData1.teacherid,department:receivedData1.department })
          .then(result => {
            if (result.deletedCount === 1) {
              res.json({ message: `User with username '${receivedData1.teacherid}' deleted successfully` });
            } else {
              res.json({ message: `User with username '${receivedData1.teacherid}' not found` });
            }
          })
          .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
      });
      app.post('/uploadSingleClass', upload.single('file'), async (req, res) => {
        try {
          const { year, department, classname } = req.body;
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
         const sheetName = workbook.SheetNames[0];
          const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        //  console.log(excelData);

            const academicYear = excelData[0].__EMPTY.split(':')[1].trim();
          const sem = excelData[0].__EMPTY_3;
          const wef = excelData[0].__EMPTY_8.split(':')[1].trim();
          const classInfo = excelData[1].__EMPTY.split(' ');
          const className = classInfo.slice(0, classInfo.length).join(' ');
          const roomNo = excelData[1].__EMPTY_3.split(':')[1].trim();
          const classTeacher = excelData[1].__EMPTY_8.split(':')[1].trim();
          // Map Excel data to MongoDB schema
          const timetableData = {
            Teacher: {
              Year:year,
              Department:department,
              Section:classname,
              AcademicYear:academicYear,
              Sem:sem,
              WEF:wef,
              Class:className,
              RoomNo:roomNo,
              ClassTeacher:classTeacher,
              Mon: "",
              Tue: "",
              Wed: "",
              Thu: "",
              Fri: "",
              Sat: "",
            },
          };
       
          let currentDay = "";
          const headerRow = excelData[2];
        
          const headerRowobj = Object.keys(headerRow).map(key => ({
            [key]: headerRow[key]
          }));
       
          const scheduleRow =[];
          for(let i=4;i<excelData.length;i++){
             scheduleRow.push(excelData[i]);
          }
        
          const times={};
          const day = excelData[4].__EMPTY;
            if (day) {
              currentDay = day;
              //console.log(currentDay);
              let daySchedule = "{";
      
              for (let j = 1; j < headerRowobj.length; j++) {
                //console.log(j);
                const key = headerRow[`__EMPTY_${j}`];
                //console.log(key);
                const value = excelData[4][`__EMPTY_${j}`] ? excelData[4][`__EMPTY_${j}`] : excelData[4][`__EMPTY_${j-1}`];
                //console.log(value);
                const trimmedKey = key.trim();
                const trimmedValue = (typeof value === 'string') ? value.trim() : value;
                daySchedule += `"${trimmedKey}": "${trimmedValue}", `;
                //console.log(daySchedule);
                if (trimmedValue === "BREAK" || trimmedValue === "LUNCH") {
                  times[trimmedKey]=trimmedValue;
                }
                //console.log(times);
              }
              daySchedule+=`}`;
            
               timetableData.Teacher[currentDay] = daySchedule;
            }
            for (let i = 5; i < excelData.length; i++) {
              //console.log(excelData.length);
              const day = excelData[i].__EMPTY;
              //console.log(day);
              if (day) {
                  currentDay = day;
                  //console.log(currentDay);
                  let daySchedule = "{";
          
                  for (let j = 1; j < headerRowobj.length; j++) {
                      const key = headerRow[`__EMPTY_${j}`];
                      const trimmedKey = key.trim();
                      //console.log(trimmedKey);
                      //console.log(times);
                      let value;
                      if (trimmedKey in times) {
                          value = times[trimmedKey];
                      } else {
                          value = excelData[i][`__EMPTY_${j}`] || excelData[i][`__EMPTY_${j - 1}`];
                      }
          
                      //const trimmedKey = key.trim();
                      const trimmedValue = (typeof value === 'string') ? value.trim() : value;
          
                      daySchedule += `"${trimmedKey}": "${trimmedValue}", `;
                  }
          
                  daySchedule += `}`;
              timetableData.Teacher[currentDay] = daySchedule;
              }
          }
        const timetableEntry = new classtimetablemodel(timetableData);
          await timetableEntry.save();
          console.log("Timetable data inserted successfully! ");
      
      res.status(200).json({ message: 'Timetable data inserted successfully!' });
        } catch (error) {
          console.error('Error processing file:', error);
          res.status(500).json({ message: 'Error processing file' });
        }
      });

app.listen(3300, () => console.log('server is up'));
