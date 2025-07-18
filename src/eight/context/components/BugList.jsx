import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Award, Globe, Rocket, HeartHandshake } from 'lucide-react';

export default function About() {
  const stats = [
    { value: "50+", label: "Successful Projects", icon: <Rocket className="w-6 h-6" /> },
    { value: "15+", label: "Industry Awards", icon: <Award className="w-6 h-6" /> },
    { value: "100%", label: "Client Satisfaction", icon: <HeartHandshake className="w-6 h-6" /> },
    { value: "10+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> }
  ];

  const team = [
    { name: "Alex Johnson", role: "Founder & CEO", image: "/team-1.jpg" },
    { name: "Sarah Chen", role: "Creative Director", image: "/team-2.jpg" },
    { name: "Marcus Lee", role: "Lead Developer", image: "/team-3.jpg" },
    { name: "Priya Patel", role: "Marketing Strategist", image: "/team-4.jpg" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-20"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Our Agency
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're a passionate team of creators, thinkers, and strategists dedicated to crafting exceptional digital experiences.
        </p>
      </motion.div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg">
            Founded in 2020 during a time of digital transformation, we began as a small team with big ideas. 
            What started as a passion project has grown into a full-service digital agency serving clients worldwide.
          </p>
          <p className="text-lg">
            We believe in the power of technology to transform businesses and create meaningful connections. 
            Our approach combines creativity, strategy, and technical excellence to deliver results that matter.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>50+ successful projects delivered with measurable impact</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Award-winning team recognized for innovation and excellence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Global clientele spanning multiple industries and markets</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
        >
          <Image 
            src="/team-meeting.jpg" 
            alt="Team collaborating in our office"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50 rounded-2xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet The Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The brilliant minds behind our success
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-64 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p>We push boundaries and explore new possibilities to deliver cutting-edge solutions.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p>We believe in transparency, honesty, and doing what's right for our clients.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-3">Impact</h3>
              <p>We measure success by the tangible results we create for our clients.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
