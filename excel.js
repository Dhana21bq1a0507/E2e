// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
const PORT = 3300;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Student', { useNewUrlParser: true, useUnifiedTopology: true });

const timetableSchema = new mongoose.Schema({
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

const Timetable = mongoose.model('teachertimetables', timetableSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});