import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Copy, 
  Download, 
  Linkedin,
  User,
  Building2,
  Sparkles,
  Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { generateLinkedInPost } from '../lib/openai';

interface FormData {
  fullName: string;
  jobRole: string;
  companyName: string;
  excitement: string;
  profilePicture: File | null;
}

interface GeneratedPost {
  content: string;
  hashtags: string[];
}

function LinkedInPostGenerator() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    jobRole: '',
    companyName: '',
    excitement: '',
    profilePicture: null
  });
  
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const linkedinCardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setProfileImageUrl(url);
    }
  };

  const generateLinkedInPostHandler = async () => {
    if (!formData.fullName || !formData.jobRole || !formData.companyName) {
      alert('Please fill in all required fields');
      return;
    }

    // Clear the right section first
    setGeneratedPost(null);

    setIsGenerating(true);
    
    try {
      const data = await generateLinkedInPost({
        fullName: formData.fullName,
        jobRole: formData.jobRole,
        companyName: formData.companyName,
        excitement: formData.excitement
      });
      
      setGeneratedPost(data);
    } catch (error) {
      console.error('Error generating LinkedIn post:', error);
      
      // Fallback mock data if API fails
      const mockPost: GeneratedPost = {
        content: `Investing my weekend hours to dive deep into AI mastery and holding myself accountable to my network.

Enrolled in Codways's 3 hours AI mastermind session to supercharge my capabilities.

Being a ${formData.jobRole} at ${formData.companyName}, I see huge potential in leveraging AI to transform my field.

${formData.excitement || 'Excited to master cutting-edge AI workflows and tools that will revolutionize how we work.'}

What we'll be covering:
Mastering how to use LLMs to streamline development workflows.
🎨 Creating hyper-realistic AI images and videos for project mockups and UI design.
⚙️ Building Custom GPT's for a particular use-case.
🤖 Automating tasks with no-code tools like Make and Zapier—game-changers for productivity!

𝗪𝗮𝗻𝘁 𝘁𝗼 𝗷𝗼𝗶𝗻 𝗺𝗲 𝗮𝗻𝗱 𝗺𝗮𝗻𝘆 𝗼𝘁𝗵𝗲𝗿 𝗹𝗲𝗮𝗿𝗻𝗲𝗿𝘀 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘅𝘁 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝘃𝗲 𝗔𝗜 𝗠𝗮𝘀𝘁𝗲𝗿𝗺𝗶𝗻𝗱? 𝗝𝗼𝗶𝗻 𝘁𝗵𝗲 𝘄𝗮𝗶𝘁𝗹𝗶𝘀𝘁 𝗵𝗲𝗿𝗲: https://www.teachxpro.com/upcoming-classes

I'll be sharing key takeaways post-session—looking forward to keeping this momentum and inviting you to keep me accountable.

#GenerativeAI #AILearning #Codways #ProfessionalDevelopment

@Sanjeev Sharma`,
        hashtags: ['#GenerativeAI', '#AILearning', '#Codways', '#ProfessionalDevelopment']
      };
      setGeneratedPost(mockPost);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedPost) return;
    
    const textToCopy = generatedPost.content.includes('@Sanjeev Sharma') 
      ? generatedPost.content 
      : `${generatedPost.content}\n\n@Sanjeev Sharma`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('LinkedIn post copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard');
    }
  };

  const downloadImage = async () => {
    if (!linkedinCardRef.current) return;
    
    setIsImageGenerating(true);
    
    try {
      const canvas = await html2canvas(linkedinCardRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        width: 800,
        height: 500,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        imageTimeout: 0,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `${formData.fullName.replace(/\s+/g, '_')}_linkedin_post.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image');
    } finally {
      setIsImageGenerating(false);
    }
  };

  const postToLinkedIn = () => {
    // TODO: Implement LinkedIn sharing
    alert('LinkedIn posting functionality will be implemented soon!');
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
              Take A Pledge
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Become Top 1% in the AI-First World
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Panel - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Sachit Wadhawan"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Job Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    placeholder="Engineering Manager"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Emids Technologies Pvt Ltd"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* What excites you about Mastermind */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What excites you the most about Mastermind? <span className="text-gray-500 text-sm">(Optional)</span>
                </label>
                <textarea
                  name="excitement"
                  value={formData.excitement}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Putting in significant weekend hours to elevate AI skills and hold myself accountable.

Enrolled in Codways's 3 hours AI mastermind session to supercharge my capabilities.

Being an Engineering Manager at Emids Technologies Pvt Ltd, I see huge potential in leveraging AI to transform engineering management and drive innovation.

Mastering how to use LLMs to streamline development workflows.

Creating hyper-realistic AI images and videos for project mockups and UI design.

Building Custom GPTs tailored for specific use-cases.

Automating tasks with no-code tools like Make and Zapier—game-changers for productivity!"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {profileImageUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={profileImageUrl} 
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Upload className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-600">Upload Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateLinkedInPostHandler}
                disabled={isGenerating || !formData.fullName || !formData.jobRole || !formData.companyName}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate LinkedIn Post'
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {generatedPost ? (
              <>
                {/* LinkedIn Post Preview */}
                <div
                  ref={linkedinCardRef}
                  className="bg-black rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ 
                    width: '800px', 
                    height: '500px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  </div>

                  {/* Subtle green/yellow glow effect */}
                  <div className="absolute inset-0 rounded-2xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.15)]" />

                  {/* Two Panel Layout */}
                  <div className="flex gap-6 h-full">
                    {/* Left Panel - Profile Information */}
                    <div className="w-1/2 space-y-4">
                      {/* Profile Picture and Information in Same Row */}
                      <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/20">
                        <div className="flex items-center gap-4">
                          {/* Profile Picture */}
                          {profileImageUrl ? (
                            <img 
                              src={profileImageUrl}
                              alt={formData.fullName}
                              className="w-20 h-20 rounded-xl object-cover border-2 border-yellow-500/30 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-xl bg-gray-700 flex items-center justify-center border-2 border-yellow-500/30 flex-shrink-0">
                              <User className="h-10 w-10 text-gray-400" />
                            </div>
                          )}
                          
                          {/* Name and Role Information */}
                          <div className="flex-1 relative">
                            {/* TEACHX Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                              <span className="text-4xl font-bold text-yellow-500 rotate-12">TEACHX</span>
                            </div>
                            
                            <div className="relative z-10">
                              <h3 className="text-2xl font-bold text-white mb-2">{formData.fullName}</h3>
                              <p className="text-lg text-gray-300 mb-1">{formData.jobRole}</p>
                              <p className="text-base text-gray-400">{formData.companyName}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Company Logos Block */}
                      <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/20">
                        <p className="text-sm text-gray-300 text-center mb-3">
                          Joined 3000+ founders & practitioners from brands like
                        </p>
                        <div className="grid grid-cols-5 gap-2 text-xs text-gray-400">
                          <span>Google</span>
                          <span>Microsoft</span>
                          <span>SWIGGY</span>
                          <span>PHILIPS</span>
                          <span>NYKAA</span>
                          <span>Ogilvy</span>
                          <span>Adobe</span>
                          <span>Meta</span>
                          <span>Disney+</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Mastermind Advertisement */}
                    <div className="w-1/2 space-y-4">
                      {/* Outskill Branding */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="grid grid-cols-3 gap-1 w-8 h-8">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-white">Outskill</span>
                      </div>

                      {/* Mastermind Title */}
                      <h2 className="text-4xl font-bold text-white leading-tight">
                        2 Day<br />
                        Generative AI<br />
                        Mastermind
                      </h2>

                      {/* Commitment Quote */}
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-yellow-500/20">
                        <p className="text-lg text-white leading-relaxed">
                          <span className="font-bold">"I am committing 16 hours of my time over 2 Days</span> to attend the Gen AI Mastermind, to learn & get hands on with AI workflows"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-black text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                    Copy to Clipboard
                  </button>

                  <button
                    onClick={downloadImage}
                    disabled={isImageGenerating}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50"
                  >
                    {isImageGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download Image
                      </>
                    )}
                  </button>

                  <button
                    onClick={postToLinkedIn}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0077B5] text-white rounded-lg font-semibold hover:bg-[#005885] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    Post on LinkedIn
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Linkedin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  LinkedIn Post Preview
                </h3>
                <p className="text-gray-500">
                  Fill in your information and click "Generate LinkedIn Post" to see your personalized post preview here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LinkedInPostGenerator;
