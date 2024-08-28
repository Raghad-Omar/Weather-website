const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('website'));

let projectData = {};

app.get('/all', (req, res) => {
  res.json(projectData);
});

app.post('/add', (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  };
  res.json(projectData);
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
