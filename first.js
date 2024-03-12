
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/Student', { useNewUrlParser: true, useUnifiedTopology: true });

const timetableSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Timetable = mongoose.model('details', timetableSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('Excel Data:', excelData); // Log the Excel data for debugging

    const timetableData = [];

    for (const entry of excelData) {
      const username = entry['username'];
      const password = entry['password'];

      // Use findOne to check if the user already exists in the database
      const existingUser = await Timetable.findOne({ username: username });

      if (username && password && !existingUser) {
        console.log(`Condition is true for: ${username}, ${password}`);

        const timetableEntry = new Timetable({
          username: username,
          password: password,
        });

        timetableData.push(timetableEntry);
      } else {
        console.log(`User with username ${username} already exists or missing data.`);
      }
    }

    await Timetable.insertMany(timetableData);
    console.log("Data successfully inserted");
    res.status(200).json({ message: 'Timetable data inserted successfully!' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
