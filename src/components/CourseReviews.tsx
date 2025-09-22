import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Alex Thompson",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The course content was incredibly well-structured and practical. I particularly enjoyed the hands-on projects that helped reinforce the concepts."
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 4.5,
    comment: "Great balance of theory and practice. The instructor's expertise and teaching style made complex topics easy to understand."
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The course exceeded my expectations. The real-world examples and industry insights were particularly valuable."
  }
];

function CourseReviews() {
  return (
    <div className="py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            What Our Students Say
          </h3>
        </motion.div>

        <div className="flex gap-6 pb-8 -mx-6 px-6 overflow-x-auto snap-x scrollbar-hide">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-[400px] snap-start"
            >
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute top-0 left-0 h-6 w-6 text-gray-200 -translate-x-2 -translate-y-2" />
                  <p className="text-gray-600 text-sm leading-relaxed pl-4">
                    {review.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseReviews;