import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Takes in single message and the chatname
const messageResponseGetter = (message, userID, chatID) => {
 // makes DB call to to return message history for the chat
 // append current message to the history and store in var "messages"
 // call getChatbotResponse with messages
} 


const getChatbotResponse = async (messages) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: messages, // Pass the entire conversation history
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};

export default getChatbotResponse;