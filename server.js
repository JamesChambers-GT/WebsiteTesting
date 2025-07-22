//required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);



//imported backend methods
  //DB
const { connectDB, getDB } = require('./db');
console.log("connecting 1/2");
connectDB(); 
  //AI
const chatHandler = require('./chat-handler');


//app.use methods
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//app.post methods
  //DB
    
  //AI
app.post('/api/chat', chatHandler);





//app.get methods
  //fetch all users
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







// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




















//url cleaning
