import React from 'react';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
  onPreview: () => void;
  onDownload: () => void;
}

export function ActionButtons({ onPreview, onDownload }: ActionButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mt-8 pt-6 border-t"
    >
      <div className="flex justify-center gap-4">
        <button 
          onClick={onPreview}
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Preview Resume
        </button>
        <button 
          onClick={onDownload}
          className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Download PDF
        </button>
      </div>
    </motion.div>
  );
}