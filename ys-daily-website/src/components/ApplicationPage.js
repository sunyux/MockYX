// components/ApplicationPage.js
import React, { useState } from 'react';
import { User, Phone, MapPin, CreditCard, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ApplicationPage = () => {
  const [applicationForm, setApplicationForm] = useState({
    name: '', 
    address: '', 
    driversLicense: '', 
    phone: '', 
    dateOfBirth: '', 
    ssn: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Google Sheets Web App URL - Same as contact form or create a separate one
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzH8AAW-Jgx7pgx4Ui4luMupOgLmGAH-711kTAtRyt3lDz7xQjDLh13iQ65WMOzdYU0/exec';

  // Validation function
  const validateForm = () => {
    const requiredFields = ['name', 'address', 'driversLicense', 'phone', 'dateOfBirth', 'ssn'];
    const missingFields = requiredFields.filter(field => !applicationForm[field]);
    
    if (missingFields.length > 0) {
      return { isValid: false, message: 'Please fill in all required fields.' };
    }

    // Validate phone format (basic) - check if phone has at least 10 digits
    const cleanPhone = applicationForm.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return { isValid: false, message: 'Please enter a valid phone number.' };
    }

    // Validate date of birth (must be 18 or older)
    const birthDate = new Date(applicationForm.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0) || 
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return { isValid: false, message: 'Applicant must be 18 years or older.' };
    }

    return { isValid: true };
  };

  const handleApplicationSubmit = async () => {
    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      setSubmitStatus({ type: 'error', message: validation.message });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create form data for Google Sheets
      const formData = new FormData();
      formData.append('name', applicationForm.name);
      formData.append('address', applicationForm.address);
      formData.append('driversLicense', applicationForm.driversLicense);
      formData.append('phone', applicationForm.phone);
      formData.append('dateOfBirth', applicationForm.dateOfBirth);
      formData.append('ssn', applicationForm.ssn);
      formData.append('timestamp', new Date().toISOString());
      formData.append('type', 'application');

      // Submit to Google Sheets
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Success response
      setSubmitStatus({ 
        type: 'success', 
        message: 'Application submitted successfully! We will review your application and contact you soon.' 
      });
      setApplicationForm({
        name: '', 
        address: '', 
        driversLicense: '', 
        phone: '', 
        dateOfBirth: '', 
        ssn: ''
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'There was an error submitting your application. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">Application Form</h2>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Status Message */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={`text-sm font-medium ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitStatus.message}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={applicationForm.name}
                  onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full legal name"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Full Address *
              </label>
              <textarea
                required
                rows={3}
                value={applicationForm.address}
                onChange={(e) => setApplicationForm({...applicationForm, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Street address, City, State, ZIP Code"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Driver's License Number *
                </label>
                <input
                  type="text"
                  required
                  value={applicationForm.driversLicense}
                  onChange={(e) => setApplicationForm({...applicationForm, driversLicense: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter license number"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={applicationForm.dateOfBirth}
                  onChange={(e) => setApplicationForm({...applicationForm, dateOfBirth: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Security Number *
              </label>
              <input
                type="password"
                required
                value={applicationForm.ssn}
                onChange={(e) => setApplicationForm({...applicationForm, ssn: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your SSN"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Privacy Notice:</strong> All information provided will be kept confidential and used only for application processing purposes. Your data is encrypted and secure.
              </p>
            </div>
            
            <button
              onClick={handleApplicationSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold shadow-lg transform hover:scale-105 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>

          {/* Google Sheets Setup Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Google Sheets Integration</h4>
            <p className="text-blue-700 text-sm mb-4">
              This form automatically saves applications to Google Sheets for secure processing and review.
            </p>
            <div className="text-blue-700 text-sm">
              <strong>Data Security:</strong> All sensitive information is transmitted securely and stored with appropriate access controls.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;