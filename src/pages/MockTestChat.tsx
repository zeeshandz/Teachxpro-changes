import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader2, Brain, CheckCircle2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { generateMockTest } from '../lib/openai';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  avatar?: string;
  typing?: boolean;
}

interface Question {
  id: string;
  text: string;
  options?: string[];
}

const questions: Question[] = [
  {
    id: '1',
    text: "Hi there! I'm your mock test assistant. To create a personalized test for you, I'd love to know about your experience level. Where would you say you are in your journey?",
    options: ['Beginner', 'Intermediate', 'Advanced']
  },
  {
    id: '2',
    text: "Great! Now, I'd like to tailor the content to your interests. Which areas would you like to focus on the most?",
    options: ['Algorithms', 'System Design', 'Database Design', 'API Development', 'Frontend Development', 'Backend Development', 'Mobile Development']
  },
  {
    id: '3',
    text: "Perfect choice! To ensure the test fits your schedule, could you tell me how much time you'd be comfortable dedicating to this?",
    options: ['30 minutes', '1 hour', '2 hours']
  },
  {
    id: '4',
    text: "Last but not least, I want to make sure the questions match your learning style. What type of questions do you prefer?",
    options: ['Practical Coding', 'Theoretical Concepts', 'Mix of Both']
  }
];

const TYPING_SPEED = 30; // ms per character

function MockTestChat() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const hasInitialized = useRef(false); // Track if messages have been initialized

  useEffect(() => {
    if (hasInitialized.current || !testId) return; // Prevent duplicate execution
  
    hasInitialized.current = true; // Set flag immediately to avoid reruns
  
    const welcomeMessage = `Welcome to the ${testId.charAt(0).toUpperCase()}${testId.slice(1)} Mock Test preparation! 👋`;
    addBotMessage(welcomeMessage, undefined, 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop');
  
    // Add first question after a delay
    setTimeout(() => {
      addBotMessage(questions[0].text, questions[0].options);
    }, 2000);
  }, [testId]); // Dependency array remains minimal
  

  const addBotMessage = (content: string, options?: string[], avatar?: string) => {
    if (isTyping) return; // Prevent adding new messages while typing
    setIsTyping(true);
    const messageId = uuidv4();
    
    // Add message immediately but with typing indicator
    setMessages(prev => [...prev, {
      id: messageId,
      type: 'bot',
      content: '',
      options,
      avatar,
      typing: true
    }]);

    // Simulate typing effect
    let currentText = '';
    const textLength = content.length;
    
    const typeText = (index: number) => {
      if (index <= textLength) {
        currentText = content.slice(0, index);
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText, typing: index < textLength }
            : msg
        ));
        
        setTimeout(() => typeText(index + 1), TYPING_SPEED);
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(() => {
      typeText(1);
    }, 500);
  };

  const generateTest = async () => {
    setShowLoader(true);
    try {
      // Ensure all answers are filled in
      const requiredFields = ['experience', 'focus', 'time', 'style'];
      console.log('userAnswers:', userAnswers);
      for (const field of requiredFields) {
        if (!userAnswers[field]) {
          throw new Error(`Missing required preference: ${field}`);
        }
      }
  
      // Proceed to generate test if all answers are present
      const questions = await generateMockTest(userAnswers);
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('No questions were generated');
      }
  
      // Store questions in localStorage for the test page
      localStorage.setItem('mockTestQuestions', JSON.stringify(questions));
  
      addBotMessage(
        "Your personalized mock test is ready! I've carefully crafted questions that match your experience level and interests. Click below to begin your test journey. Good luck! 🚀",
        ['Start Test']
      );      
    } catch (error) {
      console.error('Error generating test:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      addBotMessage(
        `I apologize, but I encountered an error while generating your test: ${errorMessage}. Would you like to try again?`,
        ['Retry', 'Start Over']
      );
    } finally {
      setTimeout(() => {
        setShowLoader(false);
      }, 500); // Small delay to ensure smooth transition
    }
  };

  useEffect(() => {
    if (Object.keys(userAnswers).length === 4) {  // Ensure all preferences are set
      console.log("Final User Answers Before Test Generation:", userAnswers);
      // Add a small delay to ensure the final message is shown before generation starts
      setTimeout(() => {
        generateTest();
      }, 1500);
    }
  }, [userAnswers]); // Runs when userAnswers updates

  const handleOptionSelect = (answer: string) => {
    if (answer === 'Start Test') {
      navigate('/mock-test-questions');
      return;
    }

    console.log("Current Question Index:", currentQuestion);
    console.log("User Selected Answer:", answer);

    const questionCategories = ['experience', 'focus', 'time', 'style'];

    if (currentQuestion < questionCategories.length) {
      const category = questionCategories[currentQuestion];

      setUserAnswers(prev => {
        const updatedAnswers = { ...prev, [category]: answer };
        console.log("Updated User Answers:", updatedAnswers);
        return updatedAnswers;
      });
    }

    setMessages(prev => [...prev, { id: uuidv4(), type: 'user', content: answer }]);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        addBotMessage(questions[currentQuestion + 1].text, questions[currentQuestion + 1].options);
      }, 1000);
    } else {
      setTimeout(() => {
        const finalMessage = "Perfect! Thanks for sharing all that information. I'm now crafting a personalized mock test.";
        addBotMessage(finalMessage);
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-white hover:opacity-80">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-xl">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Mock Test Assistant</h1>
                <p className="text-sm text-gray-500">Personalizing your test experience</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="h-[600px] overflow-y-auto p-6 scroll-smooth">
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                  >
                    {message.type === 'bot' && message.avatar && (
                      <img 
                        src={message.avatar} 
                        alt="Assistant" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div className={`max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-900'
                    } rounded-2xl px-6 py-4`}>
                      <p>{message.content}</p>
                      {message.typing && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]" />
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]" />
                        </div>
                      )}
                      
                      {message.options && !message.typing && (
                        <div className="mt-4 space-y-2">
                          {message.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleOptionSelect(option)}
                              className="w-full text-left px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {showLoader && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Generating Your Test</h3>
                    <p className="text-gray-600">
                      {isGenerating 
                        ? "Using AI to create personalized questions based on your preferences..."
                        : "Analyzing your preferences and preparing test configuration..."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t bg-white">
            {currentQuestion < questions.length - 1 ? (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Select an option above to continue</span>
                <span>{currentQuestion + 1} of {questions.length}</span>
              </div>
            ) : showLoader ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating your personalized test...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Test generation complete!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTestChat;