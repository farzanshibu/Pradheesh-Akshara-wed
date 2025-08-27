import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LoveTimeline from '../components/LoveTimeline';
import Gallery from '../components/Gallery';
import EventDetails from '../components/EventDetails';
import RSVP from '../components/RSVP';
import GuestWishes from '../components/GuestWishes';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
    >
      <Header />
      <HeroSection />
      <LoveTimeline />
      <Gallery />
      <EventDetails />
      <RSVP />
      <GuestWishes />
      <Footer />
    </motion.div>
  );
};

export default HomePage;