import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  FileText,
  Target,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle,
  X,
} from 'lucide-react';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface Analysis {
  atsScore: number;
  keywordMatch: number;
  suggestions: string[];
  missingKeywords: string[];
  improvements: {
    section: string;
    suggestions: string[];
  }[];
}

function ResumeTuner() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [step, setStep] = useState<'upload' | 'analyze' | 'results'>('upload');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(uploadedFile.type)) {
        setError('Please upload a PDF or Word document');
        return;
      }

      // Check file size (5MB limit)
      if (uploadedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(uploadedFile);
      setError(null);
      setStep('analyze');
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Read the file as text
      const fileText = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Get the text content
            const content = e.target.result;

            // If it's a string (text file), truncate it
            if (typeof content === 'string') {
              // Take first 2000 characters as a reasonable sample
              resolve(content.slice(0, 2000));
            } else {
              // For binary files (like Word docs), decode and truncate
              const text = new TextDecoder().decode(content);
              resolve(text.slice(0, 2000));
            }
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));

        if (file.type === 'application/pdf') {
          reader.readAsText(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      });

      // Analyze with OpenAI
      const prompt = `As an expert ATS and resume analyzer, thoroughly evaluate this resume against the job description provided. Focus on:
1. Key technical skills and qualifications match
2. Experience alignment with job requirements
3. Missing critical keywords and competencies
4. Specific areas for improvement
5. Format and presentation optimization

RESUME CONTENT:
${typeof fileText === 'string' ? fileText : new TextDecoder().decode(fileText)}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis in this exact JSON format:
{
  "atsScore": number (0-100, based on overall format compatibility and keyword optimization),
  "keywordMatch": number (0-100, based on specific skill and requirement matches),
  "missingKeywords": [
    {
      "keyword": string,
      "importance": "high" | "medium" | "low",
      "context": string (where/how this keyword is typically used)
    }
  ],
  "improvements": [
    {
      "section": string,
      "priority": "high" | "medium" | "low",
      "suggestions": [string]
    }
  ],
  "suggestions": [
    {
      "type": "format" | "content" | "skills" | "experience" | "education",
      "suggestion": string,
      "reason": string
    }
  ],
  "matchedKeywords": [
    {
      "keyword": string,
      "frequency": number,
      "context": string
    }
  ]
}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert ATS and resume analyzer with deep knowledge of:
- Modern ATS systems and their keyword parsing mechanisms
- Industry-specific technical skills and qualifications
- Professional resume formatting standards
- Job market trends and requirements

Provide detailed, actionable feedback focusing on:
1. Technical skill alignment
2. Experience relevance
3. Keyword optimization
4. Format improvements
5. Content enhancement opportunities

Be specific, practical, and prioritize suggestions based on impact.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 1000,
      });

      const analysisResult = JSON.parse(
        completion.choices[0]?.message?.content || '{}'
      );
      setAnalysis(analysisResult);
      setStep('results');
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navigation Bar */}
      <div className="bg-black/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section with Background */}
      <div className="relative overflow-hidden py-24">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-[1.2] md:leading-[1.2]">
              Resume Tuner
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get instant AI-powered analysis and optimization suggestions for
              your resume. Stand out from the competition with a perfectly tuned
              resume.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 pb-20 relative z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white overflow-hidden">
          {/* Modern Steps Indicator */}
          <div className="relative p-8 border-b border-gray-100">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between relative z-10">
                {[
                  { id: 'upload', icon: Upload, label: 'Upload Resume' },
                  { id: 'analyze', icon: Target, label: 'Analyze Content' },
                  { id: 'results', icon: Sparkles, label: 'View Results' },
                ].map((item, index) => {
                  const isActive = step === item.id;
                  const isPast =
                    (step === 'analyze' && item.id === 'upload') ||
                    (step === 'results' &&
                      (item.id === 'upload' || item.id === 'analyze'));

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center relative"
                    >
                      {/* Step Number */}
                      <div
                        className={`
                          w-16 h-16 rounded-2xl flex items-center justify-center
                          transition-all duration-500 relative
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl scale-110'
                              : isPast
                              ? 'bg-green-500 shadow-md'
                              : 'bg-gray-100 shadow-md'
                          }
                        `}
                      >
                        <item.icon
                          className={`
                          h-7 w-7 transition-all duration-500
                          ${isActive || isPast ? 'text-white' : 'text-gray-400'}
                        `}
                        />
                      </div>

                      {/* Label */}
                      <span
                        className={`
                        mt-4 font-medium text-sm transition-all duration-500
                        ${
                          isActive
                            ? 'text-gray-900'
                            : isPast
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }
                      `}
                      >
                        {item.label}
                      </span>

                      {/* Connector Line */}
                      {index < 2 && (
                        <div className="absolute left-[calc(100%+0.5rem)] top-8 w-[calc(100%-2rem)] h-[2px]">
                          <div
                            className={`
                            h-full transition-all duration-500
                            ${isPast ? 'bg-green-500' : 'bg-gray-200'}
                          `}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-8">
            {step === 'upload' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto text-center"
              >
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Upload Your Resume
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Upload your resume in PDF format to get started with the
                    analysis
                  </p>
                </div>

                <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer relative bg-white/50 group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <p className="text-lg text-gray-500 group-hover:text-gray-700 transition-colors">
                      Drag and drop your resume here, or click to browse
                      <br />
                      <span className="text-sm text-gray-400 mt-2 block">
                        Supported formats: PDF, DOC, DOCX (Max 5MB)
                      </span>
                    </p>
                  </div>
                  {error && (
                    <div className="absolute inset-x-0 -bottom-12 text-center">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}
                </label>
              </motion.div>
            )}

            {step === 'analyze' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Add Job Description
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Paste the job description to analyze your resume against
                    specific requirements
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Resume
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span className="flex-1 truncate text-gray-600">
                        {file?.name}
                      </span>
                      <button
                        onClick={() => {
                          setFile(null);
                          setStep('upload');
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                      <AlertCircle className="h-5 w-5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    onClick={analyzeResume}
                    disabled={isAnalyzing || !jobDescription}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-medium
                             hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50
                             disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      'Analyze Resume'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'results' && analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                    Analysis Complete
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Here's how your resume matches the job requirements
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      ATS Score
                    </h3>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        {analysis.atsScore}%
                      </span>
                      <span className="text-gray-600 mb-2">Compatibility</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      Keyword Match
                    </h3>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        {analysis.keywordMatch}%
                      </span>
                      <span className="text-gray-600 mb-2">Match Rate</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Missing Keywords */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                      Missing Keywords
                    </h3>
                    <div className="space-y-4">
                      {analysis.missingKeywords.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-100"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium text-red-600">
                                {item.keyword}
                              </span>
                              <span
                                className={`
                                text-xs px-3 py-1 rounded-full
                                ${
                                  item.importance === 'high'
                                    ? 'bg-red-100 text-red-600'
                                    : item.importance === 'medium'
                                    ? 'bg-orange-100 text-orange-600'
                                    : 'bg-yellow-100 text-yellow-600'
                                }
                              `}
                              >
                                {item.importance} priority
                              </span>
                            </div>
                            <p className="text-gray-600">{item.context}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section Improvements */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                      Suggested Improvements
                    </h3>
                    <div className="space-y-4">
                      {analysis.improvements.map((improvement, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                        >
                          <h4 className="font-medium text-gray-800 mb-4">
                            {improvement.section}
                          </h4>
                          <ul className="space-y-3">
                            {improvement.suggestions.map((suggestion, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600"
                              >
                                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Suggestions */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                      General Suggestions
                    </h3>
                    <div className="space-y-4">
                      {analysis.suggestions.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Sparkles className="h-6 w-6 text-green-600" />
                              <span className="font-medium text-green-600">
                                {item.type.charAt(0).toUpperCase() +
                                  item.type.slice(1)}{' '}
                                Improvement
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              {item.suggestion}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.reason}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                      Matched Keywords
                    </h3>
                    <div className="space-y-4">
                      {analysis.matchedKeywords.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-blue-600">
                                {item.keyword}
                              </span>
                              <span className="text-blue-600">
                                Found {item.frequency}{' '}
                                {item.frequency === 1 ? 'time' : 'times'}
                              </span>
                            </div>
                            <p className="text-gray-600">{item.context}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={() => {
                      setFile(null);
                      setJobDescription('');
                      setAnalysis(null);
                      setStep('upload');
                    }}
                    className="px-6 py-3 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Analyze Another Resume
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl 
                             hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    Download Report
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeTuner;
