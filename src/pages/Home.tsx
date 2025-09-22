import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Courses from '../components/Courses';
import StudentBoard from '../components/StudentBoard';
import Testimonials from '../components/Testimonials';
import CareerOptions from '../components/CareerOptions';
import CTA from '../components/CTA';
import SupportChat from '../components/SupportChat';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  FileText, 
  MoreHorizontal,
  ArrowRight 
} from 'lucide-react';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Set loading to false after components are mounted
    setIsLoading(false);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isLoading) {
    return <Loader text="Loading Home..." />;
  }

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      {/* Global Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none" />
      
      <div className="relative">
        <Hero />
        <Features />
        
        {/* What We Do Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-[128px]"
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
                <div className="p-2 bg-[rgb(0,116,116)] rounded-xl">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[rgb(0,116,116)]
">
                  Our Services
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 leading-[1.2] md:leading-[1.2]">
                What
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Empowering students and professionals with comprehensive learning and career development solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Internships",
                  description: "Gain real-world experience through our industry-aligned internship programs",
                  icon: <Briefcase className="w-6 h-6" />,
                  link: "/internships",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Trainings",
                  description: "Comprehensive training programs designed for career success",
                  icon: <GraduationCap className="w-6 h-6" />,
                  link: "/courses",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Hackathons",
                  description: "Participate in exciting coding competitions and showcase your skills",
                  icon: <Code2 className="w-6 h-6" />,
                  link: "/hackathon-fest",
                  color: "from-pink-500 to-pink-600"
                },
                {
                  title: "Projects",
                  description: "Explore our portfolio of innovative projects and success stories",
                  icon: <FolderGit2 className="w-6 h-6" />,
                  link: "/our-projects",
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Resume Services",
                  description: "Create professional resumes that stand out to employers",
                  icon: <FileText className="w-6 h-6" />,
                  link: "/resume-maker",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  title: "Other Services",
                  description: "Discover additional services to boost your career",
                  icon: <MoreHorizontal className="w-6 h-6" />,
                  link: "/services",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link to={service.link} className="block">
                    <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" 
                           style={{ backgroundImage: `linear-gradient(to right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` }} />
                      
                      <div className="relative">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} mb-6 inline-block`}>
                          <div className="text-white">{service.icon}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[rgb(0,116,116)] transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center text-[rgb(0,116,116)] font-semibold group-hover:translate-x-2 transition-transform">
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Courses />
        <StudentBoard />
        <Testimonials />
        <CareerOptions />
        <CTA />
        <SupportChat />
      </div>
    </div>
  );
}

export default Home;
