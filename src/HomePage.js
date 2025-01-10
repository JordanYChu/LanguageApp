import { Link } from "react-router-dom";
import { ArrowRightSquare, CircleCheckBig } from "lucide-react";
import { updateStreak, GetUserInfo, readChats } from "./services/database";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseFuncs';
import { useEffect, useState } from 'react';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const HomePage = () => {
  const [user] = useAuthState(auth);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const day = today.getDate();
  
  const [lastDeck, setLastDeck] = useState("");
  const [randomChat, setRandomChat] = useState("");
  useEffect(() => {
    const getChats = async () => {
      const chats = await readChats(user.uid);
      const filteredChats = chats.filter(chat => chat.ChatID !== "Questions");
      if (filteredChats.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredChats.length);
        const randomTopic = filteredChats[randomIndex];
        setRandomChat(`/topics/${randomTopic.ChatID}`);
      }
    }
    const getUserInfo = async () => {
      if(user) {
        try {
          const userDoc = await GetUserInfo(user.uid);
          setLastDeck("/" + userDoc.recentDeck);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

    }
    const fetchStreak = async () => {
      if (user) {
        try {
          const newStreak = await updateStreak(user.uid);
          setStreak(newStreak || 0);
        } catch (error) {
          console.error("Error fetching streak:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getUserInfo();
    fetchStreak();
    getChats()
  }, [user]);

  const DailyDone = true; // You might want to make this dynamic based on user's daily activity

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-6xl font-bold mb-4">Welcome Back</h1>
      <h2><span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-500">Jordan</span></h2>

      <div className="px-[15%] flex flex-col items-stretch gap-4 mt-8">
        <h2 className="text-4xl font-bold text-center">Streak</h2>
        <h2 className="text-1xl text-center"> <span className="">Start a conversation at least once</span><span className="no-underline italic font-bold"> or </span> <span className="">Review Flashcards</span></h2>
        <div className="flex justify-center">
          <div className="flex justify-center bg-white rounded-lg shadow-md p-2 items-center text-xl">
              <h2 className="text-2xl">🔥</h2>
              <h2 className="text-2xl text-center"><b>{streak}</b> Streak</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-2 items-center text-xl font-bold flex ">
            <div className="flex flex-col items-center justify-around w-32 h-32 p-4 bg-gradient-to-t from-purple-200 to-yellow-200  rounded-lg shadow-md">
              <span className="text-3xl font-bold">{month} {day}</span>
              <div className="text-3xl font-bold">{year}</div>
            </div>
            {DailyDone && (
              <CircleCheckBig className="mx-8" color="limegreen" size={80} />
            )}
          </div>
        </div>
        <h2 className="text-4xl font-bold text-center">Practice</h2>
        <div className="bg-white rounded-lg shadow-md p-2 text-xl font-bold">
          <Link to={randomChat} className="flex items-center justify-between  px-4 py-2 rounded">
            <span>Random Topic</span>
            <ArrowRightSquare size={32} />
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-2 text-xl font-bold">
          <Link to={`/Flashcards${lastDeck}`} className="flex items-center justify-between  px-4 py-2 rounded">
            <span>Continue Last Deck</span>
            <ArrowRightSquare size={32} />
          </Link>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
