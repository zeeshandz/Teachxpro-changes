import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FlashcardComponent } from './FlashcardComponent';

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardContainerProps {
  flashcards: {
    flashCards: string;
  };
}

const parseFlashcards = (flashcardsObject: { flashCards: string }): Flashcard[] => {
  try {
    // Get the flashCards string from the object
    const flashcardsString = flashcardsObject.flashCards;

    console.log('Flashcards string:', flashcardsString);
    
    // Split by newline to get individual QA pairs
    return flashcardsString.split('\n')
      .filter(pair => pair.trim())
      .map(pair => {
        const [question, answer] = pair.split(';').map(str => str.trim());
        return {
          front: question || '',
          back: answer || ''
        };
      });
  } catch (error) {
    console.error('Error parsing flashcards:', error);
    return [];
  }
};

const FlashcardContainer: React.FC<FlashcardContainerProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parsedFlashcards, setParsedFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const cards = parseFlashcards(flashcards);
    setParsedFlashcards(cards);
  }, [flashcards]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % parsedFlashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + parsedFlashcards.length) % parsedFlashcards.length);
  };

  if (!parsedFlashcards.length) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-center text-gray-500">
        Loading flashcards...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          className="clay-button !p-2 !rounded-full !bg-black/5 hover:!bg-black/10"
          disabled={parsedFlashcards.length <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-xl">
          <FlashcardComponent
            front={parsedFlashcards[currentIndex]?.front || 'No flashcards available'}
            back={parsedFlashcards[currentIndex]?.back || 'Create some flashcards to get started'}
          />
        </div>

        <button
          onClick={handleNext}
          className="clay-button !p-2 !rounded-full !bg-black/5 hover:!bg-black/10"
          disabled={parsedFlashcards.length <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-8 flex justify-center items-center gap-3">
        {parsedFlashcards.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? 'bg-black' : 'bg-black/20'
            }`}
            initial={{ scale: 1 }}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        {currentIndex + 1} of {parsedFlashcards.length}
      </div>
    </div>
  );
};

export default FlashcardContainer; 