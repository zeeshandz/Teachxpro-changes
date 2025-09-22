import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardComponentProps {
  front: string;
  back: string;
}

export const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative w-full aspect-[3/2] cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full rounded-2xl border-2 border-purple-200 bg-white shadow-lg p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            <p className="text-xl text-gray-900 font-medium text-center break-words max-w-full">
              {front}
            </p>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <p className="text-sm text-gray-400">Click to flip</p>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full rounded-2xl border-2 border-purple-200 bg-white shadow-lg p-8 flex flex-col"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            <p className="text-xl text-gray-900 font-medium text-center break-words max-w-full">
              {back}
            </p>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <p className="text-sm text-gray-400">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 