const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();


app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'No response.';
  res.json({ reply });
});











app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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