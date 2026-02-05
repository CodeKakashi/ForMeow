import { HeroSection } from '../components/HeroSection';
import { OurStorySection } from '../components/OurStorySection';
import { GallerySection } from '../components/GallerySection';
import { WhyILoveYouSection } from '../components/WhyILoveYouSection';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <GallerySection />
      <WhyILoveYouSection />
    </div>
  );
};
