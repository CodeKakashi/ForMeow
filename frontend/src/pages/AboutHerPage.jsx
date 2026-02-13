import { motion } from 'framer-motion';

const sparkleTraits = [
  {
    title: 'Gentle Heart',
    description: 'She leads with kindness, even in the smallest moments, and makes everyone feel safe and seen.',
    icon: '💖',
  },
  {
    title: 'Bright Mind',
    description: 'Curious, thoughtful, and always learning, she makes every conversation feel alive.',
    icon: '✨',
  },
  {
    title: 'Playful Soul',
    description: 'Her laughter is the best soundtrack, and her silly side makes every day lighter.',
    icon: '😸',
  },
];

const littleJoys = [
  { title: 'Cozy Mornings', detail: 'warm drinks, soft blankets, and quiet smiles', icon: '☕' },
  { title: 'Sunset Walks', detail: 'golden skies and gentle hand-holds', icon: '🌅' },
  { title: 'Sweet Treats', detail: 'tiny desserts that make her eyes sparkle', icon: '🧁' },
  { title: 'Silly Photos', detail: 'capturing the giggles and candid joy', icon: '📸' },
  { title: 'Cat Cuddles', detail: 'purring moments and soft fur hugs', icon: '🐾' },
  { title: 'Favorite Songs', detail: 'the ones that feel like us', icon: '🎶' },
];

const memoryMoments = [
  {
    title: 'The First Hello',
    detail: 'A simple moment that felt like the start of something magical.',
    tag: 'Soft beginnings',
    emoji: '💬',
  },
  {
    title: 'The Cozy Day',
    detail: 'A day full of warmth, smiles, and a love that felt like home.',
    tag: 'Little comforts',
    emoji: '🏡',
  },
  {
    title: 'The Sweet Surprise',
    detail: 'Her joy was the brightest thing in the room.',
    tag: 'Big smiles',
    emoji: '🎁',
  },
];

export const AboutHerPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-primary opacity-70" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [-20, -60, -20], opacity: [0.1, 0.35, 0.1] }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {i % 2 === 0 ? '💗' : '✨'}
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                <span>💌</span>
                <span>About Her</span>
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-foreground">
                The Heart of My World
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                She is warmth, wonder, and the kind of love that makes everything feel brighter. This
                page is a little constellation of the things that make her so special.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Kind', 'Brilliant', 'Playful', 'Caring', 'Mischievous', 'Adorable', 'Gentle', 'Horny', 'Sexy'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-white/60 blur-2xl" />
              <div className="glass-effect rounded-3xl p-6 shadow-xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://source.unsplash.com/700x900/?roses,romantic"
                    alt="A soft romantic bouquet"
                    className="h-80 w-full object-cover sm:h-[28rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-foreground">
                    A little space for her favorite photo.
                  </div>
                </div>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p>Her smile feels like sunshine.</p>
                  <p>Her presence feels like home.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sparkle Traits */}
      <section className="relative px-4 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Her Sparkle ✨</h2>
            <p className="text-lg text-muted-foreground">
              A few of the many reasons she makes everything better.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {sparkleTraits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-3xl p-6 shadow-xl"
              >
                <div className="text-3xl mb-4">{trait.icon}</div>
                <h3 className="font-heading text-2xl text-foreground mb-2">{trait.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{trait.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Little Joys */}
      <section className="relative px-4 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/40 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Little Joys 🌸</h2>
            <p className="text-lg text-muted-foreground">
              The everyday things that make her eyes light up.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {littleJoys.map((joy, index) => (
              <motion.div
                key={joy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-3xl bg-white/70 p-5 shadow-md border border-white/60"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{joy.icon}</span>
                  <div>
                    <h3 className="font-heading text-2xl text-foreground">{joy.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{joy.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Favorite Memories */}
      <section className="relative px-4 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Favorite Moments 📖</h2>
            <p className="text-lg text-muted-foreground">
              Small snapshots of the love that keeps growing.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {memoryMoments.map((moment, index) => (
              <motion.div
                key={moment.title}
                initial={{ opacity: 0, y: 30, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="polaroid"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{moment.emoji}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {moment.tag}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-foreground mt-4">{moment.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{moment.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Letter */}
      <section className="relative px-4 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-accent/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-10 sm:p-12 shadow-xl text-center space-y-6"
          >
            <div className="text-4xl">💞</div>
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground">A Little Love Note</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You make the world gentler, brighter, and more beautiful. Every day with you feels like
              a gift I get to open again and again. Thank you for being the sweetest part of my life.
            </p>
            <div className="flex justify-center gap-3 text-2xl opacity-70">
              <span>🐾</span>
              <span>❤️</span>
              <span>🐾</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
