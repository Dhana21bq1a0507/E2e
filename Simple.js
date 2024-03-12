const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Handle accept and reject actions
app.get('/handleAction', (req, res) => {
  const action = req.query.action;

  if (action === 'accept') {
    console.log('Accept button clicked');
    // Perform necessary actions on the server for accept
    res.send('Accept action handled successfully');
  } else if (action === 'reject') {
    console.log('Reject button clicked');
    // Perform necessary actions on the server for reject
    res.send('Reject action handled successfully');
  } else {
    res.status(400).send('Invalid action');
  }
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
