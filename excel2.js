// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3001;

// Use the cors middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TeacherDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the timetable schema
const timetableSchema = new mongoose.Schema({
  // Your timetable schema fields
  Teacher: {
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
 



const Timetable = mongoose.model('timetables', timetableSchema);

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
// Assuming you have a Teacher model



app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { teacherid } = req.body;
    // Read the Excel file from buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    // Assuming the first sheet contains the timetable data
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(excelData);

    // Map Excel data to MongoDB schema
    const timetableData = {
      Teacher: {
        id:teacherid,
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
    const scheduleRow =[];
    for(let i=2;i<excelData.length;i++){
       scheduleRow.push(excelData[i]);
    }
    //console.log(scheduleRow);

    for (let i = 2; i < excelData.length; i++) {
      const day = excelData[i].__EMPTY;
      if (day) {
        currentDay = day;
        console.log(currentDay);
        let daySchedule = "{";

        for (let j = 1; j < scheduleRow.length; j++) {
          const key = headerRow[__EMPTY_${j}];
          //console.log(key);
          const value = excelData[i][__EMPTY_${j}];
         // console.log(value);
          daySchedule += `"${key}": "${value}", `;
          //console.log(daySchedule);
        }
        daySchedule+=};

        // Remove trailing comma and space
        //daySchedule = daySchedule.slice(0, -2);
        //console.log(daySchedule);
        // Assign the day's schedule to the correct day in timetableData
        timetableData.Teacher[currentDay] = daySchedule;
      }
    }

    // Insert timetableData into MongoDB
    const timetableEntry = new Timetable(timetableData);
    await timetableEntry.save();
    console.log("Timetable data inserted successfully! ");

    res.status(200).json({ message: 'Timetable data inserted successfully!' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file' });
  }
});


  
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
  });