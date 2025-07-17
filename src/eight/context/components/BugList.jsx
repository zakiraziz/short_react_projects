import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-20"
    >
      <h1 className="text-4xl font-bold mb-12">About Our Agency</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg mb-6">
            Founded in 2020, we've grown from a small team to a full-service digital agency.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              50+ Successful projects
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Award-winning team
            </li>
          </ul>
        </motion.div>

        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-80"
        >
          <Image 
            src="/team-meeting.jpg" 
            alt="Team meeting"
            fill
            className="object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
