import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle2, Globe, MapPin, GraduationCap, Star, ArrowRight } from 'lucide-react';

interface MasterclassDetailsProps {
  classItem: {
    id: string;
    title: string;
    start_date: string;
    class_time: string;
    mode: 'online' | 'offline';
    duration_minutes: number;
    description?: string;
  };
  onClose: () => void;
  onEnroll: () => void;
}

function MasterclassDetails({ classItem, onClose, onEnroll }: MasterclassDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Main Info */}
          <div className="p-8 border-r">
            <h2 className="text-2xl font-bold mb-6">{classItem.title}</h2>

            {/* Key Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>{new Date(classItem.start_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-purple-500" />
                <span>{new Date(`2000-01-01T${classItem.class_time}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-500" />
                <span>{classItem.duration_minutes} minutes</span>
              </div>
              <div className="flex items-center gap-3">
                {classItem.mode === 'online' ? (
                  <Globe className="h-5 w-5 text-purple-500" />
                ) : (
                  <MapPin className="h-5 w-5 text-purple-500" />
                )}
                <span className="capitalize">{classItem.mode} Class</span>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">About this Masterclass</h3>
              <p className="text-gray-600 leading-relaxed">
                {classItem.description || `Join us for an intensive ${classItem.duration_minutes}-minute masterclass 
                where you'll gain hands-on experience and practical knowledge. This ${classItem.mode} session is 
                designed to help you master key concepts through real-world examples and interactive learning.`}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">What You'll Learn</h3>
              <div className="space-y-3">
                {[
                  'Practical implementation techniques',
                  'Industry best practices',
                  'Real-world problem solving',
                  'Expert tips and tricks',
                  'Common pitfalls to avoid'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Trainer Info & Benefits */}
          <div className="p-8 bg-gray-50">
            {/* Trainer Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">About the Trainer</h3>
              <div className="bg-white p-6 rounded-xl border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                    ST
                  </div>
                  <div>
                    <h4 className="font-semibold">Sachit Wadhawan</h4>
                    <p className="text-gray-600 text-sm">Senior Technical Trainer</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.9 (120+ reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Expert trainer with over 8 years of experience in teaching and developing software.
                  Specializes in modern web technologies and best practices.
                </p>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">What You'll Get</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Live Interactive Session</h4>
                      <p className="text-sm text-gray-600">Real-time Q&A and discussions</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Session Recording</h4>
                      <p className="text-sm text-gray-600">Access the recording for 30 days</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Community Access</h4>
                      <p className="text-sm text-gray-600">Join our learning community</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={onEnroll}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <span>Enroll Now for ₹49</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MasterclassDetails;