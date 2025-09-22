import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Chief Technology Officer',
    company: 'TechCorp Solutions',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote:
      "The training program significantly improved our team's productivity. The hands-on approach and real-world projects helped our developers gain practical skills they could immediately apply.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Engineering Director',
    company: 'InnovateSoft',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    quote:
      "The quality of instruction and curriculum structure exceeded our expectations. Our team's capability in modern development practices has improved dramatically.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Lead Developer',
    company: 'Digital Dynamics',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    quote:
      "The personalized attention and expert guidance helped us master complex technologies quickly. The practical exercises were particularly valuable for our team's growth.",
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Technical Lead',
    company: 'Future Systems',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote:
      "The program's focus on current industry practices and emerging technologies helped us stay ahead of the curve. Our team's confidence has grown significantly.",
    rating: 5,
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerPage =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (testimonials.length - itemsPerPage + 1)
    );
  }, [itemsPerPage]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerPage : prevIndex - 1
    );
  }, [itemsPerPage]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextTestimonial, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevTestimonial();
    if (e.key === 'ArrowRight') nextTestimonial();
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="p-2 bg-[rgb(0,116,116)] rounded-xl">
              <Quote className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[rgb(0,116,116)]">
              Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-[rgb(0,116,116)] bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 leading-[1.2] md:leading-[1.2]">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how our training programs have transformed teams and
            accelerated career growth
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: `${-currentIndex * (100 / itemsPerPage)}%`,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex-none w-full md:w-1/2 lg:w-1/3`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative h-full">
                    {/* Decorative Elements */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <Quote className="absolute top-6 right-6 h-8 w-8 text-purple-100" />

                    <div className="flex items-center mb-6 relative">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                          <div className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                            <Quote className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    <blockquote className="text-gray-600 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg text-gray-700 hover:text-purple-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg text-gray-700 hover:text-purple-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center mt-12">
            <div className="flex gap-2">
              {Array.from({
                length: testimonials.length - itemsPerPage + 1,
              }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-purple-600 w-8'
                      : 'bg-gray-300 hover:bg-purple-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
