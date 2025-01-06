import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Home, BookOpen, NotebookTabs, CircleHelp, LogOut} from 'lucide-react';
import HomePage from "./HomePage";
import QuestionsPage from "./QuestionsPage";
import FlashcardsPage from "./FlashcardsPage";
import FlashcardsGame from "./FlashcardsGame";
import TopicsPage from "./TopicsPage";
import ChatPage from "./ChatPage"
import {SignOut} from "./LoginLogout"
import LoginPage from "./LoginScreen"
import { postMessage, readEntries } from './services/database';
import {chatHandler} from "./services/userChat"
import './App.css';
import background from './assets/gen-background.svg';

import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth} from "./firebaseFuncs"

const NavItem = ({ icon: Icon, text, to }) => (
  <Link to={to} className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200">
    <Icon size={20} />
    <span>{text}</span>
  </Link>
);
const App = () => {
  const [user] = useAuthState(auth);
  console.log("user: ", user) // to remove
  if (user){
    return (
      <Router>
      {/* <button onClick={async () => chatHandler(user.uid,"DefaultChat", "que es mi nombre")}>this is a button</button> */}
      <div className="flex h-screen" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
        {/* Navigation Sidebar */}
        <nav className="z-30 w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Language App</h1>
          </div>
          <div className="flex flex-col space-y-2 p-4">
            <img style={{borderRadius:"100%", width:"30%", alignSelf:"center"}} src={user.photoURL} alt="" />
            <NavItem icon={Home} text="Home" to="/" />
            <NavItem icon={BookOpen} text="Flashcards" to="/flashcards" />
            <NavItem icon={NotebookTabs} text="Topics" to="/topics" />
            <NavItem icon={CircleHelp} text="Questions" to="/questions" />
            <button onClick={SignOut}><NavItem icon={LogOut} text="Logout"></NavItem></button>
            
          </div>

        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topicId" element={<ChatPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/flashcards/:deckId" element={<FlashcardsGame />} />
            <Route path="/questions" element={<QuestionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
else {
  return (<LoginPage />)
}
};

export default App;