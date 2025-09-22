import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Code2,
  BookOpen,
  Users,
  MessageSquare,
  Target,
  Award,
  Briefcase,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    id: '1',
    title: 'Career Counseling',
    description: 'Get personalized guidance to shape your career path and make informed decisions about your future.',
    icon: <Target className="w-6 h-6" />,
    features: [
      'One-on-one career assessment',
      'Industry trend analysis',
      'Skill gap identification',
      'Career roadmap planning'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    title: 'Mentorship Program',
    description: 'Connect with industry experts who will guide you through your learning journey and career development.',
    icon: <Users className="w-6 h-6" />,
    features: [
      'Industry expert mentors',
      'Regular progress reviews',
      'Networking opportunities',
      'Career guidance'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '3',
    title: 'Interview Preparation',
    description: 'Master the art of technical and behavioral interviews with our comprehensive preparation program.',
    icon: <MessageSquare className="w-6 h-6" />,
    features: [
      'Mock interviews',
      'Technical assessment',
      'Behavioral training',
      'Feedback sessions'
    ],
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: '4',
    title: 'Certification Programs',
    description: 'Earn industry-recognized certifications to validate your skills and boost your career prospects.',
    icon: <Award className="w-6 h-6" />,
    features: [
      'Industry-standard certifications',
      'Skill validation',
      'Portfolio building',
      'Career advancement'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: '5',
    title: 'Project Development',
    description: 'Work on real-world projects to build your portfolio and gain practical experience.',
    icon: <Code2 className="w-6 h-6" />,
    features: [
      'Industry projects',
      'Team collaboration',
      'Code reviews',
      'Best practices'
    ],
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: '6',
    title: 'Job Placement Support',
    description: 'Get assistance in finding the right job opportunities and preparing for the application process.',
    icon: <Briefcase className="w-6 h-6" />,
    features: [
      'Job search assistance',
      'Resume optimization',
      'Application tracking',
      'Interview scheduling'
    ],
    color: 'from-indigo-500 to-indigo-600'
  }
];

function Services() {
  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80"
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
              Additional Services
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive support services to accelerate your career growth
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                
                <div className="relative">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} mb-6 inline-block`}>
                    <div className="text-white">{service.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-1">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services; 