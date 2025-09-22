import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function StudentHub() {
  const navigate = useNavigate();

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
              Student Resources Hub
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Access comprehensive project reports and source code examples to
              accelerate your learning journey. Our resources are designed to
              help you excel in your academic projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Project Reports Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => navigate('/student-hub/projects')}
          >
            <div className="bg-white rounded-xl overflow-hidden border border-black/5 hover:border-black/10 transition-all duration-300 h-full p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-black/5 rounded-xl">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Project Reports</h3>
                  <p className="text-gray-600 text-sm">
                    Access detailed project documentation
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-base">
                Browse our collection of comprehensive project reports,
                including system designs, documentation, and implementation
                details for various domains.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Documentation
                </span>
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  System Design
                </span>
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Architecture
                </span>
              </div>
            </div>
          </motion.div>

          {/* Source Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group cursor-pointer"
            onClick={() => navigate('/student-hub/source-code')}
          >
            <div className="bg-white rounded-xl overflow-hidden border border-black/5 hover:border-black/10 transition-all duration-300 h-full p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-black/5 rounded-xl">
                  <Code2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Source Code</h3>
                  <p className="text-gray-600 text-sm">
                    Explore implementation examples
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-base">
                Get access to well-structured source code examples across
                different technologies and frameworks, complete with comments
                and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Code Examples
                </span>
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Best Practices
                </span>
                <span className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Implementation
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudentHub;
