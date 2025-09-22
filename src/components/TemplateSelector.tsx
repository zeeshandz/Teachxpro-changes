import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  baseFileName: string;
  images: {
    webp: number[];
    jpeg: number[];
    loading: {
      width: number;
      format: string;
    };
  };
  tags: string[];
  isPremium: boolean;
}

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="group relative rounded-2xl transition-all duration-300"
        >
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-100">
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 group/image">
              <img
                src={`https://prod.flowcvassets.com/resume-templates/${template.baseFileName}/${template.images.jpeg[0]}.jpeg`}
                alt={template.title}
                className="w-full h-full object-contain transition-all duration-300 group-hover/image:blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />

              {/* Floating Use Template Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onSelect(template.id)}
                  className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Use Template
                </button>
              </div>

              {template.isPremium && (
                <div className="absolute top-4 right-4">
                  <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                    Premium
                  </span>
                </div>
              )}
            </div>

            {/* Template Title Banner */}
            <div className="bg-black text-white py-3 px-4 text-center">
              <h4 className="text-sm font-medium">{template.title}</h4>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Features</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">4.8</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
