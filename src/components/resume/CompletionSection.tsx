import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Download, Eye, X, Code2 } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import PDFPreview from './PDFPreview';

interface CompletionSectionProps {
  resumeData: any;
  onPreview: () => void;
  onDownload: () => void;
}

export function CompletionSection({ resumeData, onPreview, onDownload }: CompletionSectionProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleDownload = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    onDownload();
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <FileCheck className="h-10 w-10 text-green-600" />
      </motion.div>

      <h3 className="text-2xl font-bold mb-4">Resume Complete!</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your professional resume is ready. Preview it to make final adjustments or download it to start applying for jobs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <button
          onClick={handlePreview}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl
                   hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Eye className="h-5 w-5" />
          Preview Resume
        </button>
        
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl
                   hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl max-w-md mx-auto">
        <p className="text-sm text-blue-600">
          Pro tip: Keep your resume updated regularly and customize it for each job application.
        </p>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
          > 
            {/* Toggle between HTML and PDF preview */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Resume Preview</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-30deg] select-none">
              <div className="flex items-center gap-2 text-4xl font-bold text-black">
                <div className="relative">
                  <div className="bg-black text-white font-bold text-4xl w-12 h-12 flex items-center justify-center rounded-lg">
                    X
                  </div>
                </div>
                teachXpro
              </div>
            </div>

            <div className="p-6">
              <PDFPreview resumeData={resumeData} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}