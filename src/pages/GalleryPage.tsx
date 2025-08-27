import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleDriveGallery from '../components/GoogleDriveGallery';
import { Share2, DownloadCloud } from 'lucide-react';

// Wrapper component for Wedding Gallery
const WeddingGallery: React.FC<{ onPhotosAvailable: (hasPhotos: boolean) => void }> = ({ onPhotosAvailable }) => {
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkWeddingPhotos = async () => {
      try {
        const API_KEY = 'AIzaSyBNn-27uk3XXKmsj8PtZJwWc7ZBcz-ouRo';
        const FOLDER_ID = '1RE_611tbYddCK2uQoTDKl3KSY85RLbTU';
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name)&key=${API_KEY}`
        );
        const data = await response.json();
        const hasPhotos = data.files && data.files.length > 0;
        setPhotos(data.files || []);
        onPhotosAvailable(hasPhotos);
      } catch (error) {
        console.error('Error checking wedding photos:', error);
        onPhotosAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    checkWeddingPhotos();
  }, [onPhotosAvailable]);

  if (loading || photos.length === 0) return null;

  return (
    <GoogleDriveGallery
      className="mb-8"
      folderId="1RE_611tbYddCK2uQoTDKl3KSY85RLbTU"
      title="Live Wedding Gallery"
      description="Fresh photos from our special day!"
      gradientFrom="purple-500"
      gradientTo="pink-500"
      textColor="text-purple-700"
    />
  );
};

// Wrapper component for Reception Gallery
const ReceptionGallery: React.FC<{ onPhotosAvailable: (hasPhotos: boolean) => void }> = ({ onPhotosAvailable }) => {
  const [photos, setPhotos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkReceptionPhotos = async () => {
      try {
        const API_KEY = 'AIzaSyBNn-27uk3XXKmsj8PtZJwWc7ZBcz-ouRo';
        const FOLDER_ID = '1W3_aUFcDsB8HRodZ7_dZPDsqQ3zM81sY';
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name)&key=${API_KEY}`
        );
        const data = await response.json();
        const hasPhotos = data.files && data.files.length > 0;
        setPhotos(data.files || []);
        onPhotosAvailable(hasPhotos);
      } catch (error) {
        console.error('Error checking reception photos:', error);
        onPhotosAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    checkReceptionPhotos();
  }, [onPhotosAvailable]);

  if (loading || photos.length === 0) return null;

  return (
    <GoogleDriveGallery
      className="mb-8"
      folderId="1W3_aUFcDsB8HRodZ7_dZPDsqQ3zM81sY"
      title="Live Reception Gallery"
      description="Beautiful moments from our reception!"
      gradientFrom="emerald-400"
      gradientTo="green-600"
      textColor="text-emerald-800"
    />
  );
};

