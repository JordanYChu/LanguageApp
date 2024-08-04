import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Home, BookOpen, Settings } from 'lucide-react';
import SettingsPage from "./SettingsPage";
import HomePage from "./HomePage";
import QuestionsPage from "./QuestionsPage";
import FlashcardsPage from "./FlashcardsPage";
import TopicsPage from "./TopicsPage";
import './App.css';

const NavItem = ({ icon: Icon, text, to }) => (
  <Link to={to} className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200">
    <Icon size={20} />
    <span>{text}</span>
  </Link>
);
const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-xl font-bold">Language App</h1>
          </div>
          <div className="flex flex-col space-y-2 p-4">
            <NavItem icon={Home} text="Home" to="/" />
            <NavItem icon={BookOpen} text="Flashcards" to="/flashcards" />
            <NavItem icon={Settings} text="Topics" to="/topics" />
            <NavItem icon={Settings} text="Questions" to="/questions" />
            <NavItem icon={Settings} text="Settings" to="/settings" />
            <NavItem icon={Settings} text="Logout" to="/settings" />
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;