import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const ConfettiButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const triggerConfetti = () => {
    setIsPressed(true);
    
    // Custom confetti with hearts and cat emojis
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 100,
        scalar: 1.2,
        shapes: ['circle', 'square'],
        colors: ['#FFD4DF', '#FFE0ED', '#F1DCCD', '#FF69B4', '#FFB6C1', '#FFC0CB'],
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Emoji confetti
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: '❤️', scalar });
    const cat = confetti.shapeFromText({ text: '🐱', scalar });
    const yarn = confetti.shapeFromText({ text: '🧶', scalar });

    confetti({
      ...defaults,
      particleCount: 30,
      spread: 120,
      startVelocity: 30,
      shapes: [heart, cat, yarn],
      scalar,
    });

    setTimeout(() => setIsPressed(false), 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block"
    >
      <motion.span
        className="pointer-events-none absolute -inset-3 rounded-full bg-pink-300/20 blur-xl"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="pointer-events-none absolute -top-3 -left-2 text-xl"
        animate={{ y: [0, -6, 0], rotate: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -top-4 right-2 text-2xl"
        animate={{ y: [0, -8, 0], rotate: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        ✨
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -bottom-3 left-4 text-lg"
        animate={{ y: [0, -5, 0], rotate: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
      >
        ✨
      </motion.span>
      <motion.span
        className="pointer-events-none absolute -bottom-3 right-6 text-xl"
        animate={{ y: [0, -6, 0], rotate: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        ✨
      </motion.span>
      <Button
        onClick={triggerConfetti}
        disabled={isPressed}
        size="lg"
        className="relative bg-gradient-to-r from-secondary via-accent to-primary hover:opacity-90 text-foreground font-semibold text-lg px-8 py-6 rounded-full shadow-[0_0_25px_rgba(255,182,193,0.55)] hover:shadow-[0_0_40px_rgba(255,105,180,0.75)] transition-all duration-300 border-2 border-white/70"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <Sparkles className="w-5 h-5 mr-2" />
        </motion.span>
        {isPressed ? '✨ Showering Love! ✨' : '💖 Press Me! 💖'}
        <motion.span
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          className="inline-flex"
        >
          <Sparkles className="w-5 h-5 ml-2" />
        </motion.span>
      </Button>
    </motion.div>
  );
};
