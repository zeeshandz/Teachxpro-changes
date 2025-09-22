import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Clock, Globe, Laptop } from 'lucide-react';

function ShippingDelivery() {
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
              Digital Delivery Information
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Learn about our digital content delivery process and access
              methods.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Digital Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Laptop className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Digital Access</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                All our courses and training materials are delivered digitally
                through our online learning platform. Upon successful
                enrollment:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Immediate access to course materials</li>
                <li>Login credentials sent via email</li>
                <li>24/7 access to learning platform</li>
                <li>Cloud-based content delivery</li>
                <li>Mobile-responsive platform access</li>
              </ul>
            </div>
          </motion.div>

          {/* Access Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Clock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold">Access Timeline</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>Our digital content delivery process includes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Instant access upon payment confirmation</li>
                <li>Automated email with login instructions</li>
                <li>Course access for the specified duration</li>
                <li>Extended access for premium subscribers</li>
              </ul>
            </div>
          </motion.div>

          {/* Global Accessibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Globe className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold">Global Accessibility</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>Our digital platform ensures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Worldwide access to course content</li>
                <li>No geographical restrictions</li>
                <li>Content available across all time zones</li>
                <li>Multi-device compatibility</li>
                <li>Offline content download options</li>
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
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="mb-4">
              If you have any questions about accessing your course content,
              please contact our support team:
            </p>
            <div className="space-y-2">
              <p>Email: contact@teachxpro.com</p>
              <p>Phone: +91 8700944131</p>
              <p>Support Hours: Monday - Friday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ShippingDelivery;
