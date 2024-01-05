const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/email', (req, res) => {
  const { buttonClicked } = req.body;
  // Process the buttonClicked value as needed
  console.log(`Button clicked: ${buttonClicked}`);
  res.json({ message: 'Button click processed successfully' });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
