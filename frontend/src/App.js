import { useEffect, useRef } from 'react';
import './App.css';
import clickSound from './assets/mouseclick.wav';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { TopNav } from './components/TopNav';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutHerPage } from './pages/AboutHerPage';
import { MoodPickerPage } from './pages/MoodPickerPage';
import { CatQuizPage } from './pages/CatQuizPage';
import { ChaosLandingPage } from './pages/ChaosLandingPage';
import { CouponVaultPage } from './pages/CouponVaultPage';
import { FunFactsPage } from './pages/FunFactsPage';
import { WalkingCat } from './components/WalkingCat';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

const AppShell = () => {
  const location = useLocation();
  const isChaosLanding = location.pathname === '/';
  const clickAudioRef = useRef(null);
  const lastClickAtRef = useRef(0);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(clickSound);
    audio.volume = 0.35;
    audio.preload = 'auto';
    clickAudioRef.current = audio;

    const handlePointerDown = () => {
      const now = Date.now();
      if (now - lastClickAtRef.current < 18) {
        return;
      }
      lastClickAtRef.current = now;
      clickCountRef.current += 1;

      if (clickCountRef.current % 10 !== 0) {
        return;
      }

      const clickAudio = clickAudioRef.current;
      if (!clickAudio) {
        return;
      }

      try {
        clickAudio.currentTime = 0;
        // const playPromise = clickAudio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      } catch {
        // Ignore autoplay or decoding errors.
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="App min-h-screen">
      {!isChaosLanding && <TopNav />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<ChaosLandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about-her" element={<AboutHerPage />} />
        <Route path="/mood-picker" element={<MoodPickerPage />} />
        <Route path="/cat-quiz" element={<CatQuizPage />} />
        <Route path="/coupon-vault" element={<CouponVaultPage />} />
        <Route path="/fun-facts" element={<FunFactsPage />} />
      </Routes>

      {!isChaosLanding && <Footer />}
      {/* Fixed Elements */}
      {!isChaosLanding && <WalkingCat />}

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
