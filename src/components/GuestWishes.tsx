import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const GuestWishes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newWish, setNewWish] = useState({
    name: '',
    message: '',
    relationship: ''
  });
  const [showForm, setShowForm] = useState(false);

  // Show only wishes typed by visitors. Persist in localStorage under 'guest_wishes'.
  type Wish = { id: number; name: string; message: string; relationship?: string; date: string };
  const [wishesState, setWishesState] = useState<Wish[]>(() => {
    try {
      const raw = localStorage.getItem('guest_wishes');
      return raw ? JSON.parse(raw) as Wish[] : [];
    } catch {
      return [];
    }
  });

  const wishesPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(wishesState.length / wishesPerPage));
  const currentWishes = wishesState.slice(currentPage * wishesPerPage, (currentPage + 1) * wishesPerPage);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    // Save typed wish to local state + localStorage
    const next: Wish = {
      id: Date.now(),
      name: newWish.name || 'Anonymous',
      message: newWish.message,
      relationship: newWish.relationship || '',
      date: new Date().toISOString().slice(0,10)
    };
    const updated = [next, ...wishesState];
    setWishesState(updated);
  try { localStorage.setItem('guest_wishes', JSON.stringify(updated)); } catch { /* ignore storage errors */ }
    setNewWish({ name: '', message: '', relationship: '' });
    setShowForm(false);
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="wishes" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Guest Wishes & Blessings
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Beautiful messages from our loved ones who are celebrating our journey with us 💕
          </p>
          
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Leave a Blessing</span>
          </motion.button>
        </motion.div>

        {/* Wish Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 overflow-hidden"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Share Your Blessing
                </h3>
                <form onSubmit={handleSubmitWish} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={newWish.name}
                        onChange={(e) => setNewWish(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={newWish.relationship}
                        onChange={(e) => setNewWish(prev => ({ ...prev, relationship: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="Friend, Family, Colleague..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={newWish.message}
                      onChange={(e) => setNewWish(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Share your wishes, blessings, or memories with the couple..."
                    />
                  </div>
                  <div className="flex space-x-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Blessing</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishes Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentWishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 h-full relative overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-pink-200/50 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-200/50 to-transparent rounded-tr-full"></div>
                    
                    {/* Stars */}
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                      "{wish.message}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{wish.name}</p>
                        <p className="text-sm text-gray-500">{wish.relationship}</p>
                      </div>
                      <Heart className="h-5 w-5 text-pink-400 fill-current opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-400">{wish.date}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-6">
              <motion.button
                onClick={prevPage}
                className="p-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/50 text-gray-600 hover:text-pink-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-gradient-to-r from-orange-400 to-pink-500'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextPage}
                className="p-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/50 text-gray-600 hover:text-pink-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Social Media Hashtag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Share the Love!</h3>
            <p className="text-lg mb-4">Use our wedding hashtags on social media</p>
            <div className="flex flex-wrap justify-center gap-4 text-xl font-bold">
              <span className="bg-white/20 px-4 py-2 rounded-full">#6YearsOfLove</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">#AksharaWedsPradheesh</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">#LoveWins2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuestWishes;