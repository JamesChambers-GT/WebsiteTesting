import OpenAI from "openai";
const client = new OpenAI(process.env.OPENAI_API_KEY);

async function call_chat(req,res) {

  const {system, conversation, question} = req.body


  const messages = [
    { role: 'system', content: system },
    ...conversation,
    { role: 'user', content: question },
  ];
  
  const response = await client.responses.create({
    model: "gpt-4.1",
    messages
  });

  reply = response.output_text
  res.json(reply)



}



module.exports = call_chat;
