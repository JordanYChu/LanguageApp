import { Import, Download, CirclePlus, Search } from 'lucide-react';

var decks = [
  { id: 1, name: "Spanish", cards: 10, lastVisited: 100},
  { id: 2, name: "French", cards: 43, lastVisited: 0}
]


const Decks = () => (
  decks.map(decks => (
    <div className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadowblock">
      <h3 className="text-lg text-center">{decks.name}</h3>
      <div>
        <span className="float-left text-gray-600">{decks.cards}</span>
        <span className="float-right text-gray-600">{decks.lastVisited}</span>
      </div>
    </div>
  ))
)

const FlashcardsPage = () => (

  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
    <div className="block p-2 mb-4 bg-white rounded-lg shadow-md flex">
      <Import className='inline'/>
      <Download className='inline'/>
      <CirclePlus className='inline'/>
      <Search className='inline float-right'/>
      <input
        type="text"
        className='inline focus:outline-none float-right'
        placeholder='Search...'  
        />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <Decks />
    </div>
  </div>
);

export default FlashcardsPage;
