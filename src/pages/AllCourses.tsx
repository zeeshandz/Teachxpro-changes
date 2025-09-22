import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Star,
  Users,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { courseData } from '../data/courses';
import { getImageUrl } from '../lib/supabase';

interface CoursePrice {
  original: string;
  offer: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: CoursePrice;
  image: string;
  tags: string[];
  highlights: string[];
}

function AllCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [courseImages, setCourseImages] = useState<Record<string, string>>({});

  const courses = Object.entries(courseData).map(([id, course]) => ({
    id,
    ...course,
  })) as Course[];

  // Find the highest rated courses (rating >= 4.8)
  const topRatedCourses = new Set(
    courses.filter((course) => course.rating >= 4.8).map((course) => course.id)
  );

  // useEffect(() => {
  //   const loadCourseImages = async () => {
  //     const images: Record<string, string> = {};
  //     for (const course of courses) {
  //       images[course.id] = await getImageUrl(course.id);
  //     }
  //     setCourseImages(images);
  //   };

  //   loadCourseImages();
  // }, [courses]);

  // Calculate progress percentage based on enrollment (assuming max capacity of 500)
  const getEnrollmentProgress = (students: number) => {
    const maxCapacity = 500;
    return Math.min((students / maxCapacity) * 100, 100);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === 'all' || course.level === selectedLevel;
    const matchesDuration =
      selectedDuration === 'all' ||
      (selectedDuration === 'short' && parseInt(course.duration) <= 8) ||
      (selectedDuration === 'medium' &&
        parseInt(course.duration) > 8 &&
        parseInt(course.duration) <= 10) ||
      (selectedDuration === 'long' && parseInt(course.duration) > 10);

    return matchesSearch && matchesLevel && matchesDuration;
  });

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

      {/* Hero Section with Background */}
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-[1.2] md:leading-[1.2]">
              All Training Courses
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our extensive selection of professional development
              courses designed to enhance your skills, advance your career, and
              keep you ahead in your industry.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 border-b z-50 backdrop-blur-xl bg-white/90">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-500" />

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="all">All Durations</option>
                <option value="short">8 weeks or less</option>
                <option value="medium">9-10 weeks</option>
                <option value="long">11+ weeks</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCourse(course.id)}
              onHoverEnd={() => setHoveredCourse(null)}
              className="group relative"
            >
              <Link to={`/course/${course.id}`}>
                <div className="cursor-pointer relative bg-white rounded-2xl overflow-hidden border-2 border-black/5 hover:border-blue-500/20 transition-all duration-300 shadow-sm hover:shadow-xl h-[520px] flex flex-col">
                  {/* Decorative Elements */}
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
                  <div className="absolute -left-8 -bottom-8 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
                    <motion.div
                      className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] hover:bg-[length:200%_200%] transition-all duration-500"
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
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {course.rating}
                        </span>
                      </div>
                      {topRatedCourses.has(course.id) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: hoveredCourse === course.id ? 1 : 0,
                            y: hoveredCourse === course.id ? 0 : 10,
                          }}
                          className="bg-green-500/95 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-sm"
                        >
                          Most Popular
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom Tags */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-xs text-white font-medium shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
                        {course.title}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: hoveredCourse === course.id ? 45 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      </motion.div>
                    </div>

                    {/* Course Highlights */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {course.highlights?.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-sm text-gray-600"
                        >
                          <Sparkles className="h-4 w-4 text-blue-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{course.duration} weeks</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {course.students}+ enrolled
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm line-through text-gray-500 mr-2">
                          {course.price.original}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {course.price.offer}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: '0%' }}
                          animate={{
                            width:
                              hoveredCourse === course.id
                                ? `${getEnrollmentProgress(course.students)}%`
                                : `${
                                    getEnrollmentProgress(course.students) - 10
                                  }%`,
                          }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-right">
                        {Math.round(getEnrollmentProgress(course.students))}%
                        Filled
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCourse === course.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default AllCourses;
