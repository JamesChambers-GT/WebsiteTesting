const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chatHandler(req, res) {
  const { systemPrompt, conversation, question } = req.body;

  if (!systemPrompt || !Array.isArray(conversation) || !question) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation,
      { role: 'user', content: question },
    ];

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI API error', details: err.message });
  }
}

module.exports = chatHandler;
