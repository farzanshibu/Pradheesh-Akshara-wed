import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Users, MessageSquare, Calendar, Check } from 'lucide-react';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: 'yes',
    guests: '1',
    events: [] as string[],
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const events = [
    { id: 'wedding', label: 'Wedding Ceremony (Aug 31)', icon: '💍' },
    { id: 'reception', label: 'Reception (Sep 1)', icon: '🥂' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (eventId: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-white/50">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-12 w-12 text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-bold gradient-text mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Your RSVP has been received successfully. We can't wait to celebrate with you! 💕
              </p>
              <p className="text-gray-500">
                You'll receive a confirmation email shortly with all the event details.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            RSVP
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please let us know if you'll be joining us for our special celebration! Your presence would mean the world to us 💕
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="+91 9876543210"
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Attendance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Will you be attending? *
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'yes', label: 'Yes, I\'ll be there! 🎉', color: 'from-green-400 to-teal-500' },
                  { value: 'no', label: 'Sorry, can\'t make it 😢', color: 'from-red-400 to-pink-500' }
                ].map((option) => (
                  <motion.label
                    key={option.value}
                    className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.attendance === option.value
                        ? `border-transparent bg-gradient-to-r ${option.color} text-white shadow-lg`
                        : 'border-gray-200 bg-white/50 hover:border-pink-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-center block font-medium">{option.label}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Events Selection */}
            {formData.attendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Which events will you attend? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <motion.label
                      key={event.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.events.includes(event.id)
                          ? 'border-pink-500 bg-pink-50 shadow-md'
                          : 'border-gray-200 bg-white/50 hover:border-pink-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.events.includes(event.id)}
                        onChange={() => handleEventChange(event.id)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{event.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{event.label}</div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Dietary Restrictions */}
            {formData.attendance === 'yes' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dietary Restrictions or Special Requests
                </label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Vegetarian, Vegan, Allergies, etc."
                />
              </motion.div>
            )}

            {/* Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Personal Message or Blessing for the Couple
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Share your best wishes, memories, or blessings for Akshara & Pradheesh..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              viewport={{ once: true }}
              className="text-center pt-6"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send RSVP</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;