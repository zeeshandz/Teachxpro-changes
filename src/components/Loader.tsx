import { motion } from 'framer-motion';

interface LoaderProps {
  text?: string;
}

function Loader({ text = 'Loading...' }: LoaderProps) {
  return (
    <div className="fixed inset-0 bg-[#fffcf5] flex items-center justify-center">
      <div className="relative">
        {/* Animated circles */}
        <motion.div 
          className="w-20 h-20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Outer circle with gradient border */}
          <div className="absolute inset-0 rounded-full border-[4px] border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 [mask:linear-gradient(#fff,#fff) padding-box,linear-gradient(#fff,#fff)] [mask-composite:exclude] shadow-lg" />
          
          {/* Middle circle */}
          <motion.div 
            className="absolute inset-3 rounded-full border-2 border-black/10 shadow-inner"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Animated X with background */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            {/* Background circle for X */}
            <div className="absolute inset-0 w-10 h-10 bg-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
            {/* X text */}
            <span className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
              X
            </span>
          </div>
        </motion.div>

        {/* Loading text with dots animation */}
        <motion.p 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-800 font-semibold text-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}

export default Loader; 