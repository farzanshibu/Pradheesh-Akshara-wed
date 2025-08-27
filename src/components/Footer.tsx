import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin, Calendar, Instagram, Facebook, Twitter, Camera } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Our Journey', href: '#timeline' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Events', href: '#events' },
    { name: 'RSVP', href: '#rsvp' },
    { name: 'Upload Photos', href: '/upload-photos' }
  ];

  const contactInfo = {
    bride: {
      family: "Mr. Sunil Kumar & Mrs. Sheeja",
      address: '"Thejus Nivas", Perunthattil, Thalassery',
      phone: "9495102601"
    },
    groom: {
      family: "Mr. Prabhakaran P.K. & Mrs. Redhika C.",
      address: '"Pananthura House", Vellaroad, Mankara, Palakkad'
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 text-4xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 text-3xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          💍
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-1/4 text-2xl"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          ✨
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Couple Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="h-8 w-8 text-pink-400 fill-current" />
              <span className="text-2xl font-bold gradient-text">A & P</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              "I have found the one whom my soul loves" - celebrating 6 beautiful years of love and looking forward to forever together.
            </p>
            <div className="flex items-center space-x-2 text-pink-300">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">August 31, 2025</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-pink-300 transition-colors duration-300 flex items-center space-x-2"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Bride's Family</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <Heart className="h-4 w-4 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">{contactInfo.bride.family}</p>
                  <p className="text-sm">{contactInfo.bride.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-400" />
                <span>{contactInfo.bride.phone}</span>
              </div>
            </div>
          </motion.div>

          {/* Contact - Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Groom's Family</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <Heart className="h-4 w-4 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">{contactInfo.groom.family}</p>
                  <p className="text-sm">{contactInfo.groom.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Photo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Stay Connected</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Photo Upload Call-to-Action */}
            {/* <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-white">Share Your Photos</h4>
              <motion.a
                href="/upload-photos"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera className="h-5 w-5" />
                <span>Upload Photos</span>
              </motion.a>
            </div> */}

            {/* Wedding Hashtags */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-white">Wedding Hashtags</h4>
              <div className="flex flex-col space-y-2 text-sm">
                <span className="text-pink-300">#6YearsOfLove</span>
                <span className="text-purple-300">#AksharaWedsPradheesh</span>
                <span className="text-orange-300">#LoveWins2025</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 text-center"
        >
          <p className="text-gray-400 mb-2">
            Made with <Heart className="inline h-4 w-4 text-pink-400 fill-current mx-1" /> for Akshara & Pradheesh
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Wedding Website. All rights reserved.
          </p>
          <div className="mt-4 text-gray-400 text-sm">
            <p>With Best Compliments From:</p>
            <p>Abhiram, Vijin, Vinya, Ajanya, Ahaan, Nivaan & All Relatives</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100
            }}
            animate={{ 
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            style={{
              fontSize: Math.random() * 20 + 10 + 'px'
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;