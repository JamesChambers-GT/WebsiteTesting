const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const { connectDB, saveUser } = require('./db');
connectDB(); // Call this once when server starts



// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/users', express.json(), async (req, res) => {
  const { username, email } = req.body;
  try {
    await saveUser({ username, email });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




















//url cleaning
