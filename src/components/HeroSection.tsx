import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Sparkles } from 'lucide-react';
import bannerImg from '../assets/01.jpg';
import bannerRoundImg from '../assets/04.jpg';


const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-08-31T10:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Full-width Banner Image */}
      <div className="absolute inset-0">
        <img 
          src={bannerImg}
          alt="Akshara & Pradheesh Wedding Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-900/60 to-yellow-900/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
      {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-yellow-100/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      
      {/* Background Animation */}
      <div className="absolute inset-0">
        {/* Mobile-optimized floating elements */}
        <motion.div
            className="absolute top-16 left-4 md:top-20 md:left-10 text-amber-300 text-2xl md:text-4xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          💕
        </motion.div>
        <motion.div
            className="absolute top-1/4 right-4 md:top-1/3 md:right-20 text-orange-300 text-xl md:text-3xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          💝
        </motion.div>
        <motion.div
            className="absolute bottom-1/3 left-1/4 text-amber-200 text-lg md:text-2xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          💖
        </motion.div>
        
        {/* Additional mobile elements */}
        <motion.div
          className="absolute top-1/2 left-8 text-yellow-300 text-lg md:text-xl"
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-8 text-orange-300 text-lg md:text-xl"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -12, 12, 0],
            scale: [1, 1.25, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          🌟
        </motion.div>
      </div>

        <div className="container mx-auto px-4 text-center" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl max-w-4xl mx-auto border border-white/20"
        >
          {/* Couple Photo Placeholder */}
          <motion.div
              className="w-40 h-40 md:w-64 md:h-64 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center shadow-xl relative overflow-hidden border-4 border-white/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Placeholder for couple photo */}
            <img 
                src={bannerRoundImg} 
              alt="Akshara & Pradheesh" 
              className="w-full h-full object-cover"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
            <motion.div 
              className="absolute top-2 right-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </motion.div>
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
              className="text-base md:text-xl italic text-white mb-4 md:mb-6 font-serif px-2 drop-shadow-lg"
          >
            "I have found the one whom my soul loves"
          </motion.p>

          {/* Names */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-6 md:mb-8"
          >
            <motion.h1 
                className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-3 md:mb-4 drop-shadow-lg"
              animate={{ 
                textShadow: [
                    "0 0 10px rgba(251, 191, 36, 0.3)",
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                    "0 0 10px rgba(251, 191, 36, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Akshara & Pradheesh
            </motion.h1>
              <p className="text-lg md:text-2xl text-white font-light drop-shadow-lg">
              Are Getting Married!
            </p>
          </motion.div>

          {/* Wedding Date */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-6 md:mb-8"
          >
              <div className="flex items-center justify-center space-x-2 text-xl md:text-3xl font-semibold text-white mb-2 drop-shadow-lg">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-amber-300" />
              <span>August 31, 2025</span>
            </div>
              <p className="text-base md:text-lg text-white/90 drop-shadow-lg">Sunday • 10:00 AM - 11:00 AM</p>
              <p className="text-base md:text-lg text-white/90 drop-shadow-lg">GURUKRIPA Auditorium, Peruntattil</p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-md mx-auto"
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <motion.div
                key={item.label}
                  className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 shadow-lg border border-white/30"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                  <div className="text-xl md:text-3xl font-bold text-amber-200 drop-shadow-lg">
                  {item.value.toString().padStart(2, '0')}
                </div>
                  <div className="text-xs md:text-base text-white/90 font-medium drop-shadow-lg">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
              className="mt-4 md:mt-6 text-base md:text-lg text-white/90 font-medium drop-shadow-lg"
          >
            Until We Say "I Do" 💕
          </motion.p>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;