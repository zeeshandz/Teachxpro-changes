import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { GraduationCap, Loader2, PlayCircle, Sparkles } from 'lucide-react';
import EventBanner, { EventConfig } from './EventBanner';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface UpcomingClass {
  id: string;
  title: string;
  start_date: string;
}

function UpcomingClasses() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classes, setClasses] = useState<UpcomingClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Configure the Holi event
  const holiEvent: EventConfig = {
    title: 'Summer and Industrial Training',
    date: '1st June, 2025',
    icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
    gradientFrom: 'from-pink-600',
    gradientTo: 'to-purple-600',
    textColor: 'text-gray-800',
    animationDuration: 3,
    isHoli: false,
    navigateTo: '/hackathon-fest',
  };

  useEffect(() => {
    async function fetchClasses() {
      try {
        // Default fallback data
        const fallbackData = [
          {
            id: '1',
            title: 'Advanced React Patterns',
            start_date: '2024-02-15',
          },
          {
            id: '2',
            title: 'Cloud Architecture Masterclass',
            start_date: '2024-02-20',
          },
          {
            id: '3',
            title: 'Mobile App Development Workshop',
            start_date: '2024-03-01',
          },
        ];

        // Check if we can use Supabase
        if (
          import.meta.env.VITE_SUPABASE_URL &&
          import.meta.env.VITE_SUPABASE_ANON_KEY
        ) {
          try {
            const { data, error: supabaseError } = await supabase
              .from('upcoming_classes')
              .select('*')
              .order('start_date', { ascending: true })
              .limit(10);

            if (supabaseError) throw supabaseError;

            if (data && data.length > 0) {
              setClasses(data);
              setError(null);
              return;
            }
          } catch (supabaseErr) {
            console.warn(
              'Supabase fetch failed, using fallback data:',
              supabaseErr
            );
          }
        } else {
          console.warn('Supabase credentials not found, using fallback data');
        }

        // If we reach here, use fallback data
        setClasses(fallbackData);
        setError(null);
      } catch (err) {
        console.error('Error in UpcomingClasses:', err);
        setError(
          err instanceof Error ? err : new Error('Unknown error occurred')
        );

        // Use fallback data on error
        if (classes.length === 0) {
          setClasses([
            {
              id: '1',
              title: 'Advanced React Patterns',
              start_date: '2024-02-15',
            },
            {
              id: '2',
              title: 'Cloud Architecture Masterclass',
              start_date: '2024-02-20',
            },
            {
              id: '3',
              title: 'Mobile App Development Workshop',
              start_date: '2024-03-01',
            },
          ]);
        }

        // Only retry if we have Supabase credentials
        if (
          import.meta.env.VITE_SUPABASE_URL &&
          import.meta.env.VITE_SUPABASE_ANON_KEY &&
          retryCount < MAX_RETRIES
        ) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            void fetchClasses();
          }, delay);
        }
      } finally {
        setLoading(false);
      }
    }

    void fetchClasses();
  }, [retryCount, classes.length]);

  useEffect(() => {
    if (classes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % classes.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [classes.length]);

  const handleClassesClick = () => {
    navigate('/upcoming-classes');
  };

  if (loading && classes.length === 0) {
    return (
      <div className="flex flex-col md:flex-row">
        <div
          className="flex md:border-l border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleClassesClick}
        >
          <div className="py-4 px-8 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-gray-600 mr-3" />
            <span className="text-gray-600">Loading upcoming classes...</span>
          </div>
        </div>
        <EventBanner event={holiEvent} />
      </div>
    );
  }

  if (error && classes.length === 0) {
    return (
      <div className="flex flex-col md:flex-row">
        <div
          className="flex md:border-l border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleClassesClick}
        >
          <div className="py-4 px-8 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Unable to load upcoming classes
              </p>
              {retryCount < MAX_RETRIES && (
                <p className="text-sm text-gray-500">
                  Retrying... ({retryCount + 1}/{MAX_RETRIES})
                </p>
              )}
            </div>
          </div>
        </div>
        <EventBanner event={holiEvent} />
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="flex flex-col md:flex-row">
        <div
          className="flex md:border-l border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleClassesClick}
        >
          <div className="py-4 px-8 flex items-center justify-center">
            <div className="flex items-center text-gray-600">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span>Check back soon for new classes</span>
            </div>
          </div>
        </div>
        <EventBanner event={holiEvent} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex items-center gap-4 px-8 py-6 border-l border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleClassesClick}
      >
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[rgb(0,116,116)]" />
          <span className="text-sm font-medium text-gray-900">
            {`${classes[currentIndex].title} - Starting ${formatDate(
              classes[currentIndex].start_date
            )}`}
          </span>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="px-2 py-1 bg-[rgb(0,116,116)] text-white rounded-full text-[10px] font-medium">
            LIVE
          </div>
        </motion.div>
      </motion.div>
      <EventBanner event={holiEvent} />
    </div>
  );
}

export default UpcomingClasses;
