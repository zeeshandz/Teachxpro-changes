import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  avatar?: string;
  typing?: boolean;
}

// Questions for the chat flow
const questions = [
  {
    id: '1',
    text: "Hi there! I'm your Teachi. I'd like to ask you a few questions to help you find the perfect project.",
    options: ['Continue'],
  },
  {
    id: '2',
    text: 'Which one describes you best?',
    options: [
      'I am a Student',
      'I am an Alumni (Passout)',
      'I am having less than 3 years of experience',
    ],
  },
  { id: '3', text: "What's your name?", input: true },
  { id: '4', text: "What's your email address?", input: true, type: 'email' },
  {
    id: '5',
    text: "What's your phone number? (Optional)",
    input: true,
    type: 'tel',
  },
  {
    id: '6',
    text: "What's your experience level?",
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: '7',
    text: 'Which project areas interest you? (Select all that apply)',
    options: [
      'Web Development',
      'Mobile Apps',
      'AI/ML',
      'Backend',
      'Database',
      'Full Stack',
    ],
    multiSelect: true,
  },
  {
    id: '8',
    text: "Any additional message you'd like to share?",
    input: true,
    multiline: true,
  },
];

const TYPING_SPEED = 30; // ms per character

const isWithinWorkingHours = () => {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 9 && hours < 18; // 9 AM to 6 PM
};

