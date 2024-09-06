import {postMessage, getChatInfo, readChats, readEntries} from "./database"
import {getChatbotResponse} from "./openaihelper"
export const chatHandler = async (uid, chatID, msg) => {
    // save the msg to db
    const messageData = {
        Agent: "user",
        ChatID: chatID,
        message: msg,
        userID: uid,
    };
    await postMessage(messageData);
    
    // retrieve chat info
    const chatInfo = await getChatInfo(uid , chatID);
    
    console.log("chatInfo: ", chatInfo)
    // get the chat systemmsg
    const systemMsg = chatInfo.SystemMsg;
    // get past messages
    const messages = await readEntries(uid, chatID);

    // format messages for openAI call
    const formattedMsgs = formatMsgs(messages, systemMsg);

    // make openAI call and get response
    const chatbotResponse = await getChatbotResponse(formattedMsgs);
    
    // save response to db
    const resposeMessageData = {
        Agent: "assistant",
        ChatID: chatID,
        message: chatbotResponse,
        userID: uid,
    };
    await postMessage(resposeMessageData);
    // return the response  
    console.log(chatbotResponse)
    return chatbotResponse;
}


const formatMsgs = (messages, systemMsg) => {
    const reversedMsgs = messages.reverse();
    
    var formattedMessages = [];
    
    formattedMessages.push({"role":"system", "content":systemMsg})
    for (let i = 0; i < reversedMsgs.length; i++ ){
        formattedMessages.push({"role":reversedMsgs[i].Agent, "content": reversedMsgs[i].message})
    }
    console.log("formatted msgs:", formattedMessages)
    return formattedMessages;

}