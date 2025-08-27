import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Heart, Camera, Image, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhotoUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;

    setUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setUploaded(true);
    setUploading(false);
  };

  if (uploaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="h-12 w-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold gradient-text mb-6">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your photos have been uploaded successfully! Thank you for sharing these precious memories with Akshara & Pradheesh 💕
            </p>
            <p className="text-gray-500 mb-8">
              Your photos will be reviewed and added to the wedding gallery soon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  setUploaded(false);
                  setUploadedFiles([]);
                  setGuestInfo({ name: '', email: '', message: '' });
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload More Photos
              </motion.button>
              
              <Link to="/">
                <motion.button
                  className="px-6 py-3 border-2 border-pink-500 text-pink-500 font-semibold rounded-xl hover:bg-pink-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Wedding Site
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-6 w-6 text-pink-500" />
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
                <span className="text-xl font-bold gradient-text">A & P</span>
              </motion.div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors">Home</Link>
              <Link to="/#gallery" className="text-gray-700 hover:text-pink-500 transition-colors">Gallery</Link>
              <Link to="/#rsvp" className="text-gray-700 hover:text-pink-500 transition-colors">RSVP</Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <motion.div
              className="absolute -top-4 -left-4 text-pink-300 text-4xl opacity-50"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              📸
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Share Your Photos
            </h1>
            <motion.div
              className="absolute -bottom-4 -right-4 text-purple-300 text-3xl opacity-50"
              animate={{ 
                rotate: [0, -15, 15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              💕
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Help us capture every beautiful moment! Upload your photos from the wedding celebrations and be part of our eternal memory book 💝
          </p>
          
          {/* Wedding Hashtags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full text-pink-700 font-semibold text-sm">
              #6YearsOfLove
            </span>
            <span className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full text-purple-700 font-semibold text-sm">
              #AksharaWedsPradheesh
            </span>
            <span className="bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full text-orange-700 font-semibold text-sm">
              #LoveWins2025
            </span>
          </div>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Guest Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={guestInfo.message}
                onChange={(e) => setGuestInfo(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Share a memory or message about these photos..."
              />
            </div>

            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-pink-500 bg-pink-50/50' 
                  : 'border-gray-300 hover:border-pink-400 hover:bg-pink-50/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="sr-only"
              />
              
              <motion.div
                className="flex flex-col items-center space-y-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    dragActive 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500' 
                      : 'bg-gradient-to-r from-pink-300 to-purple-400'
                  }`}
                  animate={{ 
                    rotate: dragActive ? [0, 10, -10, 0] : 0,
                    scale: dragActive ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Upload className="h-8 w-8 text-white" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {dragActive ? 'Drop your photos here!' : 'Upload Your Wedding Photos'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Drag and drop your photos here, or{' '}
                    <label htmlFor="file-upload" className="text-pink-500 hover:text-pink-600 cursor-pointer font-semibold">
                      browse to select
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports JPG, PNG, GIF up to 10MB each
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <Image className="h-5 w-5 mr-2 text-pink-500" />
                  Selected Photos ({uploadedFiles.length})
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload preview ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs p-1 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                type="submit"
                disabled={uploadedFiles.length === 0 || uploading}
                className={`inline-flex items-center space-x-2 px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                  uploadedFiles.length === 0 || uploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                }`}
                whileHover={uploadedFiles.length > 0 && !uploading ? { scale: 1.05, y: -2 } : {}}
                whileTap={uploadedFiles.length > 0 && !uploading ? { scale: 0.95 } : {}}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Uploading Photos...</span>
                  </>
                ) : (
                  <>
                    <Camera className="h-5 w-5" />
                    <span>Share Photos ({uploadedFiles.length})</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Photo Upload Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700">High Quality Images</p>
              <p className="text-xs text-gray-500">Upload clear, high-resolution photos</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700">Wedding Moments</p>
              <p className="text-xs text-gray-500">Any photos from the celebration</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-700">Easy Upload</p>
              <p className="text-xs text-gray-500">Drag & drop or click to select</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoUpload;