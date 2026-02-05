import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('our-story');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Layer */}
      <motion.div 
        className="parallax-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-primary" />
        
        {/* Floating Paw Prints Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              🐾
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Midground Floating Elements */}
      <div className="parallax-mid w-full h-full pointer-events-none">
        {/* Floating yarn balls */}
        <motion.div
          className="absolute left-[10%] top-[20%] text-6xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🧶
        </motion.div>
        
        <motion.div
          className="absolute right-[15%] top-[30%] text-5xl"
          animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          ❤️
        </motion.div>
        
        <motion.div
          className="absolute left-[20%] bottom-[25%] text-4xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          ☁️
        </motion.div>
        
        <motion.div
          className="absolute right-[25%] bottom-[30%] text-5xl"
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
        >
          🧶
        </motion.div>
      </div>

      {/* Foreground Content */}
      <div className="parallax-fg text-center z-10 px-4">
        {/* Cute Cat Illustration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            >
              <img 
                src="https://source.unsplash.com/400x400/?cute-cat,kitten" 
                alt="Cute cat"
                className="w-64 h-64 rounded-full object-cover shadow-2xl border-8 border-white"
              />
            </motion.div>
            <motion.div 
              className="absolute -top-4 -right-4 text-6xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl mb-4 text-foreground"
        >
          For My Love ❤️
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl sm:text-2xl text-muted-foreground font-medium"
        >
          A purr-fect love story 🐱
        </motion.p>

        {/* Scroll Arrow */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 cursor-pointer bg-transparent border-none outline-none"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <span className="text-sm font-semibold">Scroll Down</span>
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};