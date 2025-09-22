import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StudentBoard() {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/student-board/study-tools');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

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
            <div className="p-2 bg-[rgb(0,116,116)] rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[rgb(0,116,116)]">
              Student Board
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 leading-[1.2] md:leading-[1.2]">
            Your Learning Hub
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Transform your study materials into interactive learning tools with AI
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div
              onClick={handleClick}
              className="cursor-pointer relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative Elements */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgb(0,116,116)] to-[rgb(46,125,50)] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl group-hover:w-16 group-hover:h-16 transition-all duration-500" />

              <div className="flex items-center gap-6">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[rgb(0,116,116)] transition-colors">
                    Study Tools
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Transform your content into quizzes, flashcards, summaries, and smart notes using AI
                  </p>
                  
                  {/* Action */}
                  <div className="flex items-center gap-2 text-[rgb(0,116,116)]">
                    <span className="font-medium">Get Started</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-2 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default StudentBoard; 