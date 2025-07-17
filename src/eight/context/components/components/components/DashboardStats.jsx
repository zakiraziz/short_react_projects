'use client';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-20"
    >
      <h1 className="text-4xl font-bold mb-12">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have a project in mind? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <p>📞 (123) 456-7890</p>
            <p>✉️ hello@agency.com</p>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          whileInView={{ x: 0 }}
          initial={{ x: 50 }}
        >
          <div>
            <label className="block mb-1">Name</label>
            <input 
              {...register('name')} 
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input 
              type="email"
              {...register('email')} 
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea 
              {...register('message')} 
              rows="4"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