// Grid that shows only the "now" photos (01..20) and a per-photo share button
const NowPhotosGrid: React.FC = () => {
  const [hasWeddingPhotos, setHasWeddingPhotos] = React.useState(false);
  const [hasReceptionPhotos, setHasReceptionPhotos] = React.useState(false);
  
  // load assets via Vite glob
  const assets = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { as: 'url', eager: true }) as Record<string, string>;

  const getAsset = (filename: string) => {
    const entry = Object.entries(assets).find(([path]) => path.endsWith(`/${filename}`));
    return entry ? entry[1] : '';
  };

  const nowPhotos = Array.from({ length: 20 }, (_, i) => {
    const jpg = String(i + 1).padStart(2, '0') + '.jpg';
    const png = String(i + 1).padStart(2, '0') + '.png';
    const webp = String(i + 1).padStart(2, '0') + '.webp';
    return {
      id: i + 1,
      src: getAsset(webp) || getAsset(jpg) || getAsset(png) || '',
      alt: `Recent photo ${i + 1}`,
    };
  }).filter(p => p.src);

  // loading state for thumbnails
  const [loaded, setLoaded] = React.useState<Record<string, boolean>>({});
  const handleLoad = (src: string) => setLoaded((s) => ({ ...s, [src]: true }));

  // small thumbnails for Wedding and Reception sections
  const weddingThumbs = ['11.jpg', '12.jpg', '13.jpg'].map((n) => getAsset(n)).filter((s) => !!s) as string[];
  const receptionThumbs = ['14.jpg', '15.jpg', '16.jpg'].map((n) => getAsset(n)).filter((s) => !!s) as string[];

  // countdown helpers
  const calcRemaining = (target: Date) => {
    const total = Math.max(0, target.getTime() - Date.now());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [weddingLeft, setWeddingLeft] = React.useState(() => calcRemaining(new Date('2025-08-31T10:00:00')));
  const [receptionLeft, setReceptionLeft] = React.useState(() => calcRemaining(new Date('2025-09-01T19:00:00')));

  React.useEffect(() => {
    const weddingDate = new Date('2025-08-31T10:00:00');
    const receptionDate = new Date('2025-09-01T19:00:00');
    const id = setInterval(() => {
      setWeddingLeft(calcRemaining(weddingDate));
      setReceptionLeft(calcRemaining(receptionDate));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const sharePhoto = async (photoUrl: string) => {
    try {
      // feature-detect Web Share API
      const nav = navigator as Navigator & { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> };
      if (typeof nav.share === 'function') {
        await nav.share({ title: 'Live Wedding Photo', text: 'Check out this photo from our wedding gallery', url: photoUrl });
        return;
      }

      // Fallback: copy the absolute URL to clipboard
      await navigator.clipboard.writeText(photoUrl);
      // minimal feedback
      alert('Photo URL copied to clipboard. Share it with your friends!');
    } catch (err) {
      console.error('Share failed', err);
      alert('Unable to share or copy the photo URL.');
    }
  };

  const downloadPhoto = async (photoUrl: string, id: number) => {
    try {
      const res = await fetch(photoUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const parts = photoUrl.split('.');
      const ext = parts[parts.length - 1].split('?')[0] || 'jpg';
      const a = document.createElement('a');
      a.href = url;
      a.download = `save-the-date-${String(id).padStart(2, '0')}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
      alert('Unable to download the photo.');
    }
  };

  return (
    <div>
      {/* Wedding Photos Coming Soon (hide when photos are available) */}
      <motion.div 
        initial={{ opacity: 0, y: 6 }} 
        animate={{ opacity: hasWeddingPhotos ? 0 : 1, y: 0 }} 
        className={`mb-6 p-6 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 text-center border border-dashed border-gray-200 transition-opacity duration-500 ${
          hasWeddingPhotos ? 'hidden' : 'block'
        }`}
      >
        <h4 className="text-xl font-semibold mb-2 inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white">Wedding Photos — Coming Soon</h4>
        <p className="text-rose-700 mt-3">Live uploads and the complete wedding gallery will appear here on the wedding day.</p>

        {/* Wedding countdown */}
        <div className="mt-4 flex items-center justify-center space-x-3">
          {weddingLeft.days > 0 || weddingLeft.hours > 0 || weddingLeft.minutes > 0 || weddingLeft.seconds > 0 ? (
            [{label: 'Days', value: weddingLeft.days}, {label: 'Hours', value: weddingLeft.hours}, {label: 'Minutes', value: weddingLeft.minutes}, {label: 'Seconds', value: weddingLeft.seconds}].map((it) => (
              <div key={it.label} className="bg-white/90 text-rose-700 px-3 py-2 rounded-md shadow-sm">
                <div className="font-bold text-lg">{String(it.value).padStart(2, '0')}</div>
                <div className="text-xs">{it.label}</div>
              </div>
            ))
          ) : (
            <div className="text-rose-700 font-semibold text-lg">
              🎉 The Wedding Day is Here! 🎉
            </div>
          )}
        </div>

        {/* Wedding thumbnails (loading placeholders) */}
        <div className="mt-4 flex justify-center space-x-3">
          {weddingThumbs.map((src) => (
            <div key={src} className="w-24 h-16 rounded overflow-hidden bg-gray-100 relative">
              {!loaded[src] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
              <img
                src={src}
                alt="wedding thumb"
                loading="lazy"
                onLoad={() => handleLoad(src)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded[src] ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Wedding Gallery - shows when photos are available */}
      <WeddingGallery onPhotosAvailable={setHasWeddingPhotos} />

      {/* Reception section - hide timer when photos are available */}
      <div className={`mb-8 text-center p-4 rounded-md bg-white/30 transition-opacity duration-500 ${
        hasReceptionPhotos ? 'hidden' : 'block'
      }`}>
        <h3 className="text-xl font-semibold mb-2 inline-block px-3 py-1 rounded-md bg-gradient-to-r from-emerald-400 to-green-600 text-white">Reception</h3>
        <p className="text-emerald-800 text-sm">Live uploads and the reception gallery will appear here during and after the reception.</p>

        {/* Reception countdown */}
        <div className="mt-4 flex items-center justify-center space-x-3">
          {receptionLeft.days > 0 || receptionLeft.hours > 0 || receptionLeft.minutes > 0 || receptionLeft.seconds > 0 ? (
            [{label: 'Days', value: receptionLeft.days}, {label: 'Hours', value: receptionLeft.hours}, {label: 'Minutes', value: receptionLeft.minutes}, {label: 'Seconds', value: receptionLeft.seconds}].map((it) => (
              <div key={it.label} className="bg-white/90 text-emerald-800 px-3 py-2 rounded-md shadow-sm">
                <div className="font-bold text-lg">{String(it.value).padStart(2, '0')}</div>
                <div className="text-xs">{it.label}</div>
              </div>
            ))
          ) : (
            <div className="text-emerald-800 font-semibold text-lg">
              🎉 Reception Time is Here! 🎉
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center space-x-3">
          {receptionThumbs.map((src) => (
            <div key={src} className="w-24 h-16 rounded overflow-hidden bg-gray-100 relative">
              {!loaded[src] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
              <img
                src={src}
                alt="reception thumb"
                loading="lazy"
                onLoad={() => handleLoad(src)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded[src] ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reception Gallery - shows when photos are available */}
      <ReceptionGallery onPhotosAvailable={setHasReceptionPhotos} />

      {/* Save the Date section with Download All and Timer */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white">Save the Date</h3>
        <p className="text-orange-700 mb-4">These are our Save-the-Date photos — download and share with loved ones.</p>
        
        {/* Save the Date countdown */}
        <div className="mb-6">
          <p className="text-orange-800 font-semibold mb-3">Time until our special day:</p>
          <div className="flex items-center justify-center space-x-3">
        
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            onClick={async () => {
              // download all photos sequentially
              for (const photo of nowPhotos) {
                try {
                  const res = await fetch(photo.src);
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const parts = photo.src.split('.');
                  const ext = parts[parts.length - 1].split('?')[0] || 'jpg';
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `save-the-date-${String(photo.id).padStart(2, '0')}.${ext}`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error('Failed to download', err);
                }
              }
              alert('Downloads started — check your browser\'s downloads.');
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-md hover:brightness-105 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM7 7a1 1 0 012 0v3h2V7a1 1 0 112 0v3h1a1 1 0 011 1v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a1 1 0 011-1h1V7z" clipRule="evenodd" />
            </svg>
            <span>Download All</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nowPhotos.map((photo) => (
          <div key={photo.id} className="relative rounded-lg overflow-hidden shadow-md">
            <img src={photo.src} alt={photo.alt} className="w-full h-44 object-cover" />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => sharePhoto(photo.src)}
                className="bg-white/80 hover:bg-white px-2 py-1 rounded-full flex items-center space-x-1 text-sm shadow-sm"
                aria-label={`Share photo ${photo.id}`}
              >
                <Share2 className="h-4 w-4 text-gray-700" />
                <span className="hidden md:inline">Share</span>
              </button>
              <button
                onClick={() => downloadPhoto(photo.src, photo.id)}
                className="bg-white/80 hover:bg-white px-2 py-1 rounded-full flex items-center space-x-1 text-sm shadow-sm"
                aria-label={`Download photo ${photo.id}`}
              >
                <DownloadCloud className="h-4 w-4 text-gray-700" />
                <span className="hidden md:inline">Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Coming Soon section for wedding photos */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-12 p-8 rounded-lg bg-white/60 text-center border border-dashed border-gray-200">
        <h4 className="text-xl font-semibold mb-2">Wedding Photos — Coming Soon</h4>
        <p className="text-gray-600">We're preparing the gallery. Check back on the wedding day for live uploads and more memories.</p>
      </motion.div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <NowPhotosGrid />
      </div>
      <Footer />
    </motion.div>
  );
};

export default GalleryPage;
