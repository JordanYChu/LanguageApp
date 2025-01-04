import { CirclePlus, Search} from 'lucide-react';
import { Link } from "react-router-dom";
import { readChats } from './services/database';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from './firebaseFuncs';

const topicstemp = [
  // {id: 1, ChatID: "Traveling"},
  // {id: 2, ChatID: "Testing"},
  // {id: 3, ChatID: "Boring stuff"},
  // {id: 4, ChatID: "Cool topic"},
  // {id: 5, ChatID: "Forgetful topics"},
  // {id: 6, ChatID: "Family"}
]


const TopicsPage= () => {

  const [user] = useAuthState(auth)
  // const [user] = useAuthState(auth);
  const [topics, setTopics] = useState(topicstemp);

  const getChat = async (user) => {
    const topicRead = await readChats(user.uid);
    setTopics(topicRead)
  }
  useEffect(()=>{
    getChat(user);
  }, []) 

  const Topic = () => {
     return (
      topics.map(topic => (
        <Link key={`${topic.ChatID}`} to={`/topics/${topic.ChatID}`} className={`size-full aspect-square inline p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock`}>
          <h2 className="text-lg text-center">{topic.ChatID}</h2>
        </Link>
      ))
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <div className="block p-2 mb-4 bg-white rounded-lg shadow-md flex">
        <input
          type="text"
          className='inline focus:outline-none float-right'
          placeholder='Search...'  
          />
        <Search className='inline float-right'/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {<Topic />}
        <div className={`size-full aspect-square inline p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock`}>
          <CirclePlus className='inline float-right'/>
          <h2 className="text-lg text-center hover:underline">Add Topic</h2>
        </div>
      </div>
    </div>
  )
};

export default TopicsPage;
