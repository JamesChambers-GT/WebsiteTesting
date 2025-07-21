document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('You', message);
  input.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    appendMessage('ChatGPT', data.reply);
  } catch (err) {
    appendMessage('Error', 'Something went wrong.');
  }
});

function appendMessage(sender, text) {
  const box = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.innerHTML = `<span class="${sender === 'You' ? 'user' : 'bot'}">${sender}:</span> ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
