require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
  dangerouslyAllowBrowser: true 
});

// Middleware
app.use(bodyParser.json());

// Define routes
app.post('/api/chat/completion', async (req, res) => {
  try {
    const { messages } = req.body;
    console.log("messsagessss:")
    console.log(messages)

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
    });
    
    res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    res.status(500).json({ error: "Sorry, something went wrong. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});