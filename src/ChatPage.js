import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebaseFuncs";
import logo from './logo192.png';
import "./ChatPageCSS.css";
import { chatHandler } from "./services/userChat";
import './services/database'
import { getChatInfo, readChats, readEntries, deleteMessages } from "./services/database";


import { LanguageContext } from './LanguageContext';




const chats = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
]

const UserIcon = ({ photoURL }) => (
  <div className="bg-white rounded-full shadow-md h-8 w-8">
    <img src={photoURL || logo} className="rounded-full aspect-square" alt="User" />
  </div>
);

const Message = ({ message, isUser }) => {
  const [user] = useAuthState(auth);
  
  return (
    <div className={`flex flex-row ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <UserIcon photoURL={logo} />}
      <div className="break-words w-fit max-w-[calc(100%-6rem)] py-2 px-4 bg-white rounded-lg shadow-md mb-4 mx-4 text-sm">
        {message}
      </div>
      {isUser && <UserIcon photoURL={user?.photoURL} />}
    </div>
  );
};

const PreviousChats = () => (
    chats.map((chat, index) => (
      <div id={index} className="p-2 my-2 text-xl shadow-md hover:shadow-md rounded-lg">asdasd{chat.id}</div>
    ))
)
const ChatPage = () => {
    
    const [user] = useAuthState(auth);
    const {currLanguage} = useContext(LanguageContext)

    const { topicId } = useParams();
    const currChat = topicId;
    
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    // const [chatBar, setChatBar] = useState(true);

    deleteMessages(user.uid, topicId)

    const getEntries = async (user) => {
      let a = await readEntries(user.uid, currChat)
      setMessages(a);
    }


    useEffect(()=>{
      getEntries(user);
    }, []) 

    const updateInputText = (event) => {
        setText(event.target.value);
    };

    const getBotMessage = async (text) => {
      let botMessage = await chatHandler(user.uid, currChat, text, currLanguage);
      await setMessages([{ Agent: "assistant", message: botMessage }, { Agent: "user", message: text}, ...messages]);
      console.log(messages);
  } 
    const addMessage = (event) => {
        if (event.key === "Enter" && text.trim()) {
          setMessages([{ Agent: "user", message: text.trim()}, ...messages]);
          getBotMessage(text.trim())
          setText('');
        }
    };
    return (
      <>
        <div className="p-6 flex flex-col h-screen xl:mx-48 md:mx-12">
          <h2 className="text-center text-2xl font-bold mb-4">{currChat}</h2>
          <div id="test" className="flex-grow overflow-y-scroll scrollbar-hide overflow-x-hidden">
              {messages.toReversed().map((message, index) => (
                  <Message key={index} message={message.message} isUser={message.Agent === "user"} />
              ))}
          </div>
          <div className="block p-2 mb-4 bg-white rounded-lg shadow-md items-end flex">
              <textarea 
                  id="messageBox"
                  value={text}
                  onChange={updateInputText}
                  onKeyDown={addMessage}
                  maxLength={500}
                  rows={5}
                  className="resize-none text-wrap focus:outline-none flex-grow text-sm"
                  placeholder="Write your thoughts here..."
              />
              <SendHorizontal className=""/>
          </div>
        </div>
      </>
    );
};

export default ChatPage;