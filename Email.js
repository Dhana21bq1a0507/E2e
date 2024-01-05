const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Handle accept action
app.post('/accept', (req, res) => {
  console.log('Accept button clicked');
  // Perform necessary actions on the server
  res.send('Action handled successfully');
});

// Handle reject action
app.post('/reject', (req, res) => {
  console.log('Reject button clicked');
  // Perform necessary actions on the server
  res.send('Action handled successfully');
});

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
