import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ban, AlertCircle, Info } from 'lucide-react';

function CancellationRefund() {
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
              Cancellation & Refund Policy
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Please read our cancellation and refund policy carefully before
              making a purchase.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* No Cancellation Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold">No Cancellation Policy</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                At Training Pro, we maintain a strict no-cancellation policy for
                our courses and services. Once enrolled, course registrations
                cannot be cancelled or transferred to another person.
              </p>
              <p>
                This policy is in place to ensure the quality and consistency of
                our training programs and to maintain the integrity of our
                learning environment.
              </p>
            </div>
          </motion.div>

          {/* No Refund Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Ban className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold">No Refund Policy</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                All course fees paid are non-refundable. We do not provide
                refunds for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Partially completed courses</li>
                <li>Unused course materials</li>
                <li>Change of mind</li>
                <li>Schedule conflicts</li>
                <li>Technical issues on the user's end</li>
              </ul>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <Info className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Important Information</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>Before making a purchase, please:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Review course requirements and prerequisites</li>
                <li>Check course schedules and time commitments</li>
                <li>Ensure your device meets technical requirements</li>
                <li>Read course descriptions thoroughly</li>
              </ul>
              <p className="mt-6">
                By proceeding with enrollment, you acknowledge and agree to our
                no-cancellation and no-refund policy.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="mb-4">
              If you have any questions about our cancellation and refund
              policy, please contact us at:
            </p>
            <div className="space-y-2">
              <p>Email: contact@teachxpro.com</p>
              <p>Phone: +91 8700944131</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CancellationRefund;
