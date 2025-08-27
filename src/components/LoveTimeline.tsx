import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import Beginning from '../assets/p.webp';
import Meeting from '../assets/f.webp';
import Closer from '../assets/n.webp';
import Milestones from '../assets/m.webp';
import Deeper from '../assets/b.webp';
import Commitment from '../assets/g.webp';
import Planning from '../assets/j.webp';
import Wedding from '../assets/14.webp';


const LoveTimeline: React.FC = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    {
      year: '2019',
      title: 'The Beginning',
      date: 'January 1st - Our Proposal',
      description: 'The day our hearts connected and love began to bloom 💕',
      image: Beginning,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-pink-400 to-rose-500'
    },
    {
      year: '2019',
      title: 'First Meeting',
      date: 'May 25th - Our First Date',
      description: 'The moment we met in person and knew this was something special ✨',
      image: Meeting,
      icon: <MapPin className="h-6 w-6" />,
      color: 'from-purple-400 to-pink-500'
    },
    {
      year: '2020',
      title: 'Growing Closer',
      date: 'A Year of Discovery',
      description: 'Learning about each other, sharing dreams, and building our bond 🌟',
      image: Closer,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      year: '2021',
      title: 'Celebrating Milestones',
      date: 'Graduation & Achievements',
      description: 'Supporting each other through important life moments 🎓',
      image: Milestones,
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      year: '2022',
      title: 'Deeper Connection',
      date: 'Building Our Future',
      description: 'Making plans, dreaming together, and strengthening our love 💝',
      image: Deeper,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      year: '2023',
      title: 'Commitment',
      date: 'Taking the Next Step',
      description: 'Deciding to spend our lives together, forever and always 💑',
      image:Commitment ,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      year: '2024',
      title: 'Wedding Planning',
      date: 'Preparing for Forever',
      description: 'Planning our perfect day and getting ready to become one 📝',
      image: Planning,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      year: '2025',
      title: 'The Wedding',
      date: 'August 31st - Our Big Day',
      description: 'Finally saying "I Do" and starting our married life together 💍',
      image: Wedding,
      icon: <Heart className="h-6 w-6" />,
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <section id="timeline" className="py-12 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Parallax background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-10 text-pink-300 text-4xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-purple-300 text-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Our Love Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Six beautiful years of love, growth, and memories that led us to this perfect moment 💕
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-200 via-purple-200 to-orange-200 rounded-full"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ transform: `translateY(${scrollY * 0.05 * (index + 1)}px)` }}
            >
              {/* Timeline Dot */}
              <motion.div
                className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(236, 72, 153, 0.3)",
                    "0 0 30px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(236, 72, 153, 0.3)"
                  ]
                }}
              >
                <div className="text-white">
                  {event.icon}
                </div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-300" />
                </motion.div>
              </motion.div>

              {/* Content Card */}
              <motion.div
                className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
                whileHover={{ scale: 1.02, rotateY: index % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/70 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-white/50 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Photo */}
                  <div className="w-full h-64 md:h-50 rounded-lg md:rounded-xl mb-4 overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <motion.div 
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${event.color} mb-3`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.year}
                  </motion.div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm md:text-base font-semibold text-pink-600 mb-2">
                    {event.date}
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-600">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveTimeline;