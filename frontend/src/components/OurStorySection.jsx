import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="our-story" className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background" />
      
      {/* Floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-4 text-foreground">
            Our Story 📖
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 sm:p-12 shadow-xl"
        >
          {/* Cat illustration peek */}
          <motion.div
            className="absolute -top-8 -right-8 text-7xl hidden sm:block"
            animate={{ 
              rotate: [0, -10, 10, 0],
              y: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐱
          </motion.div>

          <div className="space-y-6 text-foreground/90">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl leading-relaxed"
            >
              Once upon a time, in a world filled with yarn balls and cozy blankets, 
              two hearts met and created a love story sweeter than catnip. Every moment 
              with you feels like coming home to the warmest, most loving embrace.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl leading-relaxed"
            >
              Just like how a cat finds the perfect sunny spot, I found my perfect place 
              right next to you. Your smile brightens my day, your laughter is my favorite 
              melody, and your love is the greatest adventure I could ever ask for.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg sm:text-xl leading-relaxed"
            >
              Together, we've created countless memories, shared endless cuddles, and built 
              a love that's stronger than any bond. You're not just my girlfriend, you're 
              my best friend, my confidant, and my forever person. I love you more than 
              words can express, more than all the cats in the world combined! 🐾💕
            </motion.p>
          </div>

          {/* Decorative paw prints */}
          <div className="mt-8 flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="text-3xl"
              >
                🐾
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};