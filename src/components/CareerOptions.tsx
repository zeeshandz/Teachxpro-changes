import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ArrowRight,
  Building2,
  Users2,
  TrendingUp,
  Rocket,
  GraduationCap,
} from 'lucide-react';

function CareerOptions() {
  const careers = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description:
        'Build beautiful user interfaces and create engaging web experiences.',
      icon: <Rocket className="w-6 h-6" />,
      stats: {
        companies: '2000+',
        avgSalary: '₹8-15 LPA',
        growth: '25%',
      },
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      description:
        'Design and implement scalable server-side applications and APIs.',
      icon: <TrendingUp className="w-6 h-6" />,
      stats: {
        companies: '1800+',
        avgSalary: '₹10-18 LPA',
        growth: '30%',
      },
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description:
        'Master both frontend and backend development for complete solutions.',
      icon: <GraduationCap className="w-6 h-6" />,
      stats: {
        companies: '2500+',
        avgSalary: '₹12-20 LPA',
        growth: '35%',
      },
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />

      {/* Animated Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full filter blur-[128px]"
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
            <div className="p-2 bg-[rgb(0,116,116)] -100 rounded-xl">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[rgb(0,116,116)]">
              Career Paths
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900">
            Explore Career Options
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover high-growth career paths in tech and find your perfect role
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="cursor-pointer relative bg-white rounded-2xl p-8 h-[420px] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Decorative Elements */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgb(0,116,116)] to-[rgb(46,125,50)] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl group-hover:w-16 group-hover:h-16 transition-all duration-500" />

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${career.gradient} text-white transform transition-transform group-hover:scale-110 group-hover:rotate-3`}
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
                    {career.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[rgb(0,116,116)] transition-colors">
                  {career.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {career.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        {career.stats.companies}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {career.stats.avgSalary}
                    </div>
                    <div className="text-xs text-gray-500">Avg. Salary</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <div className="text-sm font-medium text-gray-900">
                        {career.stats.growth}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">YoY Growth</div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users2 className="w-4 h-4" />
                    <span>High Demand</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="p-2 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-[rgb(0,116,116)]" />
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

export default CareerOptions;
