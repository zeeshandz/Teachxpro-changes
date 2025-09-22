import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  MessageCircle,
  Award,
  Briefcase,
  Video,
  ExternalLink,
  X,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ComingSoonToast from './ComingSoonToast';

interface TimeSlot {
  id: string;
  time: string;
  is_available: boolean;
}

interface MentorDetailsProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    rating: number;
    reviews: number;
    specialties: string[];
    experience: string;
    hourlyRate: number;
    availability: string[];
    linkedIn: string;
    about?: string;
    topics?: Array<{
      name: string;
      description: string;
      duration: string;
      price: number;
    }>;
  };
  onClose: () => void;
  onSchedule: () => void;
}

interface DaySlots {
  [key: string]: TimeSlot[];
}

function MentorDetails({ mentor, onClose, onSchedule }: MentorDetailsProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<DaySlots>({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const fetchTimeSlots = async (date: string) => {
    setIsLoadingSlots(true);
    try {
      const { data, error } = await supabase
        .from('mentor_time_slots')
        .select('id, time, is_available')
        .eq('mentor_id', mentor.id)
        .eq('date', date)
        .order('time');

      if (error) throw error;

      if (!data || data.length === 0) {
        const defaultSlots = Array.from({ length: 9 }, (_, i) => {
          const hour = Math.floor(i + 9.5);
          const minute = ((i + 9.5) % 1) * 60;
          const time = `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`;
          return {
            id: crypto.randomUUID(),
            time,
            is_available: true,
          };
        });
        setTimeSlots((prev) => ({ ...prev, [date]: defaultSlots }));
      } else {
        setTimeSlots((prev) => ({ ...prev, [date]: data }));
      }
    } catch (err) {
      console.error('Error fetching time slots:', err);
      setError('Failed to load available time slots');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  // Memoized calculation of next 5 working days
  // const workingDays = useMemo(() => {
  //   const days = [];
  //   let currentDate = new Date();

  //   while (days.length < 5) {
  //     currentDate.setDate(currentDate.getDate() + (days.length === 0 ? 0 : 1));
  //     if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
  //       days.push(new Date(currentDate));
  //     }
  //   }

  //   return days;
  // }, []); // Empty dependency array: runs once on mount

  const workingDays = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 0; days.length < 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayOfWeek = nextDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(nextDate);
      }
    }

    return days;
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Mentor Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Section */}
          <div className="flex items-start gap-6 mb-8">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">{mentor.name}</h3>
              <p className="text-gray-600 mb-2">
                {mentor.role} at {mentor.company}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500">
                    ({mentor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{mentor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">About</h4>
            <p className="text-gray-600">
              {mentor.about ||
                `Experienced ${
                  mentor.role
                } with expertise in ${mentor.specialties.join(', ')}. 
                Currently working at ${
                  mentor.company
                }, helping teams and individuals excel in their technical careers.`}
            </p>
          </div>

          {/* Specialties */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Topics & Pricing */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Consultation Topics</h4>
            <div className="grid gap-4">
              {(
                mentor.topics || [
                  {
                    name: 'Technical Interview Prep',
                    description:
                      'Mock interviews and feedback for technical roles',
                    duration: '60 min',
                    price: mentor.hourlyRate,
                  },
                  {
                    name: 'Code Review & Architecture',
                    description:
                      'Review your code and discuss architectural decisions',
                    duration: '45 min',
                    price: Math.round(mentor.hourlyRate * 0.75),
                  },
                  {
                    name: 'Career Guidance',
                    description:
                      'Career path planning and skill development advice',
                    duration: '30 min',
                    price: Math.round(mentor.hourlyRate * 0.5),
                  },
                ]
              ).map((topic, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl hover:border-black transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{topic.name}</h5>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{topic.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">₹{topic.price}</span>
                    <button
                      onClick={onSchedule}
                      className="items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Availability</h4>
            <div className="space-y-4">
              {/* Date Selection */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {workingDays.map((date, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedDate(date.toISOString().split('T')[0])
                    }
                    className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all ${
                      selectedDate === date.toISOString().split('T')[0]
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs opacity-75">
                        {date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="bg-gray-50 rounded-xl p-4">
                {selectedDate ? (
                  isLoadingSlots ? (
                    <div className="h-[100px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
                    </div>
                  ) : timeSlots[selectedDate]?.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots[selectedDate].map((slot) => (
                        <div
                          key={slot.id}
                          className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                            slot.is_available
                              ? 'bg-white border border-gray-200'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(
                                `2000-01-01T${slot.time}`
                              ).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })}
                            </span>
                          </div>
                          {slot.is_available ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <span className="text-xs bg-gray-100">Booked</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No time slots available for this date
                    </div>
                  )
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Select a date to view available time slots
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>All sessions are 60 minutes long</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <button
              onClick={onSchedule}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <Video className="h-5 w-5" />
              <span>Schedule Consultation</span>
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <a
              href={mentor.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
        <ComingSoonToast
          isVisible={showComingSoon}
          onClose={() => setShowComingSoon(false)}
        />
      </div>
    </div>
  );
}

export default MentorDetails;
