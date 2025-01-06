import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const FlashcardsGame = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);
    
    // Example cards array
    const cards = [
      { front: "Hello", back: "Hola" },
      { front: "Goodbye", back: "Adiós" },
      { front: "Thank you", back: "Gracias" }
    ];
  
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
      setCurrentCard((prev) => (prev + 1) % cards.length);
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
                {isFlipped ? cards[currentCard].front : cards[currentCard].back}
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