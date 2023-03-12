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

  // Read the existing data from the file
  fs.readFile(path.join(__dirname, '../src/assets/kuldesek.json'), 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') { // Ignore "file not found" error
      console.error(err);
      res.status(500).send('Error reading data');
      return;
    }

    let jsonData = [];

    // If the file is not empty, parse the existing data as JSON
    if (data.trim()) {
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        console.error(e);
        res.status(500).send('Error parsing JSON data');
        return;
      }
    }

    // Add the new data to the array
    jsonData.push(dataToSave);

    // Write the updated array back to the file
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});