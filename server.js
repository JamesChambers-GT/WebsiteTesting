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
const {getNextClient, getNextAdvisor} = require('./data-hander')
  //AI
const call_chat = require('./chat-handler');


//app.use methods
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//app.post methods
  //DB
app.post('/api/hello', async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection('test');
  await collection.insertOne({ name: req.body.name });
  res.json({ message: "Data saved" });
});
  //AI
app.post('/api/chat', call_chat);
  //testing







//app.get methods
  //next advisor, client
app.get('/api/nextA', getNextAdvisor)
app.get('/api/nextC', getNextClient)


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
