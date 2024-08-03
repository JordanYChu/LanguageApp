import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Home, BookOpen, Settings } from 'lucide-react';
import './App.css';

const NavItem = ({ icon: Icon, text, to }) => (
  <Link to={to} className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-200">
    <Icon size={20} />
    <span>{text}</span>
  </Link>
);

const HomePage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Welcome to the Language App</h2>
    <p>Studying!</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p>Settings options here.</p>
  </div>
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
            <NavItem icon={Settings} text="Settings" to="/settings" />
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;