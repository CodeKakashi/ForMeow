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
  const isLocked = !isChaosLanding;
  const clickAudioRef = useRef(null);
  const lastClickAtRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(clickSound);
    audio.volume = 0.35;
    audio.preload = 'auto';
    clickAudioRef.current = audio;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const button = target.closest('button, [role="button"]');
      if (!button || button.hasAttribute('disabled')) {
        return;
      }

      const now = Date.now();
      if (now - lastClickAtRef.current < 18) {
        return;
      }
      lastClickAtRef.current = now;

      const clickAudio = clickAudioRef.current;
      if (!clickAudio) {
        return;
      }

      try {
        clickAudio.currentTime = 0;
        const playPromise = clickAudio.play();
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
      <div className="relative min-h-screen">
        <div className={isLocked ? 'pointer-events-none select-none blur-md' : ''}>
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
        </div>

        {isLocked && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center px-6 pt-6">
            <div className="w-full max-w-2xl rounded-3xl border border-white/75 bg-white/85 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Come Back Soon</p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-foreground sm:text-5xl">
                Baby you should Come back on Feb 15 for more suprise
              </h2>
              <p className="mt-4 text-sm font-medium text-foreground/70">
                The rest stays hidden until then.
              </p>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
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
