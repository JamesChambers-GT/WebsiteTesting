const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));
/**
const { connectDB, getDB } = require('./db');
console.log("connecting 1/2")
connectDB(); // Make sure this is called before any DB usage




app.post('/api/users', express.json(), async (req, res) => {
  try {
    const db = getDB();
    const users = db.collection('users');

    const { username, email } = req.body;
    await users.insertOne({ username, email, joinedAt: new Date() });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('❌ Save error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    saveMessage(socket.id, msg); // Save to SQLite
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


*/

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




















//url cleaning
