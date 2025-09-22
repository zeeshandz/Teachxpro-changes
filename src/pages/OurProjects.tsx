import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Globe,
  ArrowLeft,
  ExternalLink,
  Users,
  Calendar,
  Star,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  type: 'mobile' | 'web';
  stack: string[];
  description: string;
  image: string;
  clientTestimonial: string;
  clientName: string;
  clientRole: string;
  completionDate: string;
  teamSize: number;
  demoUrl: string;
  rating: number;
  status: 'live' | 'offline';
}

const projects: Project[] = [
  {
    id: '1',
    name: 'HealthTrack Pro',
    type: 'mobile',
    stack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    description:
      'A comprehensive health tracking application developed for a healthcare startup. Features include real-time health monitoring, appointment scheduling, and medication reminders.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    clientTestimonial:
      "The HealthTrack Pro app has revolutionized how we manage patient care. The team's expertise in mobile development was evident throughout the project.",
    clientName: 'Dr. Sarah Chen',
    clientRole: 'CTO, HealthCare Solutions',
    completionDate: 'December 2023',
    teamSize: 8,
    demoUrl: 'https://healthtrackpro.demo',
    rating: 4.9,
    status: 'live',
  },
  {
    id: '2',
    name: 'EduLearn Platform',
    type: 'web',
    stack: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    description:
      'An interactive e-learning platform built for a leading education institute. Includes live classroom features, course management, and student progress tracking.',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    clientTestimonial:
      'The e-learning platform exceeded our expectations. It has made remote learning seamless for our students and teachers.',
    clientName: 'Michael Thompson',
    clientRole: 'Director of Education, EduTech Institute',
    completionDate: 'October 2023',
    teamSize: 12,
    demoUrl: 'https://edulearn.demo',
    rating: 4.8,
    status: 'live',
  },
  {
    id: '3',
    name: 'SmartRetail POS',
    type: 'web',
    stack: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    description:
      'Modern point-of-sale system developed for a retail chain. Features inventory management, sales analytics, and real-time order processing.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    clientTestimonial:
      'The new POS system has significantly improved our operational efficiency. The real-time analytics have been invaluable for decision-making.',
    clientName: 'Lisa Rodriguez',
    clientRole: 'Operations Manager, RetailCo',
    completionDate: 'January 2024',
    teamSize: 6,
    demoUrl: 'https://smartretail.demo',
    rating: 4.7,
    status: 'offline',
  },
  {
    id: '4',
    name: 'FitConnect',
    type: 'mobile',
    stack: ['React Native', 'GraphQL', 'AWS', 'TypeScript'],
    description:
      'A fitness social networking app that connects trainers with clients. Includes workout tracking, meal planning, and progress sharing features.',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    clientTestimonial:
      "FitConnect has transformed how we engage with our clients. The app's features and user experience are exactly what we needed.",
    clientName: 'James Wilson',
    clientRole: 'Founder, FitLife Gyms',
    completionDate: 'November 2023',
    teamSize: 10,
    demoUrl: 'https://fitconnect.demo',
    rating: 4.6,
    status: 'live',
  },
];

function OurProjects() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStack, setSelectedStack] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const uniqueStacks = useMemo(() => {
    const stacks = new Set<string>();
    projects.forEach((project) =>
      project.stack.forEach((tech) => stacks.add(tech))
    );
    return Array.from(stacks);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = selectedType === 'all' || project.type === selectedType;
      const stackMatch =
        selectedStack === 'all' || project.stack.includes(selectedStack);
      const statusMatch =
        selectedStatus === 'all' || project.status === selectedStatus;
      return typeMatch && stackMatch && statusMatch;
    });
  }, [selectedType, selectedStack, selectedStatus]);

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Our Success Stories
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover how we've helped businesses transform their ideas into
              powerful digital solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Types</option>
              <option value="mobile">Mobile</option>
              <option value="web">Web</option>
            </select>

            <select
              value={selectedStack}
              onChange={(e) => setSelectedStack(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Technologies</option>
              {uniqueStacks.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Status</option>
              <option value="live">Live</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm flex flex-col"
            >
              <div className="h-1 w-full bg-black" />

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className={`absolute inset-0 ${
                    project.type === 'mobile'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white rounded-lg transform -rotate-12" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {project.type === 'mobile' ? (
                        <div className="w-20 h-32 border-4 border-white rounded-2xl" />
                      ) : (
                        <div className="w-40 h-24 border-4 border-white rounded-lg" />
                      )}
                    </div>
                    {/* Grid Pattern */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                      }}
                    />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {project.type === 'mobile' ? (
                        <Smartphone className="h-5 w-5 text-white" />
                      ) : (
                        <Globe className="h-5 w-5 text-white" />
                      )}
                      <span className="text-sm font-medium text-white capitalize">
                        {project.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 fill-current text-yellow-300" />
                      <span className="text-sm font-medium text-white">
                        {project.rating}
                      </span>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute inset-0 pointer-events-none">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <div
                        key={i}
                        className="absolute w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                        style={{
                          top: `${45 + i * 15}%`,
                          left: `${20 + i * 25}%`,
                          transform: `rotate(${-5 + i * 5}deg)`,
                          animation: `float ${
                            2 + i * 0.5
                          }s ease-in-out infinite alternate`,
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {tech.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {project.name}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'live'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.completionDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{project.teamSize} Team Members</span>
                  </div>
                </div>

                {/* Testimonial Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <blockquote className="text-sm text-gray-600 italic mb-3">
                    "
                    {project.clientTestimonial.length > 100
                      ? project.clientTestimonial.substring(0, 100) + '...'
                      : project.clientTestimonial}
                    "
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {project.clientName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {project.clientRole}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">View Live Demo</span>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add animation keyframes to your existing styles */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(var(--rotation, 0deg));
          }
          100% {
            transform: translateY(-10px) rotate(var(--rotation, 0deg));
          }
        }
      `}</style>
    </div>
  );
}

export default OurProjects;
