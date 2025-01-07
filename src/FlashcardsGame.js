import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFlashcards } from "./services/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseFuncs";

const FlashcardsGame = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [deck, setDeck] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [user] = useAuthState(auth);

    const { deckId } = useParams();

    // Example cards array
    useEffect(()=>{
        getFlashcards(user.uid, deckId).then(flashcards => {setDeck(flashcards)});
    }, []) 
    // const cards = [
    //   {word: "Hello", translation: "Hola", visited: false },
    //   { front: "Goodbye", back: "Adiós" },
    //   { front: "Thank you", back: "Gracias" }
    // ];
  
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.code === 'Space') {
          setIsFlipped(!isFlipped);
        }
      };
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }, [isFlipped]);
  
    const handleNext = () => {
      setCurrentCard((prev) => (prev + 1) % deck.length);
      setIsFlipped(false);
    };
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">FlashCard Game</h2>
        <div className="flex flex-col items-center gap-4">
          <div 
            onClick={() => {
                setIsFlipped(!isFlipped)
                console.log(isFlipped)
            }
            }
            className="w-96 h-60 cursor-pointer perspective-1000"
          >
            <div className={`relative w-full h-full duration-500 preserve-3d`}>
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl p-4">
                {deck &&  deck.length > 0 && (isFlipped ? deck[currentCard].word: deck[currentCard].translation)}
              </div>
            </div>
          </div>
          <button 
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Card
          </button>
        </div>
      </div>
    );
  };
  
export default FlashcardsGame;