const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/save', (req, res) => {
  const { dataToSave } = req.body;

  fs.readFile(path.join(__dirname, '../src/assets/kuldesek.json'), 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      res.status(500).send('Error reading data');
      return;
    }

    let jsonData = [];

    if (data.trim()) {
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        console.error(e);
        res.status(500).send('Error parsing JSON data');
        return;
      }
    }

    jsonData.push(dataToSave);

    fs.writeFile(path.join(__dirname, '../src/assets/kuldesek.json'), JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving data');
        return;
      }

      res.send('Data saved');
    });
  });
});

app.post('/delete', (req, res) => {
  fs.readFile(path.join(__dirname, '../src/assets/kuldesek.json'), 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      res.status(500).send('Error reading data');
      return;
    }

    let jsonData = [];

    if (data.trim()) {
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        console.error(e);
        res.status(500).send('Error parsing JSON data');
        return;
      }
    }

    jsonData = jsonData.filter(entry => entry.time != req.body.id);

    fs.writeFile(path.join(__dirname, '../src/assets/kuldesek.json'), JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving data');
        return;
      }

      res.send('Data saved');
    });
  });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});