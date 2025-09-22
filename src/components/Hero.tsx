import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import VideoPlayerOverlay from './VideoPlayerOverlay';
import {
  ArrowRight,
  Users,
  AlertCircle,
  Target,
  Trophy,
  Star,
  Zap,
  Globe,
  Smartphone,
  Database,
  GraduationCap,
  User,
  Briefcase,
  Code,
  Brain,
  Server,
  X,
  Rocket,
  Award,
  Sparkles,
  PlayCircle,
} from 'lucide-react';
import UpcomingClasses from './UpcomingClasses';
import Navigation from './Navigation';

// Project categories with icons
const projectCategories = [
  { id: 'web', name: 'Web Development', icon: <Globe className="w-5 h-5" /> },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 'backend',
    name: 'Backend Systems',
    icon: <Server className="w-5 h-5" />,
  },
  {
    id: 'database',
    name: 'Database Design',
    icon: <Database className="w-5 h-5" />,
  },
  { id: 'fullstack', name: 'Full Stack', icon: <Code className="w-5 h-5" /> },
];

function Hero() {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [userType, setUserType] = useState('student'); // Default selection
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    year: '',
    experience: '',
    message: '',
  });
  const leftFeatures = [
    {
      icon: <Trophy className="h-4 w-4" />,
      title: '95% Success Rate',
      description: 'Industry-recognized certification',
    },
    {
      icon: <Target className="h-4 w-4" />,
      title: 'Focused Learning',
      description: 'Hands-on practical training',
    },
    {
      icon: <Star className="h-4 w-4" />,
      title: 'Expert Mentors',
      description: 'Learn from industry leaders',
    },
  ];

  // User type options
  const userTypeOptions = [
    {
      id: 'student',
      label: 'I am a Student',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'alumni',
      label: 'I am an Alumni (Passout)',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      id: 'experience',
      label: 'I am having less than 3 years of experience',
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  const rightFeatures = [
    {
      icon: <Zap className="h-4 w-4" />,
      title: 'Fast-Track Learning',
      description: 'Complete courses in 8-12 weeks',
    },
    {
      icon: <Rocket className="h-4 w-4" />,
      title: 'Career Growth',
      description: '45% average salary increase',
    },
    {
      icon: <Award className="h-4 w-4" />,
      title: 'Industry Projects',
      description: 'Real-world portfolio building',
    },
  ];

  const handleTrainingClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/courses');
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || selectedProjects.length === 0) {
      setError(
        'Please fill in all required fields and select at least one project interest'
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        user_type: userType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        course: formData.course,
        year: formData.year,
        experience: formData.experience,
        message: formData.message,
        project_interests: selectedProjects,
      };

      const { error } = await supabase
        .from('learn_earn_applications')
        .insert([submissionData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Show success message
      setShowSuccess(true);

      // Close form after showing success message
      setTimeout(() => {
        setShowApplicationForm(false);
        setShowSuccess(false);
      }, 2000);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        university: '',
        course: '',
        year: '',
        experience: '',
        message: '',
      });
      setSelectedProjects([]);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(
        'Failed to submit application. Please try again. Error: ' +
        (err instanceof Error ? err.message : 'Unknown error')
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showApplicationForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showApplicationForm]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fixed Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Main Content Container - Add top padding to account for navigation */}
      <div className="flex-1 flex flex-col pt-[64px]">
        {/* Upcoming Masterclasses Section - Full Width */}
        <div className="w-full bg-[#f5f5f5] border-t border-b border-gray-200 relative z-40">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800 px-8 py-6 min-w-[250px]">
                Upcoming Masterclasses
              </h2>
              <UpcomingClasses />
            </div>
          </div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-[rgb(169,206,206)] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-72 h-72 bg-[rgb(25,155,86)] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000
"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[rgb(172,237,237)] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="flex-1 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0 py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Features */}
              <div className="hidden md:block md:col-span-3 space-y-12">
                {leftFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all max-w-[240px] transform ${index === 0
                        ? '-rotate-6 -translate-x-2'
                        : index === 1
                          ? 'rotate-3 translate-x-4'
                          : '-rotate-6 translate-x-0'
                      }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-[rgb(0,116,116)] p-3 rounded-2xl">
                          {feature.icon}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 ml-14">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center Content */}
              <div className="md:col-span-6 text-center px-4 md:px-0 max-w-3xl mx-auto">
                {/* Trust Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex h-16 items-center bg-white/80 backdrop-blur-lg p-2 md:p-4 rounded-2xl shadow-lg mb-10 mx-auto max-w-fit"
                >
                  <div className="flex mr-4">
                    {['AB', 'SW', 'SS', 'PT'].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + parseInt(index) * 0.1 }}
                        className="w-8 h-8 rounded-full bg-[rgb(46,125,50)] border-2 border-white -ml-2 first:ml-0
                                 flex items-center justify-center text-xs text-white font-medium"
                      >
                        {index}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    Join{' '}
                    <span className="font-bold bg-[rgb(46,125,50)] bg-clip-text text-transparent">
                      300+
                    </span>{' '}
                    developers/students already learning with us
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 bg-clip-text text-[rgb(0,116,116)]
 leading-[1.2] md:leading-[1.2]"
                >
                  Transform Your Team's
                  <br />
                  Programming Skills
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base text-gray-600 mb-12 max-w-xl mx-auto"
                >
                  Empower your developers with industry-leading training
                  programs designed for modern tech stacks. Our expert-led
                  courses ensure your team stays ahead in the ever-evolving tech
                  landscape.
                </motion.p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleTrainingClick}
                    className="group inline-flex items-center px-8 py-4 bg-[rgb(46,125,50)] text-white 
                             rounded-full text-lg hover:bg-gray-800 transition-all duration-300
                             shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Learning
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center px-8 py-4 border-2 border-black/10
                             rounded-full text-lg hover:bg-black/5 transition-all duration-300 text-black"
                    onClick={() => setShowVideoPlayer(true)}
                  >
                    <Users className="mr-2 w-5 h-5" />
                    How it works?
                  </motion.button>
                </div>
              </div>

              {/* Right Features */}
              <div className="hidden md:block md:col-span-3 space-y-12 md:absolute md:right-0">
                {rightFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all max-w-[240px] transform ${index === 0
                        ? 'rotate-6 translate-x-2'
                        : index === 1
                          ? '-rotate-3 translate-x-0'
                          : 'rotate-6 translate-x-4'
                      }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-[rgb(0,116,116)] p-3 rounded-2xl">
                          {feature.icon}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 ml-14">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Overlay */}
        <VideoPlayerOverlay
          isOpen={showVideoPlayer}
          onClose={() => setShowVideoPlayer(false)}
        />

        {/* Learn and Earn Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[rgb(0,116,116)] text-white py-4 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                <h2 className="text-xl font-bold tracking-tight">
                  Learn and Earn with Us
                </h2>
              </div>
              <p className="mt-2 sm:mt-0 text-sm sm:text-base max-w-2xl">
                Develop real-world projects while earning income. A unique
                opportunity for students!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApplicationForm(true)}
                type="button"
                className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[rgb(0,116,116)] bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Application Form Modal */}
        <AnimatePresence>
          {showApplicationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-gray-900 opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={() => setShowApplicationForm(false)}
              />

              {/* Modal Content */}
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`relative inline-block align-bottom bg-white text-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full z-50`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <div className="absolute top-4 right-4 z-50">
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <h3
                          className={`text-2xl leading-6 font-bold text-gray-900 mb-6`}
                        >
                          {showSuccess
                            ? 'Application Submitted!'
                            : 'Student Application Form'}
                        </h3>
                        {showSuccess ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center py-8"
                          >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              Thank you for your application!
                            </h3>
                            <p className="text-gray-600">
                              We'll review your application and get back to you
                              soon.
                            </p>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-6">
                            {/* User Type Radio Group - Redesigned */}
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold mb-4 text-blue-600">
                                Which one describes you best?
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {userTypeOptions.map((option) => (
                                  <div
                                    key={option.id}
                                    onClick={() => setUserType(option.id)}
                                    className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${userType === option.id
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      id={`user-type-${option.id}`}
                                      name="user-type"
                                      value={option.id}
                                      checked={userType === option.id}
                                      onChange={() => setUserType(option.id)}
                                      className="sr-only"
                                    />
                                    <label
                                      htmlFor={`user-type-${option.id}`}
                                      className="block p-4 cursor-pointer"
                                    >
                                      <div className="flex items-center">
                                        <div
                                          className={`mr-3 ${userType === option.id
                                              ? 'text-indigo-600'
                                              : 'text-gray-500'
                                            }`}
                                        >
                                          {option.icon}
                                        </div>
                                        <div>
                                          <span
                                            className={`text-sm font-medium ${userType === option.id
                                                ? 'text-indigo-600'
                                                : 'text-gray-900'
                                              }`}
                                          >
                                            {option.label}
                                          </span>
                                        </div>
                                      </div>
                                    </label>
                                    {userType === option.id && (
                                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Personal Information */}
                              <div>
                                <h4
                                  className={`text-lg font-semibold mb-4 text-blue-600`}
                                >
                                  Personal Information
                                </h4>
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor="name"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      Full Name *
                                    </label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      required
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="email"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      required
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="phone"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      Phone Number *
                                    </label>
                                    <input
                                      type="tel"
                                      id="phone"
                                      name="phone"
                                      required
                                      value={formData.phone}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900' border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Academic Information */}
                              <div>
                                <h4
                                  className={`text-lg font-semibold mb-4 text-blue-600`}
                                >
                                  Academic Information
                                </h4>
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor="university"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      University/College
                                    </label>
                                    <input
                                      type="text"
                                      id="university"
                                      name="university"
                                      value={formData.university}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="course"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      Course/Degree
                                    </label>
                                    <select
                                      id="course"
                                      name="course"
                                      value={formData.course}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                      <option value="">
                                        Select your course
                                      </option>
                                      <option value="btech">B.Tech</option>
                                      <option value="mtech">M.Tech</option>
                                      <option value="bca">BCA</option>
                                      <option value="mca">MCA</option>
                                      <option value="be">BE</option>
                                      <option value="me">ME</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label
                                      htmlFor="year"
                                      className={`block text-sm font-medium text-gray-700`}
                                    >
                                      Year of Study
                                    </label>
                                    <select
                                      id="year"
                                      name="year"
                                      value={formData.year}
                                      onChange={handleInputChange}
                                      className={`mt-1 block w-full h-10 px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                      <option value="">Select year</option>
                                      <option value="1">1st Year</option>
                                      <option value="2">2nd Year</option>
                                      <option value="3">3rd Year</option>
                                      <option value="4">4th Year</option>
                                      <option value="final">Final Year</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {error && (
                              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                              </div>
                            )}

                            {/* Project Interests */}
                            <div>
                              <h4
                                className={`text-lg font-semibold mb-4 text-blue-600`}
                              >
                                Project Interests
                              </h4>
                              <p className={`text-sm text-gray-600 mb-3`}>
                                Select the project categories you're interested
                                in working on (select all that apply):
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {projectCategories.map((category) => (
                                  <div
                                    key={category.id}
                                    onClick={() =>
                                      toggleProjectSelection(category.id)
                                    }
                                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border ${selectedProjects.includes(category.id)
                                        ? 'bg-indigo-100 border-indigo-300'
                                        : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                                      }`}
                                  >
                                    <div
                                      className={`${selectedProjects.includes(category.id)
                                          ? 'text-indigo-500'
                                          : 'text-gray-600'
                                        }`}
                                    >
                                      {category.icon}
                                    </div>
                                    <span
                                      className={`text-sm font-medium ${selectedProjects.includes(category.id)
                                          ? 'text-indigo-700'
                                          : 'text-gray-700'
                                        }`}
                                    >
                                      {category.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="experience"
                                  className={`block text-sm font-medium text-gray-700`}
                                >
                                  Relevant Experience
                                </label>
                                <textarea
                                  id="experience"
                                  name="experience"
                                  rows={3}
                                  value={formData.experience}
                                  onChange={handleInputChange}
                                  className={`mt-1 block w-full px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                  placeholder="Briefly describe any relevant experience or skills you have"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="message"
                                  className={`block text-sm font-medium text-gray-700`}
                                >
                                  Why do you want to join? (Optional)
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  rows={3}
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  className={`mt-1 block w-full px-3 py-2 text-base rounded-md border-gray-300 text-gray-900 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                                  placeholder="Tell us why you're interested in this opportunity"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setShowApplicationForm(false)}
                                className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors`}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmitting ? (
                                  <>
                                    <span className="opacity-0">
                                      Submit Application
                                    </span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.3s]" />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.5s]" />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  'Submit Application'
                                )}
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Add these animations to your global CSS
const style = document.createElement('style');
style.textContent = `
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
`;
document.head.appendChild(style);

export default Hero;
