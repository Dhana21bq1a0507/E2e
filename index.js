const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3300; 

// Define the Mongoose schema (replace this with your actual schema)
const timetableSchema = new mongoose.Schema({
        Teacher: {
          Year: {
            type: String,
            required: true,
          },
          Department: {
            type: String,
            required: true,
          },
          Classname: {
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
});

// Define the Mongoose model
const Timetable = mongoose.model('class', timetableSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Student', { useNewUrlParser: true, useUnifiedTopology: true });


// Define a route to fetch and print data from the database
app.get('/getTimetableData', async (req, res) => {
  try {
    // Fetch data from the "classtimetables" collection
    const timetableData = await Timetable.find();

    // Print the retrieved data in the console
    console.log('Timetable Data:', timetableData);

    // Send the data as a response (optional)
    res.json({ success: true, data: timetableData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});