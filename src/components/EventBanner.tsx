import { motion } from 'framer-motion';
import { PartyPopper, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface EventConfig {
  title: string;
  date: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  animationDuration?: number;
  isHoli?: boolean;
  navigateTo?: string;
}

interface EventBannerProps {
  event: EventConfig;
}

function EventBanner({ event }: EventBannerProps) {
  const navigate = useNavigate();
  const {
    title,
    date,
    icon = <PartyPopper className="w-4 h-4" />,
    gradientFrom = 'from-pink-500',
    gradientTo = 'to-purple-500',
    textColor = 'text-white',
    animationDuration = 2,
    isHoli = false,
    navigateTo,
  } = event;

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute right-0 flex items-center gap-3 px-6 py-4 border-l border-gray-200 ml-auto cursor-pointer"
      onClick={handleClick}
    >
      {isHoli && (
        <>
          {/* Animated Pichkari */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"
            animate={{
              scaleY: [1, 1.2, 0.9, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="absolute -right-1 top-1 w-2 h-2 bg-orange-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Animated Gulal Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  i % 3 === 0
                    ? 'bg-pink-500'
                    : i % 3 === 1
                    ? 'bg-purple-500'
                    : 'bg-yellow-500'
                }`}
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className={`flex items-center gap-2 ${textColor} relative z-10`}>
        <motion.div
          animate={
            isHoli
              ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
        <motion.span
          className="text-sm font-medium"
          animate={
            isHoli
              ? {
                  y: [-1, 1, -1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {title} - {date}
        </motion.span>
      </div>

      <motion.div
        animate={
          isHoli
            ? {
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, 10, -10, 0],
                y: [-2, 2, -2],
              }
            : {
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className={`
            px-3 py-1 
           bg-[rgb(46,125,50)]

            rounded-full text-[10px] font-medium text-white
            ${isHoli ? 'shadow-lg shadow-pink-500/20' : ''}
          `}
        >
          {isHoli ? 'CELEBRATION' : 'UPCOMING'}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EventBanner;
