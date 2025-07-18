'use client';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-20 max-w-6xl"
    >
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Contact Us
      </motion.h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            Have a project in mind or questions about our services? We'd love to hear from you.
            Fill out the form or contact us directly.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p>(123) 456-7890</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p>hello@agency.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p>123 Business Ave, Suite 456<br />New York, NY 10001</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
          whileInView={{ x: 0 }}
          initial={{ x: 50 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input 
              {...register('name', { required: 'Name is required' })} 
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input 
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })} 
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Subject</label>
            <select
              {...register('subject')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="project">Project Inquiry</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea 
              {...register('message', { 
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
              })} 
              rows="5"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : 'Send Message'}
          </button>
          
          {submitStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 text-green-700 rounded-lg flex items-start gap-3"
            >
              <FiCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Message sent successfully!</h3>
                <p className="text-sm">We'll get back to you soon.</p>
              </div>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3"
            >
              <FiAlertCircle className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Something went wrong</h3>
                <p className="text-sm">Please try again later.</p>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}
