const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/page1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

app.get('/page3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page3.html'));
});

app.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})