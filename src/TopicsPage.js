import { CirclePlus, Search} from 'lucide-react';
import { Gamepad2, Apple, Plane, PawPrint, Briefcase, Bike, Bot, Brain, Cpu, HeartPulse, BookX, School, Clapperboard, Leaf, Goal, Microscope, Shirt, Palette, CookingPot, BookOpenText, Music, Dumbbell, CandyCane} from 'lucide-react';
import { Link } from "react-router-dom";
import { readChats } from './services/database';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from './firebaseFuncs';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const topicstemp = [
  // {id: 1, ChatID: "Traveling"},
  // {id: 2, ChatID: "Testing"},
  // {id: 3, ChatID: "Boring stuff"},
  // {id: 4, ChatID: "Cool topic"},
  // {id: 5, ChatID: "Forgetful topics"},
  // {id: 6, ChatID: "Family"}
]


const languageList = ["Spanish", "French", "German", "Japanese"]
const iconPresetList = [Gamepad2, Apple, Plane, PawPrint, Briefcase, Bike, Bot, Brain, Cpu, HeartPulse, BookX, School, Clapperboard, Leaf, Goal, Microscope, Shirt, Palette, CookingPot, BookOpenText, Music, Dumbbell, CandyCane]

function Icon({ icon: Icon }) {
return <Icon size={80} className="mx-auto text-purple-400 hover:text-orange-500 duration-50" />;
}

const TopicsPage= () => {

  const [user] = useAuthState(auth)
  // const [user] = useAuthState(auth);
  const [topics, setTopics] = useState(topicstemp);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTopics([...topics, { ChatID: newTopic.title }]);
    setNewTopic({ title: '', description: '' });
    setIsModalOpen(false);
  };

  const getChat = async (user) => {
    const topicRead = await readChats(user.uid);
    const topicsWithHidden = topicRead.map(topic => ({
      ...topic,
      hidden: false
    }));

    const topicsWithIcons = topicsWithHidden.map((topic,index) => ({
      ...topic,
      icon: iconPresetList[index % iconPresetList.length]
     }));
    setTopics(topicsWithIcons)
  }
  useEffect(()=>{
    getChat(user);
  }, []) 

  const Topic = () => {
     return (
      topics.map(topic => (
        <Link key={`${topic.ChatID}`} to={`/topics/${topic.ChatID}`} 
        className={`${topic.hidden ? "hidden" : ""} duration-200 size-full aspect-square inline p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock flex flex-col items-center`}>
          <h2 className="text-xl mb-4">{topic.ChatID}</h2>
          <div className="flex-1 flex items-center justify-center">
            <Icon icon={topic.icon} />
          </div>
        </Link>
      ))
    )
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setTopics(prevTopics => 
      prevTopics.map(topic => ({ ...topic, hidden: !topic.ChatID.toLowerCase().includes(searchTerm) }))
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Topics</h2>
      <div className='flex justify-between gap-2'>
        <div className=" grow block p-2 mb-4 bg-white rounded-lg shadow-md flex">
          <Search className='inline float-right'/>
          <input onChange={handleSearch}
            type="text"
            className='inline focus:outline-none float-right'
            placeholder='Search...'  
            />
        </div>
        <LanguageSelector />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 max-h-[90vh] overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {<Topic />}
          <div onClick={() => setIsModalOpen(true)} className={`size-full aspect-square inline p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock`}>
            <CirclePlus className='inline float-right'/>
            <h2 className="text-lg text-center hover:underline">Add Topic</h2>
          </div>
          {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold mb-4">Add New Topic</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Topic
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

const LanguageSelector = () => {
  return (
    <Menu as="div" className="relative bg-whiteinline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-md hover:bg-gray-50">
          Language
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg"
      >
        {languageList.map((lang, index) => (
          <div  key={index} className="py-1">
            <MenuItem>
              <a className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none" >
                {lang}
              </a>
            </MenuItem>
          </div>
          )
        )}
      </MenuItems>
    </Menu>
  )
}


export default TopicsPage;
