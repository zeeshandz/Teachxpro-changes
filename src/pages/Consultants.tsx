import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Award,
  Briefcase,
  Video,
  ExternalLink,
} from 'lucide-react';
import MentorDetails from '../components/MentorDetails';
import ScheduleConsultation from '../components/ScheduleConsultation';
import ComingSoonToast from '../components/ComingSoonToast';

interface Mentor {
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
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Alex Thompson',
    role: 'Senior Software Architect',
    company: 'Google',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    reviews: 124,
    specialties: ['System Design', 'Cloud Architecture', 'React', 'Node.js'],
    experience: '12+ years',
    hourlyRate: 199,
    availability: ['Mon-Wed: 7PM-10PM', 'Sat: 10AM-6PM'],
    linkedIn: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Frontend Engineering Manager',
    company: 'Meta',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    reviews: 98,
    specialties: [
      'React',
      'Frontend Architecture',
      'Performance',
      'Leadership',
    ],
    experience: '8+ years',
    hourlyRate: 149,
    availability: ['Tue-Thu: 6PM-9PM', 'Sun: 11AM-5PM'],
    linkedIn: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Principal Backend Engineer',
    company: 'Amazon',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    reviews: 156,
    specialties: ['Distributed Systems', 'Java', 'AWS', 'Microservices'],
    experience: '15+ years',
    hourlyRate: 249,
    availability: ['Mon-Fri: 8PM-11PM', 'Sat: 9AM-5PM'],
    linkedIn: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Emily Zhang',
    role: 'ML/AI Technical Lead',
    company: 'Microsoft',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 4.7,
    reviews: 89,
    specialties: [
      'Machine Learning',
      'Python',
      'TensorFlow',
      'Computer Vision',
    ],
    experience: '10+ years',
    hourlyRate: 179,
    availability: ['Wed-Fri: 7PM-10PM', 'Sun: 10AM-6PM'],
    linkedIn: 'https://linkedin.com',
  },
];

function Consultants() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showScheduling, setShowScheduling] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  React.useEffect(() => {
    console.log('selectedMentor changed:', selectedMentor);
  }, [selectedMentor]);

  const handleMentorSelect = (mentor: Mentor) => {
    console.log('Selected mentor:', mentor);
    setSelectedMentor(mentor);
  };

  const handleScheduleClick = (e: React.MouseEvent, mentor: Mentor) => {
    e.stopPropagation();
    setSelectedMentor(mentor);
    setShowScheduling(true);
  };

  const handleModalClose = () => {
    setSelectedMentor(null);
    setShowScheduling(false);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComingSoon(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Expert Mentorship
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Connect with industry leaders for personalized guidance and
              accelerate your career growth through one-on-one mentorship
              sessions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleMentorSelect(mentor)}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50" />
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">
                      {mentor.rating}
                    </span>
                    <span className="text-gray-500">({mentor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{mentor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {mentor.company}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleScheduleClick(e, mentor)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <Video className="h-4 w-4" />
                    <span>₹{mentor.hourlyRate}/hr</span>
                  </button>
                  <button
                    onClick={handleMessageClick}
                    className="p-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <a
                    href={mentor.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedMentor && !showScheduling && (
          <MentorDetails
            mentor={selectedMentor}
            onClose={handleModalClose}
            onSchedule={() => setShowScheduling(true)}
          />
        )}

        {selectedMentor && showScheduling && (
          <ScheduleConsultation
            mentor={selectedMentor}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>

      {/* Coming Soon Toast */}
      <ComingSoonToast
        isVisible={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </div>
  );
}

export default Consultants;
