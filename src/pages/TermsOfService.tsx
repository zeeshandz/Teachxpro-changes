import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, FileText, AlertCircle } from 'lucide-react';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-white hover:opacity-80">
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
            Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Agreement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Agreement to Terms</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                By accessing or using Training Pro's services, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree
                with any of these terms, you are prohibited from using or accessing our services.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of
                our platform following any changes indicates your acceptance of those changes.
              </p>
            </div>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">User Responsibilities</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>As a user of our platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not share account credentials</li>
                <li>Comply with all applicable laws</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </motion.div>

          {/* Course Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Course Policies</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-lg font-semibold mb-2">Enrollment and Payment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Course fees must be paid in full before access is granted</li>
                  <li>Refunds are available within 7 days of purchase</li>
                  <li>Course access is non-transferable</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Content Usage</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Course materials are for personal use only</li>
                  <li>Sharing or redistributing content is prohibited</li>
                  <li>Copyright and intellectual property rights must be respected</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="mb-4">
              If you have any questions about these terms, please contact our legal team at:
            </p>
            <div className="space-y-2">
              <p>Email: contact@teachxpro.com</p>
              <p>Phone: +91 8700944131</p>
              <p>Address: Office No. 101, D-60, Sector-63, Noida</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;