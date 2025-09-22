import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

interface ComingSoonToastProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

function ComingSoonToast({ isVisible, onClose, message }: ComingSoonToastProps) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="fixed left-0 right-0 top-8 z-50 flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-purple-500 shadow-xl">
            <Clock className="h-5 w-5 text-purple-600" />
            <span className="text-base font-bold text-purple-800 tracking-wide">
              {message || 'Feature coming soon!'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ComingSoonToast;