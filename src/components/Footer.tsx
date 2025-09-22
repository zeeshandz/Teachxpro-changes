import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-2 mb-3 group">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-white text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-xl transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-br  from-blue-500 via-purple-500 to-pink-500">
                    X
                  </span>
               </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-white tracking-tight">
                  teach
                </span>
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  X
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  pro
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering developers with cutting-edge training programs.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <h3 className="text-sm font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/course/full-stack-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Full-Stack Development
                </Link>
              </li>
              <li>
                <Link
                  to="/course/mobile-application-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link
                  to="/course/web-app-development"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-projects"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@teachxpro.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 8700944131</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Office No. 101, D-60, Sector-63, Noida</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-xs">
              © {currentYear} Training Pro. All rights reserved.
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/cancellation-refund"
                className="hover:text-white transition-colors"
              >
                Cancellation & Refund
              </Link>
              <Link
                to="/shipping-delivery"
                className="hover:text-white transition-colors"
              >
                Shipping & Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
