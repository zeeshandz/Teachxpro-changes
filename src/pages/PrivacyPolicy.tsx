import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';

function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are committed to protecting your privacy and ensuring the
              security of your personal information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Course enrollment details</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </motion.div>

          {/* Data Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">How We Use Your Data</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing and improving our services</li>
                <li>Processing payments and enrollments</li>
                <li>Communicating about courses and updates</li>
                <li>Personalizing your learning experience</li>
                <li>Analyzing and improving our platform</li>
              </ul>
            </div>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Data Protection</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                We implement appropriate technical and organizational measures
                to ensure the security of your personal data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
                <li>Regular backup procedures</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our privacy policy or how we
              handle your data, please contact us at:
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

export default PrivacyPolicy;
