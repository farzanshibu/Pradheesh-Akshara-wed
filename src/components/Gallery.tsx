import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, X, Play, Pause } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'then' | 'now'>('then');
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);

  // Load local assets dynamically (Vite) and build photo lists
  const assets = import.meta.glob('../assets/*.{jpg,jpeg,png}', { as: 'url', eager: true }) as Record<string, string>;

  const getAsset = (filename: string) => {
    const entry = Object.entries(assets).find(([path]) => path.endsWith(`/${filename}`));
    return entry ? entry[1] : '';
  };

  // thenPhotos: a.jpg .. p.jpg (16 items)
  const thenNames = Array.from({ length: 16 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
  const thenPhotos = thenNames.map((name, i) => ({
    id: i + 1,
    src: getAsset(`${name}.jpg`) || getAsset(`${name}.jpeg`) || '',
    alt: `Memory ${name.toUpperCase()}`,
    caption: `Beautiful memory 💕`
  }));

  // nowPhotos: 01.jpg .. 20.jpg
  const nowPhotos = Array.from({ length: 20 }, (_, i) => {
    const filename = String(i + 1).padStart(2, '0') + '.jpg';
    return {
      id: i + 1,
      src: getAsset(filename) || '',
      alt: `Recent photo ${i + 1}`,
      caption: `Recent moments together ✨`
    };
  });

  const currentPhotos = activeTab === 'then' ? thenPhotos : nowPhotos;

  // Auto-scroll effect
  React.useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentAutoIndex((prev) => (prev + 1) % currentPhotos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoPlay, currentPhotos.length]);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % currentPhotos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? currentPhotos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">
            Our Photo Gallery
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 px-4">
            Capturing precious moments from our beautiful journey together 📸
          </p>

          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={() => setActiveTab('then')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'then'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Then (2019-2023)
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('now')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'now'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Now (2024-2025)
            </motion.button>
          </div>
        </motion.div>

        {/* Full-width Auto-scrolling Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentAutoIndex}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={currentPhotos[currentAutoIndex]?.src}
                  alt={currentPhotos[currentAutoIndex]?.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">{currentPhotos[currentAutoIndex]?.caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Auto-play controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                onClick={() => setAutoPlay(!autoPlay)}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </motion.button>
            </div>
            
            {/* Progress indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-1">
              {currentPhotos.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentAutoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentAutoIndex(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto"
        >
          {currentPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.03, rotateY: 5 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg aspect-square">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-end p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs md:text-sm font-medium">{photo.caption}</p>
                </div>
                
                {/* Mobile tap indicator */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                  <Heart className="h-3 w-3 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                {/* Image Container */}
                <div className="rounded-xl md:rounded-2xl overflow-hidden max-h-[80vh] max-w-full">
                  <img
                    src={currentPhotos[selectedImage].src}
                    alt={currentPhotos[selectedImage].alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-center">
                  <p className="text-sm md:text-base font-medium">{currentPhotos[selectedImage].caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-gray-600 text-base md:text-lg px-4">
            More photos will be added soon! Check back for updates 📷✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;