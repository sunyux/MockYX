// components/ContactPage.js
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const GOOGLE_SHEETS_URL =
    'https://script.google.com/macros/s/AKfycbzZS4cr72S5Qr3QzwneoOtWJFB6hihQlsAY5WaM9pf6I6y5515gaCGTfqswKIv2kPZsLw/exec';

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setSubmitStatus({ type: 'error', message: 'fill in all three — takes 30 sec.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('name', contactForm.name);
      formData.append('email', contactForm.email);
      formData.append('message', contactForm.message);
      formData.append('timestamp', new Date().toISOString());
      formData.append('type', 'contact');

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setSubmitStatus({
        type: 'success',
        message: 'got it — i\'ll reply when i can. thanks for reaching out.',
      });
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'something broke — try again or dm me on insta.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 paper-section">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <h2 className="font-display text-4xl text-stone-800 text-center mb-2">
          write me
        </h2>
        <p className="text-center text-stone-500 text-sm mb-8">
          longer note than the guestbook wall — email me back for real.
        </p>

        <div className="connect-card">
          {submitStatus && (
            <div
              className={`mb-5 p-3 rounded-lg flex items-start gap-2 text-sm ${
                submitStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-rose-50 text-rose-800'
              }`}
            >
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              className="connect-input"
              placeholder="your name"
              disabled={isSubmitting}
            />
            <input
              type="email"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="connect-input"
              placeholder="email so i can reply"
              disabled={isSubmitting}
            />
            <textarea
              required
              rows={5}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="connect-input resize-none"
              placeholder="what's on your mind?"
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting} className="connect-submit">
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'sending…' : 'send'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
