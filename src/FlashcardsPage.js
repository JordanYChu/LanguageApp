import { Import, Download, CirclePlus, Search } from 'lucide-react';
import { useState } from 'react';

var temp= [
  { id: 1, name: "Spanish", cards: 10, newCards: 100, hidden: false},
  { id: 2, name: "French", cards: 43, newCards: 0, hidden: false}
]



const FlashcardsPage = () => {
  const [decks, setDecks] = useState(temp);
  
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setDecks(prevDecks => 
      prevDecks.map(deck => ({ ...deck, hidden: !deck.name.toLowerCase().includes(searchTerm) }))
    );
  };
  const Decks = () => (
    decks.map(deck => (
      <div className={`hover:translate-y-[-5px] duration-200 block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock ${deck.hidden ? 'hidden' : ''}`}> <h3 className="text-lg text-center">{deck.name}</h3>
        <div>
          <span className="float-left text-green-600">{deck.cards}</span>
          <span className="float-right text-red-600">{deck.newCards}</span>
        </div>
      </div>
    ))
  )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Flashcards</h2>
      <div className="block p-2 mb-4 bg-white rounded-lg shadow-md flex">
        <Search className='inline float-right'/>
        <input onChange={handleSearch}
          type="text"
          className='inline focus:outline-none float-right'
          placeholder='Search...'  
          />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Decks />
      </div>
    </div>
  )
};


export default FlashcardsPage;
