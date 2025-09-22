import React, { useEffect, useState } from 'react';
import {
  Calendar,
  BookOpen,
  Star,
  Users,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '../lib/supabase';

function Courses() {
  const navigate = useNavigate();
  const [courseImages, setCourseImages] = useState<Record<string, string>>({});
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadCourseImages = async () => {
  //     const images: Record<string, string> = {};
  //     for (const course of courses) {
  //       images[course.id] = await getImageUrl(course.id);
  //     }
  //     console.log(images);
  //     setCourseImages(images);
  //   };

  //   loadCourseImages();
  // }, []);

  const handleCourseClick = (courseId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/course/${courseId}`);
  };

  const courses = [
    {
      id: 'full-stack-development',
      title: 'Full-Stack Development',
      duration: '12 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 234,
      price: {
        original: '₹17,499',
        offer: '₹11,599',
      },
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB'],
      highlights: ['24/7 Support', 'Real Projects', 'Job Ready'],
    },
    {
      id: 'mobile-application-development',
      title: 'Mobile App Development',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 4.8,
      students: 189,
      price: {
        original: '₹16,999',
        offer: '₹11,299',
      },
      image:
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
      tags: ['React Native', 'iOS', 'Android'],
      highlights: ['Industry Expert', 'Live Sessions', 'Certification'],
    },
    {
      id: 'rad-react-supabase',
      title: 'Web App Development',
      duration: '10 weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 312,
      price: {
        original: '₹15,499',
        offer: '₹8,999',
      },
      image:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      tags: ['HTML/CSS', 'JavaScript', 'React'],
      highlights: ['Beginner Friendly', 'Project Based', 'Career Support'],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="courses">
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
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[rgb(0,116,116)]">
              Our Courses
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 leading-[1.2] md:leading-[1.2]">
            Popular Training Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Master the skills that matter in today's tech landscape with our
            industry-leading courses
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/courses"
              className="group inline-flex items-center px-8 py-4 bg-[rgb(46,125,50)] text-white 
              rounded-full text-lg hover:bg-gray-800 transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Courses
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCourse(course.id)}
              onHoverEnd={() => setHoveredCourse(null)}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                onClick={() => handleCourseClick(course.id)}
                className="cursor-pointer relative bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-blue-500/20 
                         transition-all duration-300 shadow-lg hover:shadow-xl h-[520px] flex flex-col"
              >
                {/* Decorative Elements */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgb(0,116,116)] to-[rgb(46,125,50)] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:w-24 group-hover:h-24 transition-all duration-500" />

                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
                  <motion.div
                    className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%]"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  />
                  <motion.img
                    src={courseImages[course.id] || course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredCourse === course.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />

                  {/* Top Tags */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg"
                    >
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {course.rating}
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredCourse === course.id ? 1 : 0,
                        y: hoveredCourse === course.id ? 0 : 10,
                      }}
                      className="bg-[rgb(46,125,50)] text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm shadow-lg"
                    >
                      Most Popular
                    </motion.div>
                  </div>

                  {/* Bottom Tags */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-xs text-white font-medium shadow-lg"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[rgb(0,116,116)] transition-colors">
                      {course.title}
                    </h3>
                    <motion.div
                      animate={{ rotate: hoveredCourse === course.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors"
                    >
                      <ArrowUpRight className="h-5 w-5 text-[rgb(0,116,116)]" />
                    </motion.div>
                  </div>

                  {/* Course Highlights */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {course.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                          <Sparkles className="h-4 w-4 text-[rgb(0,116,116)]" />
                        </div>
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="p-1.5 rounded-lg bg-gray-50">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{course.duration}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="p-1.5 rounded-lg bg-gray-50">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{course.level}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="p-1.5 rounded-lg bg-gray-50">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="text-sm">
                        {course.students}+ enrolled
                      </span>
                    </motion.div>
                    <motion.div
                      className="text-right"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="text-sm line-through text-gray-500 mr-2">
                        {course.price.original}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {course.price.offer}
                      </span>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-auto">
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: '0%' }}
                        animate={{
                          width: hoveredCourse === course.id ? '85%' : '65%',
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      85% Filled
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