function SupportChat() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showSubmitSpinner, setShowSubmitSpinner] = useState(false);
  const [isOnline] = useState(isWithinWorkingHours());

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (
    content: string,
    options?: string[],
    avatar?: string
  ) => {
    if (isTyping) return;
    setIsTyping(true);
    const messageId = crypto.randomUUID();

    // Add message immediately but with typing indicator
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        type: 'bot',
        content: '',
        options,
        avatar,
        typing: true,
      },
    ]);

    // Simulate typing effect
    let currentText = '';
    const textLength = content.length;

    const typeText = (index: number) => {
      if (index <= textLength) {
        currentText = content.slice(0, index);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, content: currentText, typing: index < textLength }
              : msg
          )
        );

        setTimeout(() => typeText(index + 1), TYPING_SPEED);
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(() => {
      typeText(1);
    }, 500);
  };

  const handleSubmit = async () => {
    setShowSubmitSpinner(true);

    try {
      // Validate required fields
      if (
        !userAnswers['2'] ||
        !userAnswers['3'] ||
        !userAnswers['4'] ||
        !userAnswers['6'] ||
        selectedInterests.length === 0
      ) {
        throw new Error(
          'Please complete all required fields before submitting'
        );
      }

      // Add processing message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'bot',
          content: 'Processing your submission...',
          typing: false,
        },
      ]);

      const submissionData = {
        user_type: userAnswers['2'],
        name: userAnswers['3'],
        email: userAnswers['4'],
        phone: userAnswers['5'] || null,
        experience_level: userAnswers['6'],
        project_interests: selectedInterests,
        message: userAnswers['8'] || null,
      };

      console.log('Submitting data:', submissionData);

      const { error } = await supabase
        .from('chat_responses')
        .insert([submissionData]);

      if (error) throw error;

      // Show success message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'bot',
          content:
            "Thank you for sharing your information! We've received your submission and will get back to you soon with the perfect project match.",
          typing: false,
        },
      ]);

      // Close chat window after a delay
      setTimeout(() => {
        setShowChat(false);
        // Reset state
        setUserAnswers({});
        setSelectedInterests([]);
        setCurrentQuestionIndex(0);
        setMessages([]);
      }, 5000);
    } catch (err) {
      console.error('Error submitting chat response:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'bot',
          content: `Error: ${errorMessage}. Please try again.`,
          options: ['Retry'],
          typing: false,
        },
      ]);
    } finally {
      setShowSubmitSpinner(false);
    }
  };

  const handleOptionSelect = async (answer: string) => {
    if (answer === 'Close Chat') {
      handleCloseChat();
      return;
    }

    if (answer === 'Retry') {
      handleSubmit();
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Add user's answer to messages
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'user',
        content: answer,
      },
    ]);

    if (currentQuestion.multiSelect) {
      // Handle multi-select for project interests
      setSelectedInterests((prev) =>
        prev.includes(answer)
          ? prev.filter((i) => i !== answer)
          : [...prev, answer]
      );

      // Show Continue button after interest selection
      if (!messages.some((m) => m.options?.includes('Continue'))) {
        addBotMessage(
          "Click Continue when you've selected all your interests",
          ['Continue']
        );
      }

      // If "Continue" is clicked, move to next question
      if (answer === 'Continue' && selectedInterests.length > 0) {
        setUserAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: selectedInterests.join(', '),
        }));

        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeout(() => {
          addBotMessage(
            questions[currentQuestionIndex + 1].text,
            questions[currentQuestionIndex + 1].options
          );
        }, 1000);
      }
      return;
    }

    // Store answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    // Check if this is the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeout(() => {
        addBotMessage(
          questions[currentQuestionIndex + 1].text,
          questions[currentQuestionIndex + 1].options
        );
      }, 1000);
    } else {
      // This is the last question, trigger submission after a short delay
      setTimeout(() => {
        handleSubmit();
      }, 500);
    }
  };

  const handleInputSubmit = () => {
    if (!currentInput.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Validate email
    if (currentQuestion.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentInput)) {
        addBotMessage('Please enter a valid email address.');
        return;
      }
    }

    // Add user's answer to messages
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'user',
        content: currentInput,
      },
    ]);

    // Store answer and move to next question
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: currentInput,
    }));

    setCurrentInput('');

    if (isLastQuestion) {
      // If this is the last question, trigger submission
      setTimeout(() => {
        handleSubmit();
      }, 500);
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeout(() => {
        addBotMessage(
          questions[currentQuestionIndex + 1].text,
          questions[currentQuestionIndex + 1].options
        );
      }, 1000);
    }
  };

  const resetChatState = () => {
    setUserAnswers({});
    setSelectedInterests([]);
    setCurrentQuestionIndex(0);
    setMessages([]);
    setCurrentInput('');
    setIsTyping(false);
    setShowSubmitSpinner(false);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    resetChatState();
  };

  // Initialize chat when opened
  useEffect(() => {
    if (showChat && messages.length === 0) {
      const firstQuestion = questions[0];
      if (firstQuestion) {
        addBotMessage(firstQuestion.text, firstQuestion.options);
      }
    }
  }, [showChat]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setShowChat(true)}
        className="fixed bottom-4 right-4 z-40 p-4 rounded-full shadow-lg bg-gradient-to-r from-[rgb(0,116,116)] via-[rgb(0,116,116)] to-[rgb(46,125,50)] text-white hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Teachi"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <span
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-96 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700/50 z-40 backdrop-blur-lg"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-7 h-7 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.75 6C15.75 8.07107 14.0711 9.75 12 9.75C9.92893 9.75 8.25 8.07107 8.25 6C8.25 3.92893 9.92893 2.25 12 2.25C14.0711 2.25 15.75 3.92893 15.75 6Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 12.75C8.27208 12.75 4.5 14.7246 4.5 18C4.5 19.6569 5.84315 21 7.5 21H16.5C18.1569 21 19.5 19.6569 19.5 18C19.5 14.7246 15.7279 12.75 12 12.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M15.75 6.75C16.9926 6.75 18 5.74264 18 4.5C18 3.25736 16.9926 2.25 15.75 2.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Teachii</h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <Clock className="w-3 h-3" />
                      <span>{isOnline ? 'Online (9AM-6PM)' : 'Offline'}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCloseChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs mr-2 self-end mb-2">
                      <span className="text-[10px]">Tii</span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[80%] rounded-2xl p-3 shadow-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white'
                        : message.options
                        ? 'bg-gray-800/95 text-gray-100 border border-gray-700/50'
                        : message.content.includes(
                            'Thank you for sharing your information!'
                          )
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gray-800/95 text-gray-100 border border-gray-700/50'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.typing && (
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-.3s]" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-.5s]" />
                      </div>
                    )}
                    {message.options && !message.typing && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option) => (
                          <motion.button
                            key={option}
                            onClick={() => {
                              handleOptionSelect(option);
                              const currentQ = questions[currentQuestionIndex];
                              if (
                                currentQ?.id === '7' &&
                                !selectedInterests.length &&
                                option !== 'Continue'
                              ) {
                                setTimeout(() => {
                                  addBotMessage(
                                    "Click Continue when you've selected all your interests",
                                    ['Continue']
                                  );
                                }, 500);
                              }
                            }}
                            className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                              questions[currentQuestionIndex]?.id === '7' &&
                              selectedInterests.includes(option)
                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-gray-700/50 text-white hover:bg-gray-600/50 border border-gray-600/30'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-800/95 space-y-3 backdrop-blur-sm">
              {questions[currentQuestionIndex]?.input && (
                <div className="flex gap-2">
                  <input
                    type={questions[currentQuestionIndex].type || 'text'}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                    placeholder="Type your answer..."
                    className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/30 text-white placeholder-gray-400 text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    onClick={handleInputSubmit}
                    disabled={!currentInput.trim()}
                    className="p-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>
                  {questions[currentQuestionIndex]?.input
                    ? 'Press Enter to submit'
                    : questions[currentQuestionIndex]?.id === '7'
                    ? 'Select all that apply'
                    : 'Select an option to continue'}
                </span>
                <span className="text-gray-500">
                  {showSubmitSpinner ? (
                    <div className="flex items-center gap-2">
                      <span className="mr-2">Submitting...</span>
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-.3s]" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-.5s]" />
                    </div>
                  ) : currentQuestionIndex < questions.length - 1 ? (
                    `Question ${currentQuestionIndex + 1} of ${
                      questions.length - 1
                    }`
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SupportChat;
