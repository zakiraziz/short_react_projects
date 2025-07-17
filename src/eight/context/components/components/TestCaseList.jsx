import { motion } from 'framer-motion';

const services = [
  {
    title: "Web Development",
    description: "Custom websites that perform",
    icon: "💻"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces",
    icon: "🎨"
  }
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Our Services</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
