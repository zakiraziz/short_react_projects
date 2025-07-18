import { ArrowRight, Rocket, Palette, Code, BarChart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Web Design",
      description: "Beautiful, responsive websites tailored to your brand",
      icon: <Palette className="w-8 h-8" />,
      color: "text-purple-600"
    },
    {
      id: 2,
      title: "Development",
      description: "Robust web applications with modern technologies",
      icon: <Code className="w-8 h-8" />,
      color: "text-blue-600"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Data-driven strategies to grow your business",
      icon: <BarChart className="w-8 h-8" />,
      color: "text-green-600"
    }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full mb-4">
            <Rocket className="inline mr-2" /> Now with AI-powered solutions
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Digital Excellence
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          We craft stunning digital experiences that drive results and transform businesses.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link 
            href="/services" 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:shadow-lg"
          >
            Our Services <ArrowRight size={18} />
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors hover:shadow"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Trusted by innovative companies
          </motion.h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {["Company A", "Company B", "Company C", "Company D"].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-medium text-gray-600"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to elevate your digital presence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all ${hoveredService === service.id ? 'shadow-lg' : ''}`}
            >
              <div className={`${service.color} mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center text-blue-600 font-medium group"
              >
                Learn more
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your digital presence?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's build something amazing together.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/contact" 
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link 
                href="/services" 
                className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
