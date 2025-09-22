import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft,
  Brain,
  BookOpen,
  Video,
  Copy,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'document';
  date: string;
  tags: string[];
}

function Notes() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'text' | 'video' | 'document'>('all');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedNotes, setGeneratedNotes] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate AI processing
      setIsGenerating(true);
      setTimeout(() => {
        // This would be replaced with actual AI processing
        const mockNotes = `# Notes from ${file.name}

## Key Points
- Important concept 1
- Important concept 2
- Important concept 3

## Summary
This is a summary of the content from the uploaded file. The AI has analyzed the content and generated these notes.

## Detailed Notes
1. First main point
   - Supporting detail
   - Example
2. Second main point
   - Supporting detail
   - Example

## Questions to Consider
- How does this relate to previous topics?
- What are the practical applications?
- What are the potential challenges?`;
        setGeneratedNotes(mockNotes);
        setIsGenerating(false);
      }, 2000);
    }
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(generatedNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Video className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Upload Video</h3>
                <p className="text-gray-600">Our AI will generate notes from your video</p>
              </div>
            </div>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Upload Video</span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Upload Document</h3>
                <p className="text-gray-600">Our AI will generate notes from your document</p>
              </div>
            </div>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Upload Document</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </motion.div>
        </div>

        {/* Generated Notes Section */}
        {isGenerating && (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span>Generating notes from your content...</span>
            </div>
          </div>
        )}

        {generatedNotes && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Notes</h2>
              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Notes</span>
                  </>
                )}
              </button>
            </div>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">
                {generatedNotes}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Notes List */}
        <div className="grid gap-6">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    note.type === 'video' ? 'bg-blue-50' : 
                    note.type === 'document' ? 'bg-purple-50' : 'bg-green-50'
                  }`}>
                    {note.type === 'video' ? (
                      <Video className="w-6 h-6 text-blue-500" />
                    ) : note.type === 'document' ? (
                      <FileText className="w-6 h-6 text-purple-500" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
                    <p className="text-gray-600 mb-2">{note.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{note.date}</span>
                      <div className="flex gap-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Notes; 