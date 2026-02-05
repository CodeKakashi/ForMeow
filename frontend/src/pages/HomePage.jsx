import { HeroSection } from '../components/HeroSection';
import { OurStorySection } from '../components/OurStorySection';
import { GallerySection } from '../components/GallerySection';
import { WhyILoveYouSection } from '../components/WhyILoveYouSection';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <GallerySection />
      <WhyILoveYouSection />
      <Footer />
    </div>
  );
};
