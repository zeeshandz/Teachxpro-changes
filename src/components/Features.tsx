import React from 'react';
import { motion } from 'framer-motion';
import {
  Laptop,
  Award,
  Users,
  Sparkles,
  GraduationCap,
  Target,
} from 'lucide-react';

function Features() {
  const features = [
    {
      icon: <Laptop className="h-8 w-8" />,
      title: 'Hands-on Learning',
      description:
        'Practice-based curriculum with real-world projects and exercises.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Industry Certification',
      description:
        'Recognized certifications upon successful completion of courses.',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Expert Instructors',
      description:
        'Learn from experienced professionals with proven track records.',
      gradient: 'from-amber-500 to-orange-500',
      delay: 0.3,
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Career-Focused',
      description:
        'Curriculum designed to meet industry demands and standards.',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.4,
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Structured Learning',
      description: 'Well-organized modules with clear learning objectives.',
      gradient: 'from-red-500 to-rose-500',
      delay: 0.5,
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Interactive Sessions',
      description:
        'Engaging live sessions and collaborative learning environment.',
      gradient: 'from-violet-500 to-purple-500',
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 relative overflow-hidden" id="benefits">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
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
            <div className="p-2 bg-[rgb(0,116,116)]
 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[rgb(0,116,116)]">
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900">
            Benefits That Make Us Stand Out
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover why our training programs are the perfect choice for your
            career growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Decorative Elements */}
              <div className="absolute -inset-0 bg-gradient-to-br from-[rgb(46,125,50)] to-[rgb(0,116,116)] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:w-16 group-hover:h-16 transition-all duration-500" />

              {/* Icon Container */}
              <div
                className={`relative w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.gradient} text-white transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
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
                  {React.cloneElement(feature.icon, { className: 'h-6 w-6' })}
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[rgb(0,116,116)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[rgb(0,116,116)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
