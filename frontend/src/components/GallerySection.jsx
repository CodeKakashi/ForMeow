import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const photos = [
    {
      id: 1,
      url: 'https://placekitten.com/400/500',
      caption: 'Our first meow-ment',
      rotation: -3,
    },
    {
      id: 2,
      url: 'https://placekitten.com/500/400',
      caption: 'Purr-fect together',
      rotation: 2,
    },
    {
      id: 3,
      url: 'https://placekitten.com/450/450',
      caption: 'Forever and always',
      rotation: -2,
    },
    {
      id: 4,
      url: 'https://placekitten.com/400/450',
      caption: 'You and meow',
      rotation: 3,
    },
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
      
      {/* Floating yarn balls */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🧶
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-4 text-foreground">
            The Gallery 📸
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Our precious memories captured in time
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotate: photo.rotation 
              } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              className="polaroid cursor-pointer"
              style={{ rotate: `${photo.rotation}deg` }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-64 object-cover"
                />
                {/* Heart overlay on hover */}
                <motion.div 
                  className="absolute inset-0 bg-secondary/0 flex items-center justify-center"
                  whileHover={{ backgroundColor: 'hsl(340 100% 93% / 0.3)' }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="text-6xl"
                  >
                    ❤️
                  </motion.span>
                </motion.div>
              </div>
              
              <p className="text-center mt-4 font-heading text-lg text-foreground">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative cats peeking */}
        <motion.div
          className="absolute -left-4 top-1/2 text-6xl hidden lg:block"
          animate={{ x: [-10, 0, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          😺
        </motion.div>
        
        <motion.div
          className="absolute -right-4 top-1/3 text-6xl hidden lg:block"
          animate={{ x: [10, 0, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          😻
        </motion.div>
      </div>
    </section>
  );
};