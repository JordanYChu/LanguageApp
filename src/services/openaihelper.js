import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Your OpenAI API key
  dangerouslyAllowBrowser: true 
});

export const getChatbotResponse = async (messages) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages, // Pass the entire conversation history
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};