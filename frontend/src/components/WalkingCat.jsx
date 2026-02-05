import { motion } from 'framer-motion';

export const WalkingCat = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      drag
      dragConstraints={{
        top: -300,
        left: -300,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="relative">
        {/* Shadow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/10 rounded-full blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Cat */}
        <motion.div
          className="text-6xl filter drop-shadow-lg"
          animate={{
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          🐈
        </motion.div>
        
        {/* Speech bubble on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: -10 }}
          whileHover={{ opacity: 1, scale: 1, y: -20 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-secondary"
        >
          <p className="text-sm font-semibold text-foreground">Meow! 💕</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-secondary rotate-45" />
        </motion.div>
      </div>
    </motion.div>
  );
};