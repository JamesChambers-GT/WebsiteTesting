const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');


app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/p1', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'p1.html');
  console.log('Serving:', filePath);
  res.sendFile(filePath);
});

app.get('/p2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'p2.html'));
});

app.get('/p3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'p3.html'));
});

app.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'))
})