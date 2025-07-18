import { motion } from 'framer-motion';
import { Code, Paintbrush, Smartphone, BarChart, Search, Server, Database, Shield } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Web Development",
    description: "Custom websites built for performance, accessibility, and SEO. We use modern frameworks like Next.js to deliver blazing-fast experiences.",
    icon: <Code className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600",
    link: "/services/web-development"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that drive engagement and conversions. User-centered design backed by research and testing.",
    icon: <Paintbrush className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600",
    link: "/services/ui-ux-design"
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile applications with React Native that work seamlessly on iOS and Android.",
    icon: <Smartphone className="w-8 h-8" />,
    color: "bg-green-100 text-green-600",
    link: "/services/mobile-apps"
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence through SEO, PPC, and social media marketing.",
    icon: <BarChart className="w-8 h-8" />,
    color: "bg-yellow-100 text-yellow-600",
    link: "/services/digital-marketing"
  },
  {
    title: "SEO Optimization",
    description: "Increase your organic traffic with comprehensive technical and content SEO strategies.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-red-100 text-red-600",
    link: "/services/seo"
  },
  {
    title: "Backend Solutions",
    description: "Scalable server architecture, APIs, and database solutions to power your applications.",
    icon: <Server className="w-8 h-8" />,
    color: "bg-indigo-100 text-indigo-600",
    link: "/services/backend"
  },
  {
    title: "Data Analytics",
    description: "Turn your data into actionable insights with custom dashboards and reporting tools.",
    icon: <Database className="w-8 h-8" />,
    color: "bg-pink-100 text-pink-600",
    link: "/services/data-analytics"
  },
  {
    title: "Security Audits",
    description: "Comprehensive security reviews and penetration testing to protect your digital assets.",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-orange-100 text-orange-600",
    link: "/services/security"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and challenges."
  },
  {
    step: "02",
    title: "Strategy",
    description: "We create a customized plan to achieve your objectives."
  },
  {
    step: "03",
    title: "Design",
    description: "We craft beautiful, functional designs for your approval."
  },
  {
    step: "04",
    title: "Development",
    description: "Our team builds your solution with clean, efficient code."
  },
  {
    step: "05",
    title: "Testing",
    description: "We rigorously test everything before launch."
  },
  {
    step: "06",
    title: "Launch & Support",
    description: "We deploy your solution and provide ongoing support."
  }
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive digital solutions tailored to your business needs. We combine technical expertise with creative thinking to deliver exceptional results.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
          >
            <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <Link 
              href={service.link}
              className="inline-flex items-center text-blue-600 font-medium group"
            >
              Learn more
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Process Section */}
      <div className="py-16 bg-gray-50 rounded-2xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600">
              A transparent, collaborative approach that ensures your project's success from concept to launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-gray-300 mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to discuss your project?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Let's talk about how we can help you achieve your business goals.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
          <Link 
            href="/portfolio" 
            className="px-8 py-3 border border-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
