import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Loader2,
  Shield,
  FileText,
  Building2,
  User,
  Calendar,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CertificateData {
  id: string;
  full_name: string;
  college_email: string;
  college_name: string;
  program: string;
  branch: string;
  year: string;
  city: string;
  mode: string;
  payment_status: string;
  created_at: string;
  certificate_ssn: string;
}

function CertificateVerify() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (certificateId) {
      fetchCertificateData();
    }
  }, [certificateId]);

  const fetchCertificateData = async () => {
    try {
      setLoading(true);
      
      // First try to find with completed payment status
      const { data, error } = await supabase
        .from('internship')
        .select('*')
        .eq('id', certificateId)
        .eq('payment_status', 'completed')
        .single();

      if (error && error.code === 'PGRST116') {
        // No rows returned, try to find the certificate with any payment status
        const { data: anyData, error: anyError } = await supabase
          .from('internship')
          .select('*')
          .eq('id', certificateId)
          .single();

        if (anyError) {
          setError('Certificate not found or invalid');
          return;
        }

        if (!anyData) {
          setError('Certificate not found or invalid');
          return;
        }

        setError(`Certificate found but payment status is: ${anyData.payment_status}. Only completed certificates can be verified.`);
        return;
      }

      if (error) {
        setError('Certificate not found or invalid');
        return;
      }

      if (!data) {
        setError('Certificate not found or invalid');
        return;
      }

      setCertificateData(data);
    } catch (err) {
      setError('Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateData) return;

    try {
      setDownloading(true);
      // Get the PDF certificate from Supabase Storage
      // Format: student_id_firstnamelastname.pdf (lowercase names)
      const firstName = certificateData.full_name.split(' ')[0].toLowerCase();
      const lastName = certificateData.full_name.split(' ').slice(1).join('').toLowerCase();
      const certificateFileName = `certificates/${certificateData.id}_${firstName}${lastName}.pdf`;
      
      // Use signed URL for private bucket access
      const { data: signedUrl, error } = await supabase.storage
        .from('internship-certificates')
        .createSignedUrl(certificateFileName, 60); // 60 seconds expiry

      if (error) {
        // Fallback to text certificate if PDF not found
        await downloadTextCertificate();
        return;
      }

      // Download the PDF certificate
      const response = await fetch(signedUrl.signedUrl);
      if (!response.ok) {
        // Fallback to text certificate if PDF not found
        await downloadTextCertificate();
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internship-certificate-${certificateData.full_name.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      // Fallback to text certificate
      await downloadTextCertificate();
    } finally {
      setDownloading(false);
    }
  };

  const downloadTextCertificate = async () => {
    if (!certificateData) return;

    try {
      // Generate certificate content as fallback
      const certificateContent = `
        CERTIFICATE OF INTERNSHIP COMPLETION
        
        This is to certify that
        
        ${certificateData.full_name}
        
        has successfully completed the internship program in
        
        ${certificateData.program}
        
        at ${certificateData.college_name}
        
        Duration: ${certificateData.mode} Training
        Completion Date: ${new Date(certificateData.created_at).toLocaleDateString()}
        
        Certificate ID: ${certificateData.certificate_ssn}
        
        This certificate is digitally verified and can be authenticated
        by scanning the QR code or visiting our verification portal.
        
        TeachXPro
        Empowering Students, Building Careers
      `;

      // Create and download the certificate
      const blob = new Blob([certificateContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `internship-certificate-${certificateData.full_name.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      // Handle error silently
    }
  };

  const viewCertificate = async () => {
    if (!certificateData) return;

    try {
      // Get the PDF certificate from Supabase Storage
      const firstName = certificateData.full_name.split(' ')[0].toLowerCase();
      const lastName = certificateData.full_name.split(' ').slice(1).join('').toLowerCase();
      const certificateFileName = `certificates/${certificateData.id}_${firstName}${lastName}.pdf`;
      
      // Use signed URL for private bucket access
      const { data: signedUrl, error } = await supabase.storage
        .from('internship-certificates')
        .createSignedUrl(certificateFileName, 60); // 60 seconds expiry

      if (error) {
        alert('Error viewing certificate. Please try again.');
        return;
      }

      // Open the PDF in a new tab
      window.open(signedUrl.signedUrl, '_blank');
    } catch (err) {
      alert('Error viewing certificate. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffcf5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificateData) {
    return (
      <div className="min-h-screen bg-[#fffcf5]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h1>
              <p className="text-gray-600 mb-6">{error || 'The certificate you are looking for does not exist or is invalid.'}</p>
              
              <Link
                to="/internships"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf5]">
      {/* Navigation Bar */}
      <div className="bg-black text-white py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/internships"
            className="inline-flex items-center text-white hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Internships
          </Link>
        </div>
      </div>

      {/* Certificate Verification */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verified</h1>
            <p className="text-gray-600">
              This certificate has been verified and is authentic
            </p>
          </div>

          {/* Certificate Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{certificateData.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-semibold text-gray-900">{certificateData.program}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="font-semibold text-gray-900">{certificateData.college_name}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Completion Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(certificateData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Certificate ID</p>
                  <p className="font-mono text-sm text-gray-900">{certificateData.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-semibold text-green-600">Verified & Authentic</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={viewCertificate}
              className="flex-1 sm:flex-none px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Certificate
            </button>
            <button
              onClick={downloadCertificate}
              disabled={downloading}
              className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Certificate
                </>
              )}
            </button>
          </div>

          {/* Verification Note */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>Verified Certificate:</strong> This certificate has been digitally verified and is authentic. 
              It was issued by TeachXPro and can be used for professional purposes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CertificateVerify; 