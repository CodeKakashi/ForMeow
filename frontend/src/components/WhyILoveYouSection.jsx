import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

export const WhyILoveYouSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Heart,
      text: "Your smile lights up my world like sunshine on a lazy afternoon. Every time you laugh, my heart does a little happy dance!",
      emoji: "😊"
    },
    {
      icon: Sparkles,
      text: "You make every ordinary moment feel magical. Whether we're cuddling on the couch or going on adventures, everything is better with you.",
      emoji: "✨"
    },
    {
      icon: Star,
      text: "You're my biggest supporter, my safe place, and my favorite person to be silly with. You accept me completely, quirks and all!",
      emoji: "🌟"
    },
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-accent/30 to-primary/40" />
        
        {/* Animated hearts background */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-4 text-foreground">
            Why I Love You 💖
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Let me count the ways...
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Reasons List */}
        <div className="space-y-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="glass-effect rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Custom paw bullet */}
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="flex-shrink-0 text-4xl sm:text-5xl"
                >
                  🐾
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <reason.icon className="w-6 h-6 text-secondary" />
                    <span className="text-2xl">{reason.emoji}</span>
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                    {reason.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <span className="text-2xl">🐱</span>
            <p className="font-heading text-xl text-foreground">
              Forever and always
            </p>
            <span className="text-2xl">💕</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};