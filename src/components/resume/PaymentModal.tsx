import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, CreditCard, QrCode, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'qr' | 'upi' | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Complete Purchase</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isProcessing}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Download your professional resume for ₹19
          </p>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <button
              onClick={() => setSelectedMethod('card')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                selectedMethod === 'card'
                  ? 'border-black bg-black/5 shadow-sm'
                  : 'border-transparent hover:border-black/20'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === 'card' ? 'border-black' : 'border-gray-400'
                }`} />
                {selectedMethod === 'card' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  </div>
                )}
              </div>
              <CreditCard className={`h-5 w-5 ${selectedMethod === 'card' ? 'text-black' : 'text-gray-500'}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-gray-500">Pay securely with your card</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('qr')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                selectedMethod === 'qr'
                  ? 'border-black bg-black/5 shadow-sm'
                  : 'border-transparent hover:border-black/20'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === 'qr' ? 'border-black' : 'border-gray-400'
                }`} />
                {selectedMethod === 'qr' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  </div>
                )}
              </div>
              <QrCode className={`h-5 w-5 ${selectedMethod === 'qr' ? 'text-black' : 'text-gray-500'}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">Scan QR Code</div>
                <div className="text-sm text-gray-500">Pay using any UPI app</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('upi')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                selectedMethod === 'upi'
                  ? 'border-black bg-black/5 shadow-sm'
                  : 'border-transparent hover:border-black/20'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedMethod === 'upi' ? 'border-black' : 'border-gray-400'
                }`} />
                {selectedMethod === 'upi' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  </div>
                )}
              </div>
              <Smartphone className={`h-5 w-5 ${selectedMethod === 'upi' ? 'text-black' : 'text-gray-500'}`} />
              <div className="flex-1 text-left">
                <div className="font-medium">UPI ID / Number</div>
                <div className="text-sm text-gray-500">Pay using UPI ID or number</div>
              </div>
            </button>
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className="w-full py-3 bg-black text-white rounded-xl font-medium
                     hover:bg-gray-800 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹19`
            )}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            By completing this purchase you agree to our terms of service
          </p>
        </div>
      </motion.div>
    </div>
  );
}