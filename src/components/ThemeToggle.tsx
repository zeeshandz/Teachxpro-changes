import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: isDarkMode ? 'white' : 'inherit',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;