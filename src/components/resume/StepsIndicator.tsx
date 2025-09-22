import React from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
}

interface StepsIndicatorProps {
  sections: Section[];
  currentIndex: number;
}

export function StepsIndicator({ sections, currentIndex }: StepsIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-12 relative max-w-4xl mx-auto">
      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 -z-10" />
      {sections.map((section, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center w-20"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all duration-300 border-2 ${
                isActive
                  ? 'border-black bg-black text-white'
                  : isPast
                  ? 'border-black bg-black text-white'
                  : 'border-black bg-white text-black'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-[10px] font-medium text-center mt-1 ${
              isActive || isPast ? 'text-black' : 'text-black/60'
            } flex items-center justify-center text-center whitespace-nowrap`}>
              {section.title}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}