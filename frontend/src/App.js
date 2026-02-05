import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TopNav } from './components/TopNav';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutHerPage } from './pages/AboutHerPage';
import { MoodPickerPage } from './pages/MoodPickerPage';
import { WalkingCat } from './components/WalkingCat';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen">
        <TopNav />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-her" element={<AboutHerPage />} />
          <Route path="/mood-picker" element={<MoodPickerPage />} />
        </Routes>

        {/* Fixed Elements */}
        <WalkingCat />

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
