const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}


app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (response.ok) {
      const reply = data.choices?.[0]?.message?.content || 'No response.';
      res.json({ reply });
    } else {
      console.error('OpenAI error:', data);
      res.status(500).json({ error: 'OpenAI API error', detail: data });
    }

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
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