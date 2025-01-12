const API_BASE_URL = '/api';

export const getChatbotResponse = async (messages) => {

  console.log(messages)
  try {
    const response = await fetch(`${API_BASE_URL}/chat/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.content;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
};