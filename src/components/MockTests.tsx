import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Brain,
  CheckCircle,
  Clock,
  ArrowRight,
  Target,
  Trophy,
  Users,
} from 'lucide-react';

function MockTests() {
  const navigate = useNavigate();

  const mockTests = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description:
        'Test your knowledge in HTML, CSS, JavaScript, and modern frontend frameworks.',
      icon: <Brain className="w-6 h-6" />,
      stats: {
        questions: '50+',
        duration: '60 min',
        participants: '1.2k+',
      },
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description:
        'Evaluate your skills in server-side programming, databases, and API design.',
      icon: <Target className="w-6 h-6" />,
      stats: {
        questions: '45+',
        duration: '60 min',
        participants: '980+',
      },
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description:
        'Comprehensive assessment of both frontend and backend development skills.',
      icon: <Trophy className="w-6 h-6" />,
      stats: {
        questions: '75+',
        duration: '90 min',
        participants: '750+',
      },
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const handleTestClick = (testId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/mock-test/${testId}`);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Animated Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-[128px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="p-2 bg-purple-100 rounded-xl">
              <CheckCircle className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-purple-500">
              Practice Tests
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900">
            Test Your Skills
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Challenge yourself with our comprehensive mock tests and get instant
            feedback on your progress
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/mock-tests"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
              rounded-full text-lg hover:bg-gray-800 transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Mock Tests
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                onClick={() => handleTestClick(test.id)}
                className="cursor-pointer relative bg-white rounded-2xl p-8 h-[380px] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Decorative Elements */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl group-hover:w-16 group-hover:h-16 transition-all duration-500" />

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${test.gradient} text-white transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {test.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {test.title}
                </h3>
                <p className="text-gray-600 mb-6">{test.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {test.stats.questions}
                    </div>
                    <div className="text-xs text-gray-500">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {test.stats.duration}
                    </div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {test.stats.participants}
                    </div>
                    <div className="text-xs text-gray-500">Attempts</div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Start anytime</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-2 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-purple-500" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MockTests;
