import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Clock,
  Users,
  FileText,
  Brain,
  Database,
  Code2,
  Server,
  Cloud,
  Table,
  Bot,
  Lightbulb,
  Smartphone,
  Blocks,
  ArrowRight,
} from 'lucide-react';
import { mockTests } from '../data/mockTests';

function AllMockTests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('ai')) return Brain;
    if (title.toLowerCase().includes('data')) return Database;
    if (title.toLowerCase().includes('cloud')) return Cloud;
    if (title.toLowerCase().includes('react')) return Code2;
    if (title.toLowerCase().includes('spring')) return Server;
    if (title.toLowerCase().includes('excel')) return Table;
    if (title.toLowerCase().includes('chatbot')) return Bot;
    if (title.toLowerCase().includes('prompt')) return Lightbulb;
    if (title.toLowerCase().includes('mobile')) return Smartphone;
    return Blocks;
  };

  const filteredTests = mockTests.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Hero Section */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
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
              Mock Tests
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Challenge yourself with our comprehensive mock tests and get instant
              feedback on your progress.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 bg-white border-b z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mock tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, index) => {
            const Icon = getIcon(test.title);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm flex flex-col"
              >
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {test.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 text-sm line-clamp-2">
                    {test.shortDescription}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {test.numberOfQuestions}
                      </div>
                      <div className="text-xs text-gray-500">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {test.duration}
                      </div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {test.Attempts}+
                      </div>
                      <div className="text-xs text-gray-500">Attempts</div>
                    </div>
                  </div>

                  <Link
                    to={`/mock-test/${test.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">Start Test</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-2 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-600" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllMockTests;