import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Timer, CheckCircle, XCircle, Trophy, Lightbulb, Loader2 } from 'lucide-react';
import { openai } from '../lib/openai';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  hasExplanation?: boolean;
}

function MockTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const navigate = useNavigate();

  const generateExplanation = async (question: Question) => {
    if (question.explanation || question.hasExplanation) return;
    
    setIsExplaining(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert technical instructor. Explain technical concepts clearly and concisely."
          },
          {
            role: "user",
            content: `Explain this technical question and its correct answer in detail:
            Question: ${question.question}
            Correct Answer: ${question.correctAnswer}
            
            Provide a clear, detailed explanation of:
            1. Why this is the correct answer
            2. Key concepts involved
            3. Real-world applications or examples
            4. Common misconceptions`
          }
        ]
      });

      const explanation = completion.choices[0]?.message?.content;
      if (explanation) {
        setQuestions(prev => prev.map(q => 
          q.id === question.id 
            ? { ...q, explanation, hasExplanation: true }
            : q
        ));
      }
    } catch (error) {
      console.error('Error generating explanation:', error);
    } finally {
      setIsExplaining(false);
    }
  };

  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    // Get questions from localStorage
    const storedQuestions = localStorage.getItem('mockTestQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      // If no questions found, redirect back to chat
      navigate('/mock-test/frontend');
    }
  }, [navigate]);

  useEffect(() => {
    // Check if user passed the test (score >= 70%) and confetti hasn't been shown yet
    if (showResults && !hasShownConfetti && score >= Math.ceil(questions.length * 0.7)) {
      // Add a small delay to ensure the results screen is visible
      setTimeout(() => {
        fireConfetti();
        setHasShownConfetti(true);
      }, 500);
    }
  }, [showResults, score, questions.length, hasShownConfetti]);

  const calculateScore = (answers: Record<string, string>) => {
    return questions.reduce((acc, question) => {
      const selectedAnswer = answers[String(question.id)]; // Ensure proper type comparison
      const isCorrect = selectedAnswer === question.correctAnswer;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswers[questions[currentQuestionIndex].id]) return; // Prevent changing answer

    const newSelectedAnswers = {
      ...selectedAnswers,
      [questions[currentQuestionIndex].id]: answer
    };

    setSelectedAnswers(newSelectedAnswers); // Update selected answers immediately
    setScore(calculateScore(newSelectedAnswers)); // Update score immediately

    // Auto advance to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResults(true); // Show results
      }
    }, 1500);
  };

  const getAnswerClassName = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedAnswers[currentQuestion.id];

    if (!selectedAnswer) {
      return 'bg-white hover:bg-gray-50';
    }

    if (answer === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }

    if (answer === selectedAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }

    return 'bg-white opacity-50';
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#fffcf5]">
        <div className="bg-black text-white py-4">
          <div className="max-w-[1400px] mx-auto px-6">
            <Link to="/" className="inline-flex items-center text-white hover:opacity-80">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="h-10 w-10 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Test Complete!</h2>
              <p className="text-xl mb-2">
                Your Score: <span className="font-bold">{score}</span> out of {questions.length}
              </p>
              <p className="text-gray-600">
                {score === questions.length
                  ? "Perfect score! Outstanding performance! 🎉"
                  : score >= questions.length * 0.7
                  ? "Great job! You're doing well! 👏"
                  : "Keep practicing! You're making progress! 💪"}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-gray-50 rounded-xl p-6 text-left"
                >
                  <p className="font-medium mb-4">
                    {index + 1}. {question.question}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`p-1 rounded-full ${
                      selectedAnswers[question.id] === question.correctAnswer
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}>
                      {selectedAnswers[question.id] === question.correctAnswer
                        ? <CheckCircle className="h-4 w-4 text-green-600" />
                        : <XCircle className="h-4 w-4 text-red-600" />
                      }
                    </div>
                    <span className="text-gray-600">
                      Your answer: {selectedAnswers[question.id]}
                    </span>
                    {selectedAnswers[question.id] !== question.correctAnswer && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 ml-2">
                          Correct answer: {question.correctAnswer}
                        </span>
                        {!question.hasExplanation && (
                          <button
                            onClick={() => generateExplanation(question)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                          >
                            {isExplaining ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Explaining...
                              </>
                            ) : (
                              <>
                                <Lightbulb className="h-3 w-3" />
                                Explain
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {question.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-blue-700">
                        <Lightbulb className="h-4 w-4" />
                        <span className="font-medium">Explanation</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/mock-test/frontend')}
                className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Take Another Test
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-white hover:opacity-80">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {questions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-100">
              <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Question Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <div className="text-sm font-medium">
                  Score: {score}/{questions.length}
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-medium mb-8">
                    {questions[currentQuestionIndex].question}
                  </h2>

                  <div className="space-y-4">
                    {questions[currentQuestionIndex].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={!!selectedAnswers[questions[currentQuestionIndex].id]}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          getAnswerClassName(option)
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedAnswers[questions[currentQuestionIndex].id] && (
                            option === questions[currentQuestionIndex].correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : option === selectedAnswers[questions[currentQuestionIndex].id] ? (
                              <XCircle className="h-5 w-5 text-red-600" />
                            ) : null
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MockTest;