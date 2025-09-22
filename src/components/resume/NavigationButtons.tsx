import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function NavigationButtons({ currentIndex, totalSteps, onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </button>
      <div className="text-sm text-gray-500">
        Step {currentIndex + 1} of {totalSteps}
      </div>
      <button
        onClick={onNext}
        disabled={currentIndex === totalSteps - 1}
        className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
}