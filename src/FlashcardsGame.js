import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFlashcards } from "./services/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { setCardVisited } from "./services/database";
import { updateStreak } from "./services/database";
import { auth } from "./firebaseFuncs";

const FlashcardsGame = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [deck, setDeck] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [user] = useAuthState(auth);

    const { deckId } = useParams();

    const shuffleDeck = (deck) => {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }
  
    useEffect(() => {
      getFlashcards(user.uid, deckId).then(flashcards => {
        setDeck(shuffleDeck(flashcards));
      });
      const handleKeyPress = (e) => {
        if (e.code === 'Space') {
          setIsFlipped(!isFlipped);
        }
      };
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);
  
    const handleNext = () => {
      setCurrentCard((prev) => (prev + 1) % deck.length);
      setIsFlipped(false);
    };
  
    const GameCard = () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-96 h-60 cursor-pointer perspective-1000" onClick={(e) => {
              e.preventDefault();
              setIsFlipped(!isFlipped);
            }}
          >
            <div className={`
              relative w-full h-full duration-500
            `}>
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-2xl p-4">
                <div className="flex-1 flex items-center justify-center">
                  {deck && deck.length > 0 && (isFlipped ? deck[currentCard].word : deck[currentCard].translation)}
                </div>
                <span className="text-sm text-gray-400">
                  {isFlipped ? 'Back' : 'Front'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setCardVisited(deck[currentCard].id, true);
                setIsFlipped(false);
                handleNext()
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Got It!
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleNext()
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Card
            </button>
          </div>
        </div>
      );
    };
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">FlashCard Game</h2>
        {deck && deck.length > 0 && <GameCard />} 
        {deck && deck.length === 0 && <h2 className="text-2xl font-bold mb-4 text-center bg-white rounded-lg p-4 m-8 shadow-md">No more cards in this deck</h2>}
      </div>
    );
  };
  
export default FlashcardsGame;