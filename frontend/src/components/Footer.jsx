import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ConfettiButton } from './ConfettiButton';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-accent/30 to-transparent" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? '🐾' : i % 3 === 1 ? '❤️' : '🧶'}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        {/* Confetti Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ConfettiButton />
        </motion.div>

        {/* Walking Cat */}
        <motion.div
          className="flex justify-center"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🐱
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 shadow-xl inline-block"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-secondary fill-secondary" />
            </motion.div>
            <h3 className="font-heading text-3xl sm:text-4xl text-foreground">
              Made with Love and Purrs
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <Heart className="w-8 h-8 text-secondary fill-secondary" />
            </motion.div>
          </div>
          
          <p className="text-muted-foreground text-lg">
            For the most amazing person in the world 💕
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground"
        >
          © {currentYear} • Forever Yours
        </motion.p>

        {/* Decorative paw prints */}
        <div className="flex justify-center gap-4 text-2xl opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              🐾
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
};