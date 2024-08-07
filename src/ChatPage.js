import { useParams } from "react-router-dom";
import logo from './logo.svg'
import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react"
import "./ChatPageCSS.css"

const topics = [
  {id: 1, topic: "Traveling"},
  {id: 2, topic: "Testing"},
  {id: 3, topic: "Boring stuff"},
  {id: 4, topic: "Cool topic"},
  {id: 5, topic: "Forgetful topics"},
  {id: 6, topic: "Family"}
]

const history = [
    {userID: 0 , message: "Hello!"}, // id: 0 is chatGPT
    {userID: 1 , message: "I need your help."}
]


const ChatPage = () => {
    const { topicId } = useParams();
    const topic = topics[topicId-1]['topic'];

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        setMessages(history)
      }, []);

    const updateInputText = (event) => {
        setText(event.target.text);
    }

    const addMessage = (event) =>  {
        if(event.key === "Enter") {
            setMessages([...messages, { userID: 0 , message: event.target.value }])
            setText('');
        }
    }



    return (
        <div className="p-6 flex flex-col h-screen ">
            <h2 className="text-2xl font-bold mb-4">{topic}</h2>
            <div id="test" className="px-4 mx-8 flex-grow overflow-y-scroll scrollbar-hide overflow-x-hidden">
                {messages.map(message => {
                    if(message.userID == 0) {
                        return BotMessage(message.message);
                    } else {
                        return UserMessage(message.message);
                    }
                })}
            </div>
            <div className="block p-2 mb-4 bg-white rounded-lg shadow-md items-end flex">
                <textarea id="messageBox" value={text} onChange={updateInputText} onKeyDown={addMessage} maxLength={500} rows={5} class="resize-none text-wrap focus:outline-none flex-grow text-sm" placeholder="Write your thoughts here..."></textarea>
                <SendHorizontal className=""/>
            </div>
        </div>
    )
}

const UserIcon = () => (
        <div className="bg-white rounded-xl shadow-md h-8 w-8">
            <img src={logo} className="aspect-square " ></img>
        </div>
)
const BotMessage = (message) => {
    return (
        <div className="flex flex-row ">
            <UserIcon></UserIcon>
            <div className="break-words py-2 px-4 bg-white rounded-lg shadow-md mb-4 mx-4 flex-grow text-sm max-w-[calc(100%-5rem)]"> 
                {message}
            </div>
            <div className="aspect-square h-8 w-8">
            </div>
        </div>
    )
}

const UserMessage = (message) => {
    return (
        <div className="flex flex-row flex-end">
            <div className="aspect-square h-8 w-8">
            </div>
            <div className="break-words py-2 px-4 bg-white rounded-lg shadow-md mb-4 mx-4 flex-grow text-sm max-w-[calc(100%-5rem)]"> 
                {message}
            </div>
            <UserIcon></UserIcon>
        </div>
    )
}


export default ChatPage;