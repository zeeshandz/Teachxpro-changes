import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Brain,
  FileText,
  Video,
  BookOpen,
  Link as LinkIcon,
  ArrowRight,
  Loader2,
  CheckCircle,
  XCircle,
  Copy,
  Check
} from 'lucide-react';
import APIManager from '../services/api';
import { FlashcardComponent } from '../components/FlashcardComponent';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string | null;
  isCorrect?: boolean | null;
  _id: string;
  chat: string;
}

interface FlashcardResponse {
  flashCards: string;
}

interface SummaryResponse {
  summary: string;
}

interface NotesResponse {
  notes: string;
}

interface Flashcard {
  front: string;
  back: string;
}

function StudyTools() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('quiz');
  const [contentId, setContentId] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const parseOptions = (optionsString: string): string[] => {
    try {
      const parsed = JSON.parse(optionsString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse options string:", optionsString, e);
      return [];
    }
  };

  const processQuizData = (rawQuestions: any[]): QuizQuestion[] => {
    if (!Array.isArray(rawQuestions)) return [];
    return rawQuestions.map(q => ({
      ...q,
      question: q.question,
      options: parseOptions(q.options),
      correctAnswer: q.answer,
      userAnswer: null,
      isCorrect: null
    }));
  };

  const processFlashcardData = (data: FlashcardResponse | null): Flashcard[] => {
    if (!data?.flashCards) return [];
    console.log("Raw flashcard data:", data.flashCards); // Log raw data for debugging
    try {
      const cards = data.flashCards
        .split('\n\n') // Split by double newlines to separate cards
        .filter(card => card.trim()) // Remove empty entries
        .map((cardString: string) => {
          const [question, answer] = cardString.split(';').map(part => part.trim());
          if (question && answer) {
            return {
              front: question,
              back: answer
            };
          }
          return null;
        })
        .filter((card): card is Flashcard => card !== null);
        
      console.log("Processed flashcards:", cards); // Log processed data
      return cards;
    } catch (e) {
      console.error("Failed to process flashcard data:", data.flashCards, e);
      return [];
    }
  };

  const generateAllTools = async (id: string) => {
    if (!id) return;
    setIsGeneratingAll(true);
    setGenerationComplete(false);
    setError(null);
    setQuizQuestions([]);
    setFlashcards([]);
    setSummary(null);
    setNotes(null);
    console.log('Starting generation for all tools, contentId:', id);
    let allSucceeded = true;

    try {
      const results = await Promise.allSettled([
        APIManager.generateQuiz(id),
        APIManager.generateFlashcards(id),
        APIManager.generateSummary(id),
        APIManager.generateNotes(id)
      ]);

      results.forEach((res, index) => {
        const toolName = ['Quiz', 'Flashcards', 'Summary', 'Notes'][index];
        if (res.status === 'fulfilled' && res.value) {
           console.log(`${toolName} generated.`);
           if (index === 0) setQuizQuestions(processQuizData(res.value as any));
           if (index === 1) {
             const flashcardResponse = res.value as unknown as FlashcardResponse;
             setFlashcards(processFlashcardData(flashcardResponse));
           }
           if (index === 2) setSummary((res.value as SummaryResponse)?.summary || 'No summary generated.');
           if (index === 3) setNotes((res.value as NotesResponse)?.notes || 'No notes generated.');
        } else {
           console.error(`${toolName} generation failed:`, res.status === 'rejected' ? res.reason : 'Unknown error');
           allSucceeded = false;
        }
      });
      
      if (!allSucceeded) {
         setError('Some tools failed to generate. Results may be incomplete.');
      } else {
         setError(null);
         setSelectedTool('quiz');
      }
      
    } catch (err) {
      console.error('Unexpected error during generateAllTools:', err);
      setError('An unexpected error occurred during content generation.');
      allSucceeded = false;
      setSelectedTool('quiz');
    } finally {
      setIsGeneratingAll(false);
      if (id === contentId) { 
        setGenerationComplete(allSucceeded);
        if (!allSucceeded) {
          setSelectedTool('quiz');
        }
      }
      console.log('Finished generating all tools.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    setGenerationComplete(false);
    setContentId(null);
    setSelectedTool('quiz');
    setQuizQuestions([]);
    setFlashcards([]);
    setSummary(null);
    setNotes(null);
    setError(null);
    setIsGeneratingAll(false);

    try {
      console.log('Uploading PDF...');
      const uploadResponse = await APIManager.uploadPDF(file);
      const newContentId = uploadResponse.file._id;
      console.log('PDF Upload successful, contentId:', newContentId);
      setContentId(newContentId);

      await generateAllTools(newContentId);

    } catch (err) {
      console.error('File upload failed:', err);
      setError(err instanceof Error ? err.message : 'File upload failed.');
      setContentId(null);
      setIsGeneratingAll(false);
      setGenerationComplete(false);
    } finally {
      setIsProcessingUpload(false);
      if (event.target) event.target.value = '';
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    // If it's already an ID (11 characters)
    if (url.length === 11) return url;

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeLink) return;

    setIsProcessingUpload(true);
    setGenerationComplete(false);
    setContentId(null);
    setSelectedTool('quiz');
    setQuizQuestions([]);
    setFlashcards([]);
    setSummary(null);
    setNotes(null);
    setError(null);
    setIsGeneratingAll(false);

    try {
      const videoId = extractYouTubeId(youtubeLink);
      if (!videoId) {
        throw new Error('Invalid YouTube URL or ID');
      }

      console.log('Uploading YouTube video ID:', videoId);
      const uploadResponse = await APIManager.uploadYouTubeVideo(videoId);
      const newContentId = uploadResponse._id;
      console.log('YouTube Upload successful, contentId:', newContentId);
      setContentId(newContentId);

      await generateAllTools(newContentId);

    } catch (err) {
      console.error('YouTube submission failed:', err);
      setError(err instanceof Error ? err.message : 'YouTube submission failed.');
      setContentId(null);
      setIsGeneratingAll(false);
      setGenerationComplete(false);
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    setQuizQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const question = updatedQuestions[questionIndex];

      if (question.userAnswer !== null) {
        return prevQuestions;
      }

      const isCorrect = selectedOption === question.correctAnswer;

      updatedQuestions[questionIndex] = {
        ...question,
        userAnswer: selectedOption,
        isCorrect: isCorrect
      };

      return updatedQuestions;
    });
  };

  const parseBoldText = (text: string): React.ReactNode[] => {
    if (!text) return [];
    
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const parseSummaryText = (text: string | null) => {
    if (!text) return [];

    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('**') && section.includes('**', 2)) {
        // This is a main heading
        return {
          type: 'heading',
          content: section,
          index
        };
      } else if (section.startsWith('- **')) {
        // This is a sub-heading with content
        const [boldPart, ...contentParts] = section.substring(2).split(':');
        return {
          type: 'subheading',
          heading: boldPart,
          content: contentParts.join(':').trim(),
          index
        };
      }
      return {
        type: 'text',
        content: section,
        index
      };
    });
  };

  const handleCopyNotes = async () => {
    await navigator.clipboard.writeText(notes || '');
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(summary || '');
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const renderUploadSection = () => (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Enter Youtube link, or upload PDF..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              disabled={isProcessingUpload || isGeneratingAll}
              className={`flex-1 px-6 py-4 bg-transparent border-none focus:outline-none text-base text-gray-900 placeholder-gray-400 ${(isProcessingUpload || isGeneratingAll) ? 'cursor-not-allowed' : ''}`}
            />
            <div className="flex items-center gap-2 pr-4">
              <label className={`p-2 rounded-lg transition-colors ${(isProcessingUpload || isGeneratingAll) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
                <LinkIcon className="w-6 h-6 text-purple-600" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isProcessingUpload || isGeneratingAll}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                disabled={isProcessingUpload || isGeneratingAll}
                className={`p-2 rounded-lg bg-purple-600 text-white transition-colors flex items-center justify-center w-[40px] h-[40px] ${(isProcessingUpload || isGeneratingAll) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
              >
                {isProcessingUpload ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { 
              tool: "quiz", 
              text: "Make a quiz", 
              icon: <div className="w-6 h-6 rounded-md border border-blue-500 flex items-center justify-center">
                      <Brain className="w-3.5 h-3.5 text-blue-600" />
                    </div>, 
              color: "from-blue-600 to-cyan-600" 
            },
            { 
              tool: "flashcards", 
              text: "Make some flashcards", 
              icon: <div className="w-6 h-6 rounded-md border border-purple-500 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                    </div>, 
              color: "from-purple-600 to-pink-600" 
            },
            { 
              tool: "notes", 
              text: "Turn this into notes", 
              icon: <div className="w-6 h-6 rounded-md border border-amber-500 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    </div>, 
              color: "from-amber-600 to-orange-600" 
            },
            { 
              tool: "summary", 
              text: "Make a summary", 
              icon: <div className="w-6 h-6 rounded-md border border-green-500 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-green-600" />
                    </div>, 
              color: "from-green-600 to-emerald-600" 
            }
          ].map((button, index) => (
            <motion.button
              key={button.tool}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              type="button"
              onClick={() => setSelectedTool(button.tool)}
              disabled={isProcessingUpload || isGeneratingAll}
              className={`group relative p-3 rounded-2xl bg-white border text-gray-700 transition-all duration-300 flex flex-col items-center gap-2 ${isProcessingUpload || isGeneratingAll ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-200 hover:bg-gray-50'} ${selectedTool === button.tool && !isGeneratingAll ? 'border-purple-500 border-2 shadow-md' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${button.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              {button.icon}
              <span className="text-xs font-medium">{button.text}</span>
            </motion.button>
          ))}
        </div>
      </form>
    </div>
  );

  const renderQuizSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Generated Quiz</h2>
        <button
          onClick={() => {
            setQuizQuestions([]);
            setContentId(null);
            setError(null);
            setYoutubeLink('');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Create Another Quiz
        </button>
      </div>
      <div className="space-y-6">
        {Array.isArray(quizQuestions) && quizQuestions.length > 0 ? (
          quizQuestions.map((question, index) => {
            const hasAnswered = question.userAnswer !== null;
            return (
              <div
                key={question._id || index}
                className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {index + 1}. {question?.question || 'Question not available'}
                </h3>
                <div className="space-y-3">
                  {Array.isArray(question?.options) ? (
                    question.options.map((option, optionIndex) => {
                      const isSelected = question.userAnswer === option;
                      const isCorrect = option === question.correctAnswer;
                      let optionClasses = "flex items-center space-x-3 p-3 rounded-lg border transition-colors duration-200 ease-in-out";

                      if (hasAnswered) {
                        optionClasses += " cursor-not-allowed";
                        if (isSelected) {
                          optionClasses += question.isCorrect ? " border-green-500 bg-green-50 border-2" : " border-red-500 bg-red-50 border-2";
                        } else if (isCorrect) {
                          optionClasses += " border-green-300 bg-green-50/50";
                        } else {
                          optionClasses += " border-gray-200 opacity-60";
                        }
                      } else {
                        optionClasses += " border-gray-200 hover:bg-gray-50 cursor-pointer";
                      }

                      return (
                        <div
                          key={optionIndex}
                          className={optionClasses}
                          onClick={() => !hasAnswered && handleAnswerSelect(index, option)}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${isSelected && hasAnswered ? (question.isCorrect ? 'border-green-600 text-green-700' : 'border-red-600 text-red-700') : 'border-purple-600 text-purple-700'}`}>
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <span className={`flex-1 ${isSelected && hasAnswered ? 'font-medium' : 'text-gray-700'}`}>{option}</span>
                          {hasAnswered && isSelected && (
                            question.isCorrect ? 
                              <CheckCircle className="w-5 h-5 text-green-600" /> : 
                              <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          {hasAnswered && !isSelected && isCorrect && (
                             <CheckCircle className="w-5 h-5 text-green-400 opacity-70" />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-red-500">Options not available for this question.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-4">No quiz questions generated yet or data is loading.</p>
        )}
      </div>
    </div>
  );

  const renderFlashcardsSection = () => {
    const handleNextCard = () => {
      if (currentFlashcardIndex < (flashcards?.length || 0) - 1) {
        setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      }
    };

    const handlePrevCard = () => {
      if (currentFlashcardIndex > 0) {
        setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      }
    };

    if (!flashcards || flashcards.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No flashcards available</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-between w-full max-w-2xl">
          <button
            onClick={handlePrevCard}
            disabled={currentFlashcardIndex === 0}
            className={`p-2 rounded-full ${
              currentFlashcardIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="text-sm text-gray-500">
            {currentFlashcardIndex + 1} / {flashcards.length}
          </div>
          <button
            onClick={handleNextCard}
            disabled={currentFlashcardIndex === flashcards.length - 1}
            className={`p-2 rounded-full ${
              currentFlashcardIndex === flashcards.length - 1
                ? 'text-gray-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="w-full max-w-2xl">
          <FlashcardComponent
            front={flashcards[currentFlashcardIndex].front}
            back={flashcards[currentFlashcardIndex].back}
          />
        </div>
      </div>
    );
  };

  const renderNotesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Generated Notes</h2>
        <button
          onClick={handleCopyNotes}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
        >
          {copiedNotes ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Notes</span>
            </>
          )}
        </button>
      </div>
      {notes ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 bg-gray-50/80 px-6 py-3 border-b border-gray-200">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Smart Notes</span>
          </div>
          <div className="p-6 space-y-8">
            {notes.split('\n\n').map((paragraph, index) => {
              const lines = paragraph.split('\n');
              const isHeading = lines[0].includes(':');

              if (isHeading) {
                const [heading, ...content] = lines;
                return (
                  <div key={index} className="space-y-4">
                    <div className="flex gap-3 items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold italic text-gray-900">{parseBoldText(heading.trim())}</h3>
                    </div>
                    <div className="space-y-3 pl-11">
                      {content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-700 leading-relaxed">
                          {parseBoldText(line.trim())}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="space-y-3 pl-11">
                  {lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-700 leading-relaxed">
                      {parseBoldText(line.trim())}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500">No notes generated or still loading.</p>
        </div>
      )}
    </div>
  );

  const renderSummarySection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Generated Summary</h2>
        <button
          onClick={handleCopySummary}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
        >
          {copiedSummary ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Summary</span>
            </>
          )}
        </button>
      </div>
      {summary ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 bg-gray-50/80 px-6 py-3 border-b border-gray-200">
            <FileText className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Key Points</span>
          </div>
          <div className="p-6 space-y-8">
            {summary.split('\n\n').map((section, index) => {
              const lines = section.trim().split('\n');
              const isHeading = lines[0].includes(':');

              if (isHeading) {
                const [heading, ...content] = lines;
                return (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl font-bold italic text-gray-900">
                      {index + 1}. {parseBoldText(heading.trim())}
                    </h3>
                    <div className="space-y-3 pl-11">
                      {content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-700 leading-relaxed">
                          {parseBoldText(line.trim())}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="space-y-3 pl-11">
                  {lines.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-700 leading-relaxed">
                      {parseBoldText(line.trim())}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500">No summary generated or still loading.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="sticky top-0 z-50 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Which study materials can we Transform?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Upload your content or paste a YouTube link to get started with AI-powered learning tools
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {renderUploadSection()}

              {/* Divider (Show only if content uploaded) */}
              {contentId && (
                 <hr className="my-8 border-gray-200" />
              )}

              {/* Combined Generation Loader */}
              {isGeneratingAll && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">Generating all study tools...</p>
                </motion.div>
              )}

              {/* Generation Complete Message (Show ONLY when complete and not loading) */}
              {generationComplete && !isGeneratingAll && contentId && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-4 px-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-6"
                 >
                    <p className="font-medium">Generation complete! Select a tool above to view the results.</p>
                 </motion.div>
              )}

              {/* Conditional Rendering of Tools (Show only AFTER generation and if contentId exists) */}
              {!isProcessingUpload && !isGeneratingAll && contentId && (
                <motion.div 
                  key={selectedTool} // Add key for animation on tool change
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedTool === 'quiz' && renderQuizSection()}
                  {selectedTool === 'flashcards' && renderFlashcardsSection()}
                  {selectedTool === 'notes' && renderNotesSection()}
                  {selectedTool === 'summary' && renderSummarySection()}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudyTools;