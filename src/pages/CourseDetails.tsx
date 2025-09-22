import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  BookOpen,
  Clock,
  ArrowLeft,
  GraduationCap,
  Users,
  Code2,
  CheckCircle2,
  Star,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnrollmentForm from '../components/EnrollmentForm';
import { courseData } from '../data/courses';
import SkillsAndTools from '../components/SkillsAndTools';
import CourseReviews from '../components/CourseReviews';

function CourseDetails() {
  const { id } = useParams();
  const course = courseData[id as keyof typeof courseData];
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Course not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleEnrollClick = () => {
    if (!course) return;

    // Extract price from string (e.g., "₹1,999" -> 1999)
    const price = parseInt(course.price.offer.replace(/[^\d]/g, ''));

    setShowEnrollmentForm(true);
  };

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
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="relative max-w-[1400px] mx-auto px-6">
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
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-[1.2] md:leading-[1.2]">
              {course.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8 mt-4">
              <div className="flex-1 min-w-[240px] max-w-[300px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-base font-medium text-white">
                      {course.duration}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[240px] max-w-[300px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Rating</div>
                    <div className="text-base font-medium text-white">
                      {course.rating}
                      <span className="text-gray-400">/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[240px] max-w-[300px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Students</div>
                    <div className="text-base font-medium text-white">
                      {course.students}
                      <span className="text-gray-400">+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[240px] max-w-[300px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Next Batch</div>
                    <div className="text-base font-medium text-white">
                      {course.nextStart}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleEnrollClick}
              className="group inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full
                       text-base font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 mb-10"
            >
              <span>
                Enroll Now for{' '}
                <span className="text-white/60 line-through mr-2">
                  {course.price.original}
                </span>
                <span className="text-green-400 font-semibold">
                  {course.price.offer}
                </span>
              </span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column - Course Highlights */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Course Highlights</h2>
              <div className="space-y-4">
                {course.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-white rounded-xl shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Course Modules */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer
            transition-all duration-300 ${index > 0 ? 'blur-[4px]' : ''}
            ${activeModule === index ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setActiveModule(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">
                          Week {module.week}: {module.title}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">{module.duration}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{module.description}</p>

                      <div className="grid md:grid-cols-2 gap-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <Code2 className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Reviews */}
      <CourseReviews />

      {/* Skills and Tools Section */}
      <SkillsAndTools skills={course.skills} />

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <EnrollmentForm
          courseName={course.title}
          courseId={id as string}
          coursePrice={parseInt(course.price.offer.replace(/[^\d]/g, ''))}
          onClose={() => setShowEnrollmentForm(false)}
        />
      )}
    </div>
  );
}

export default CourseDetails;
