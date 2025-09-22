import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Search, Filter, Star } from 'lucide-react';
import { TemplateSelector } from '../components/TemplateSelector';

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

// Mock data based on FlowCV's template structure
const mockTemplates: Template[] = [
  {
    id: 'template-1',
    title: 'Atlantic Blue · Professional',
    description: 'Clean and modern resume template perfect for professionals',
    baseFileName: 'wk78myowij2vvh1gy8l-s',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['professional', 'modern', 'clean'],
    isPremium: false,
  },
  {
    id: 'template-2',
    title: 'Nordic White · Creative',
    description: 'Creative and minimalist design for standing out',
    baseFileName: 'gs_qryrzly3kldmqhxqsb',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['creative', 'minimal', 'modern'],
    isPremium: false,
  },
  {
    id: 'template-3',
    title: 'Executive Black · Corporate',
    description: 'Professional template for corporate and executive positions',
    baseFileName: 'yrf-1jligslm-ta_zmyji',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['corporate', 'professional', 'executive'],
    isPremium: true,
  },
  {
    id: 'template-4',
    title: 'Tech Stack · Developer',
    description: 'Modern template optimized for tech and developer roles',
    baseFileName: 'free-multi-column-resume-template',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['tech', 'developer', 'modern'],
    isPremium: false,
  },
  {
    id: 'template-5',
    title: 'Creative Portfolio · Designer',
    description: 'Showcase your creative work with this portfolio-style resume',
    baseFileName: 'um2ccnj8x3bimdnzzrml8',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['creative', 'portfolio', 'designer'],
    isPremium: true,
  },
  {
    id: 'template-6',
    title: 'Minimal Edge · Universal',
    description: 'Clean and versatile template suitable for all professions',
    baseFileName: '9hpvr_9ietentflai7zpv',
    images: {
      jpeg: [960],
      webp: [2560, 1280, 960, 480, 40],
      loading: {
        width: 40,
        format: 'webp',
      },
    },
    tags: ['minimal', 'clean', 'universal'],
    isPremium: false,
  },
];

function ResumeMaker() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      template.tags.includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const categories = [
    'all',
    ...new Set(mockTemplates.flatMap((template) => template.tags)),
  ];

  const handleTemplateSelection = (templateId: string) => {
    const selectedTemplate = mockTemplates.find(
      (template) => template.id === templateId
    );
    if (
      templateId === 'template-6' ||
      templateId === 'template-1' ||
      templateId === 'template-2' ||
      templateId === 'template-3'
    ) {
      navigate(`/resume-editor/${templateId}`);
    } else {
      // Show development in progress message with the selected template's title
      alert(
        `This template (${selectedTemplate?.title}) is currently under development. Please try one of the available templates.`
      );
    }
  };

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
              Resume Builder
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Create a professional resume in minutes with our AI-powered
              builder or craft it manually.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <TemplateSelector
          templates={filteredTemplates}
          onSelect={handleTemplateSelection}
        />
      </div>
    </div>
  );
}

export default ResumeMaker;
