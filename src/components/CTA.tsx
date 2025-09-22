import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Trophy, ArrowRight, Sparkles } from 'lucide-react';

function CTA() {
  const navigate = useNavigate();

  const handleConsultantClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/consultants');
  };

  const handleTrainingClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/courses');
  };

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      stat: '300+',
      label: 'Trained Developers',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      stat: '95%',
      label: 'Success Rate',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      stat: '50+',
      label: 'Partner Companies',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[rgb(0,116,116)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-[128px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, 0],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-[128px]"
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center relative group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <motion.div
                      className="flex justify-center mb-4"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-4xl font-bold mb-2">{item.stat}</div>
                    <div className="text-sm text-white/80">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-6 left-1/2 -translate-x-1/2"
              >
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              >
                Ready to Level Up Your
                <br />
                Team's Skills?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/90 max-w-2xl mx-auto mb-12"
              >
                Join hundreds of companies that trust us with their technical
                training needs. Our expert-led programs deliver measurable
                results and real-world skills.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrainingClick}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 
                           rounded-xl text-lg font-semibold hover:bg-opacity-95 transition-all
                           shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                >
                  Start Training Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConsultantClick}
                  className="inline-flex items-center justify-center px-8 py-4 
                           border-2 border-white/20 backdrop-blur-sm text-white rounded-xl text-lg font-semibold
                           hover:bg-white/10 transition-all"
                >
                  Schedule Consultation
                </motion.button>
              </div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-12 border-t border-white/10"
            >
              <p className="text-sm text-white mb-6">
                Trusted by leading companies worldwide
              </p>
              <div className="flex justify-center items-center gap-12">
                {['Google', 'Microsoft', 'Amazon', 'Meta'].map(
                  (company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-white font-semibold text-xl hover:text-white/60 transition-colors cursor-pointer"
                    >
                      {company}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
