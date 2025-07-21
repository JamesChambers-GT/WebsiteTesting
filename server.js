const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();
const { getChatReply } = require('./chatHandler');

app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const reply = await getChatReply(userMessage);
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

console.log('Node version:', process.version);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



//url cleaning
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
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