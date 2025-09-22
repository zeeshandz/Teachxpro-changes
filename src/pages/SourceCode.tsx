import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Code2,
  Search as SearchIcon,
  Filter,
  ExternalLink,
  X,
  Video,
  FileText,
} from 'lucide-react';

interface Project {
  id: number;
  type: 'video' | 'article';
  title: string;
  category: string[];
  tech: string[];
  datePublished: string;
  source: string;
  projectURL: string;
}

const categories = [
  { id: 'all', name: 'All Projects', icon: Code2 },
  { id: 'web-dev', name: 'Web Development', icon: Code2 },
  { id: 'mobile-dev', name: 'Mobile Development', icon: Code2 },
  { id: 'ai-ml', name: 'AI/ML', icon: Code2 },
];

// Import projects from JSON
import projectsData from '../data/projects.json';

function SourceCode() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Use projects from JSON
  const projects: Project[] = projectsData.map((project) => ({
    id: project.id,
    type: project.type as 'video' | 'article',
    title: project.title,
    category: Array.isArray(project.category)
      ? project.category
      : [project.category],
    tech: project.tech,
    datePublished: project.datePublished,
    source: project.source || '',
    projectURL: project.projectURL,
  }));

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || project.category.includes(selectedCategory);
    const matchesTech =
      selectedTech.length === 0 ||
      project.tech.some((tech) => selectedTech.includes(tech));
    return matchesSearch && matchesCategory && matchesTech;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTech([]);
    setSearchTerm('');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/student-hub"
            className="inline-flex items-center text-white hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Student Hub
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
              Open Source Projects
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our collection of open-source projects with complete
              source code, documentation, and live demos. Perfect for learning
              and building your portfolio.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 bg-white border-b z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.a
              href={project.projectURL}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm flex flex-col"
            >
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600" />
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {project.type === 'video' ? (
                      <Video className="h-5 w-5 text-gray-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-600" />
                    )}
                    <span className="text-sm text-gray-600 capitalize">
                      {project.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Published</span>
                  <span>{formatDate(project.datePublished)}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SourceCode;
