const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/p1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'p1.html'));
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