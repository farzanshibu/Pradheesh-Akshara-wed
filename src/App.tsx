import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PhotoUpload from './pages/PhotoUpload';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/upload-photos" element={<PhotoUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;