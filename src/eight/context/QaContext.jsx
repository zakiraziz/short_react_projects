import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center"
    >
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Digital Excellence
        </motion.h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We craft stunning digital experiences that drive results.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/services" 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Our Services <ArrowRight size={18} />
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </motion.main>
  );
}
