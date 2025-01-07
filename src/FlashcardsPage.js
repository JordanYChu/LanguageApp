import { Import, Download, CirclePlus, Search } from 'lucide-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseFuncs';
import { addCard, getDecks } from './services/database';
import { addDeck } from './services/database';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react';
import { languageList } from './languageService';


const FlashcardsPage = () => {
  const [decks, setDecks] = useState([]);
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [newDeck, setNewDeck] = useState({ title: '', description: '' });
  const [currDeckChosen, setDeckChosen] = useState({ title: '', description: '' });
  const [currLanguage, setLanguage] = useState("English");
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  useEffect(()=>{
    getDecks(user.uid).then(decks => {setDecks(decks)});
  }, []) 

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setDecks(prevDecks => 
      prevDecks.map(deck => ({ ...deck, hidden: !deck.title.toLowerCase().includes(searchTerm) }))
    );
  };
  const Decks = () => (
    decks.map(deck => (
      <Link key={deck.title} to={`/flashcards/${deck.id}`} className={`hover:translate-y-[-5px] duration-200 block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock ${deck.hidden ? 'hidden' : ''}`}>
        <h3 className="text-lg text-center">{deck.title}</h3>
        <div>
          <span className="float-left text-green-600">temp</span>
          <span className="float-right text-red-600">temp</span>
        </div>
      </Link >
    ))
  )

  const LanguageSelector = () => {
    return (
      <Menu as="div" className="relative bg-whiteinline-block text-left">
        <div>
          <MenuButton className="inline-flex w-48 justify-center gap-x-1.5 rounded-md bg-white px-5 py-2 text-md font-semibold text-gray-900 border hover:bg-gray-50">
            <span className='flex-1 text-center truncate'>
              {currLanguage}
            </span>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 max-h-96 overflow-scroll origin-top-right rounded-md bg-white shadow-lg
          overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
          "
        >
          {languageList.map((lang, index) => (
            <div  key={index} className="py-1">
              <MenuItem>
                <a onClick={(e) => {
                  e.preventDefault()
                    setLanguage(lang)
                  }} 
                  className="block px-4 py-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none" >
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
  const DeckSelector = () => { 
    return (
      <Menu as="div" className="relative bg-whiteinline-block text-left">
        <div>
          <MenuButton className="inline-flex w-48 justify-center gap-x-1.5 rounded-md bg-white px-5 py-2 text-md font-semibold text-gray-900 border hover:bg-gray-50">
            <span className='flex-1 text-center truncate'>
              {currDeckChosen.title}
            </span>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 max-h-96 overflow-scroll origin-top-right rounded-md bg-white shadow-lg
          overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
          "
        >
          {decks.map((deck, index) => (
            <div  key={index} className="py-1">
              <MenuItem>
                <a onClick={(e) => {
                  e.preventDefault()
                  setDeckChosen(deck)
                  }} 
                  className="block px-4 py-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none" >
                  {deck.title}
                </a>
              </MenuItem>
            </div>
            )
          )}
        </MenuItems>
      </Menu>
    )
  }
  const addNewCard = (e) => {
    e.preventDefault();
    addCard({
      word: front,
      translation: back,
      userID: user.uid,
      visited: false,
      deck: currDeckChosen.id
    })
    setIsModalCardOpen(false)
  }
  const addNewDeck = (e) => {
    e.preventDefault();
    addDeck({
      title: newDeck.title,
      language: currLanguage,
      userID: user.uid
    });
    getDecks(user.uid).then(decks => {setDecks(decks)});
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Flashcards</h2>
      <div className='flex justify-between gap-2'>
        <div className="grow block p-2 mb-4 bg-white rounded-lg shadow-md flex">
          <Search className='inline float-right'/>
          <input onChange={handleSearch}
            type="text"
            className='inline px-2 focus:outline-none float-right w-full'
            placeholder='Search...'  
            />
        </div>
        <button className='flex justify-center gap-x-2 rounded-lg px-6 py-2 mb-4 shadow-md bg-white hover:bg-gray-50'
          onClick={() => setIsModalOpen(true)}
        >
            <span className='flex-1 text-center'>
              Add Deck
            </span>
            <CirclePlus className='-mr-1'/>
        </button >
        <button className='flex justify-center gap-x-2 rounded-lg px-6 py-2 mb-4 shadow-md bg-white hover:bg-gray-50'
          onClick={() => setIsModalCardOpen(true)}
        >
            <span className='flex-1 text-center'>
              Add Card
            </span>
            <CirclePlus className='-mr-1'/>
        </button >
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Decks />
      </div>
      {isModalCardOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">Add New Card</h3>
          <form  onSubmit={addNewCard}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Front</label>
              <input type="text" className="w-full p-2 border rounded"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                required
              />
              <label className="block text-sm font-medium mb-1">Back</label>
              <input type="text" className="w-full p-2 border rounded"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                required
              />
              <label className="block text-sm font-medium mb-1">Deck</label>
              <DeckSelector />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsModalCardOpen(false)} >
                Cancel
              </button>
              <button type="submit"  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600" >
                Add Card
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">Add New Deck</h3>
          <form  onSubmit={addNewDeck}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newDeck.title}
                onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })}
                required
              />
            </div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <LanguageSelector />
            <div className="flex justify-end mt-4 gap-2">
              <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsModalOpen(false)} >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600" >
                Add Deck
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  )
};


export default FlashcardsPage;
