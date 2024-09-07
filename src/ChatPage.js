import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SendHorizontal } from "lucide-react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebaseFuncs";
import logo from './logo.svg';
import "./ChatPageCSS.css";
import InteractableSlider from "./InteractableSlider"
import { chatHandler } from "./services/userChat";
import './services/database'
import { getChatInfo, readChats, readEntries } from "./services/database";

const topics = [
  {id: 1, topic: "Traveling"},
  {id: 2, topic: "Testing"},
  {id: 3, topic: "Boring stuff"},
  {id: 4, topic: "Cool topic"},
  {id: 5, topic: "Forgetful topics"},
  {id: 6, topic: "Family"}
];

const initialHistory = [
];

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
      <div className="break-words py-2 px-4 bg-white rounded-lg shadow-md mb-4 mx-4 flex-grow text-sm max-w-[calc(100%-5rem)]">
        {message}
      </div>
      {isUser && <UserIcon photoURL={user?.photoURL} />}
    </div>
  );
};

const PreviousChats = () => (
    // <div id={1} className="p-2 text-xl">asdasd</div>
    chats.map((chat, index) => (
      <div id={index} className="p-2 my-2 text-xl shadow-md hover:shadow-md rounded-lg">asdasd{chat.id}</div>
    ))
)
const ChatPage = () => {
    const getEntries = async (user) => {
      let a = await readEntries(user.uid, "DefaultChat")
      setMessages(a);
    }
    
    const [user] = useAuthState(auth);

    const { topicId } = useParams();
    const topic = topics[topicId - 1]?.topic || "Unknown Topic";
    
    const [messages, setMessages] = useState(initialHistory);
    const [text, setText] = useState('');
    const [chatBar, setChatBar] = useState(true);



    useEffect(()=>{
      console.log("tesitnestksdfjlkjl;fkj")
      getEntries(user);
    }, []) 

    const updateInputText = (event) => {
        setText(event.target.value);
    };

    const getBotMessage = async (text) => {
      let botMessage = await chatHandler(user.uid ,"DefaultChat",text);
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
        {/* <div id="botInfo" className={`overflow-hidden right-0 transition duration-500 z-20 ${chatBar ? '' : 'translate-x-150' }  flex-col p-4 m-4 w-1/4 shadow-md rounded-lg absolute bg-white h-[calc(100vh-2rem)]` }>
          <div>Go back</div>
          <InteractableSlider emotion={"Happiness"}/>
          <InteractableSlider emotion={"Sadness"}/>
          <InteractableSlider emotion={"Anger"}/>
          <InteractableSlider emotion={"Disgust"}/>
          <InteractableSlider emotion={"Fear"}/>
        </div>
        <div id="pastChats" className={`transition duration-500 z-20 ${chatBar ? '' : '-translate-x-150' }  flex-col p-4 m-4 w-1/6 shadow-md rounded-lg absolute bg-white h-[calc(100vh-2rem)]` }>
          <div>Go back</div>
          <PreviousChats />
        </div>
        <div onClick={() => setChatBar(false)} className={`transition z-10 top-0 left-0 right-0 bottom-0 absolute block h-full ${chatBar ? 'bg-gray-800 bg-opacity-50' : ''}`}>
        </div> */}

        <div className="p-6 flex flex-col h-screen xl:mx-48 md:mx-12">
          <h2 className="text-center text-2xl font-bold mb-4">{topic}</h2>
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