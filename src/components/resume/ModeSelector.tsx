import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, FileEdit, ArrowRight } from 'lucide-react';

interface ModeSelectorProps {
  onModeSelect: (mode: 'ai' | 'manual') => void;
}

export function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* AI Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => onModeSelect('ai')}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Wand2 className="h-8 w-8 text-blue-600" />
          </div>
          <div>
  <h2 className="text-2xl font-bold mb-2">AI-Powered Builder</h2>
  <p className="text-gray-600 mb-4">
    Let our AI generate a tailored resume based on your target job title. You can edit and customize the content afterward.
  </p>
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-600">
      <ArrowRight className="h-4 w-4" />
      <span>Instant resume generation</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <ArrowRight className="h-4 w-4" />
      <span>Optimized for your job title</span>
    </div>
    <div className="flex items-center gap-2 text-gray-600">
      <ArrowRight className="h-4 w-4" />
      <span>Editable and customizable</span>
    </div>
  </div>
</div>
        </div>
        <button className="flex items-center justify-center w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </motion.div>

      {/* Manual Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => onModeSelect('manual')}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-100 rounded-xl">
            <FileEdit className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Manual Builder</h2>
            <p className="text-gray-600 mb-4">Start from scratch and build your resume step by step. Our intuitive builder will guide you through the process.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <ArrowRight className="h-4 w-4" />
                <span>Full control over content</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ArrowRight className="h-4 w-4" />
                <span>Step-by-step guidance</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ArrowRight className="h-4 w-4" />
                <span>Professional templates</span>
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
          Start Building
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </motion.div>
    </div>
  );
}