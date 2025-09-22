import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Users, Trophy, Globe } from 'lucide-react';

function AboutUs() {
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
              About Teach X Pro
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Empowering developers with cutting-edge training programs and
              expert-led courses to build the next generation of tech leaders.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            At Training Pro, we're dedicated to bridging the gap between
            traditional education and industry demands. Our mission is to
            provide comprehensive, practical training that empowers developers
            to excel in their careers and drive innovation in the tech industry.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="h-8 w-8 text-white" />,
                title: 'Expert-Led Training',
                description:
                  'Learn from industry veterans with real-world experience',
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: 'Community Focus',
                description:
                  'Join a thriving community of developers and mentors',
              },
              {
                icon: <Trophy className="h-8 w-8 text-white" />,
                title: 'Industry Recognition',
                description: 'Gain certifications valued by top tech companies',
              },
            ].map((item, index) => (
              <div key={index} className="bg-black text-white p-6 rounded-xl">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2020, Training Pro emerged from a simple observation:
              traditional tech education wasn't keeping pace with industry
              evolution. Our founders, experienced developers themselves, saw
              the need for practical, hands-on training that directly translated
              to workplace success.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we've grown into a leading technical training provider,
              having helped over 300 developers enhance their skills and advance
              their careers. Our commitment to practical learning, industry
              relevance, and student success remains at the core of everything
              we do.
            </p>
          </div>
        </motion.div>

        {/* Global Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Global Impact</h2>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 mr-4" />
              <h3 className="text-xl font-semibold">
                Reaching Developers Worldwide
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">300+</div>
                <div className="text-sm text-white/80">Trained Developers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm text-white/80">Countries Reached</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm text-white/80">Partner Companies</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
