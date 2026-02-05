import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { TopNav } from './components/TopNav';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutHerPage } from './pages/AboutHerPage';
import { MoodPickerPage } from './pages/MoodPickerPage';
import { CatQuizPage } from './pages/CatQuizPage';
import { ChaosLandingPage } from './pages/ChaosLandingPage';
import { CouponVaultPage } from './pages/CouponVaultPage';
import { WalkingCat } from './components/WalkingCat';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

const AppShell = () => {
  const location = useLocation();
  const isChaosLanding = location.pathname === '/';

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
      </Routes>

      <Footer />

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
