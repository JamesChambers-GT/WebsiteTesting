const socket = io(); // connect to server

const form = document.getElementById('chat-form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Send message when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value;
  if (msg) {
    socket.emit('chat message', msg); // send to server
    input.value = '';
  }
});

// Listen for messages from server
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
});
