import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const funFacts = [
  {
    id: 'fact-1',
    title: 'The First Spark',
    detail: 'Placeholder: Our very first “wow” moment together.',
    icon: '🐾',
  },
  {
    id: 'fact-2',
    title: 'Signature Smile',
    detail: 'Placeholder: The smile of hers that melts me instantly.',
    icon: '🧶',
  },
  {
    id: 'fact-3',
    title: 'Cozy Ritual',
    detail: 'Placeholder: Our favorite little routine or habit.',
    icon: '🐾',
  },
  {
    id: 'fact-4',
    title: 'Sweet Snack Truth',
    detail: 'Placeholder: The treat we always end up sharing.',
    icon: '🧶',
  },
  {
    id: 'fact-5',
    title: 'Tiny Habit I Adore',
    detail: 'Placeholder: A small thing she does that I love.',
    icon: '🐾',
  },
  {
    id: 'fact-6',
    title: 'Our Song',
    detail: 'Placeholder: The song that feels like “us.”',
    icon: '🧶',
  },
  {
    id: 'fact-7',
    title: 'Magical Date',
    detail: 'Placeholder: A date that felt like pure magic.',
    icon: '🐾',
  },
  {
    id: 'fact-8',
    title: 'Dreamy Destination',
    detail: 'Placeholder: A place we want to explore together.',
    icon: '🧶',
  },
  {
    id: 'fact-9',
    title: 'The Blush Moment',
    detail: 'Placeholder: The thing she does that makes me blush.',
    icon: '🐾',
  },
  {
    id: 'fact-10',
    title: 'Forever Detail',
    detail: 'Placeholder: A sweet detail I never want to forget.',
    icon: '🧶',
  },
];

const randomMemories = [
  'Placeholder: The first time we laughed so hard we couldn’t breathe.',
  'Placeholder: The compliment she gave me that I replay in my head.',
  'Placeholder: A tiny text she sent that made my whole day.',
  'Placeholder: The look she gave me when she was proud of me.',
  'Placeholder: The cozy moment that felt like home.',
  'Placeholder: Our inside joke that never gets old.',
];

export const FunFactsPage = () => {
  const [openFacts, setOpenFacts] = useState([]);
  const [hoveredFact, setHoveredFact] = useState(null);
  const [randomFact, setRandomFact] = useState('Tap the button to reveal a new memory.');
  const [lastRandomIndex, setLastRandomIndex] = useState(null);
  const containerRef = useRef(null);

  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const catFollowerX = useSpring(cursorX, { stiffness: 150, damping: 18 });
  const catFollowerY = useSpring(cursorY, { stiffness: 150, damping: 18 });
  const kittenFollowerX = useSpring(cursorX, { stiffness: 70, damping: 20 });
  const kittenFollowerY = useSpring(cursorY, { stiffness: 70, damping: 20 });

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: `heart-${index}`,
        left: 10 + ((index * 7.5) % 80),
        top: 8 + ((index * 11) % 82),
        icon: index % 2 === 0 ? '💗' : '💖',
        duration: 4 + (index % 5) * 0.6,
        delay: index * 0.2,
      })),
    [],
  );

  const handleMouseMove = (event) => {
    if (!containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    cursorX.set(-120);
    cursorY.set(-120);
  };

  const toggleFact = (id) => {
    setOpenFacts((previous) =>
      previous.includes(id) ? previous.filter((factId) => factId !== id) : [...previous, id],
    );
  };

  const handleRandomFact = () => {
    if (randomMemories.length === 0) {
      return;
    }

    let nextIndex = Math.floor(Math.random() * randomMemories.length);
    if (randomMemories.length > 1) {
      while (nextIndex === lastRandomIndex) {
        nextIndex = Math.floor(Math.random() * randomMemories.length);
      }
    }
    setLastRandomIndex(nextIndex);
    setRandomFact(randomMemories[nextIndex]);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-4 py-16 sm:py-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-accent/50 to-primary/40" />

      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute animate-float text-2xl opacity-25"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            {heart.icon}
          </span>
        ))}
      </div>

      <motion.span
        className="pointer-events-none absolute left-0 top-0 text-2xl opacity-60"
        style={{ x: catFollowerX, y: catFollowerY }}
      >
        🐱
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-0 top-0 text-xl opacity-40"
        style={{ x: kittenFollowerX, y: kittenFollowerY }}
      >
        😺
      </motion.span>

      <div className="relative mx-auto max-w-6xl">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-md">
            <span>🐾</span>
            <span>Fun Facts</span>
          </div>
          <h1 className="mt-5 font-heading text-5xl sm:text-6xl text-foreground">
            Whisker-Tickling Facts About Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tap the paws and yarn balls to reveal little secrets, memories, and tiny moments that make me fall for you
            even more.
          </p>
        </header>

        <section className="relative mt-12 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-3xl text-foreground">Paws &amp; Yarn Vault</h2>
              <p className="text-sm text-muted-foreground">Hover or tap to reveal each secret.</p>
            </div>
            <div className="flex items-center gap-2 text-xl opacity-60">
              <span className="animate-paw-walk">🐾</span>
              <span>🧶</span>
              <span>🐾</span>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {funFacts.map((fact, index) => {
              const isVisible = openFacts.includes(fact.id) || hoveredFact === fact.id;
              return (
                <motion.button
                  key={fact.id}
                  type="button"
                  onClick={() => toggleFact(fact.id)}
                  onMouseEnter={() => setHoveredFact(fact.id)}
                  onMouseLeave={() => setHoveredFact(null)}
                  className="relative w-full rounded-3xl border border-white/70 bg-white/80 px-5 py-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  aria-expanded={isVisible}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{fact.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Fact {index + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground/80">
                    Tap or hover to reveal this memory.
                  </p>

                  <AnimatePresence>
                    {isVisible && (
                      <motion.div
                        key={`${fact.id}-detail`}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="pointer-events-none absolute inset-3 rounded-2xl border border-rose-200/70 bg-gradient-to-br from-white/90 to-rose-50/90 px-4 py-3 shadow-inner"
                      >
                        <p className="text-sm font-bold text-foreground">{fact.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{fact.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="relative mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <h2 className="font-heading text-3xl text-foreground">Curiosity Corner</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Press the button to pull a random memory out of my heart-shaped treasure chest.
            </p>

            <button
              type="button"
              onClick={handleRandomFact}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-300 via-pink-300 to-orange-200 px-6 py-3 text-sm font-bold text-foreground shadow-lg transition hover:scale-[1.02]"
            >
              Curiosity killed the cat (but not me!)
            </button>

            <div className="mt-6 rounded-2xl border border-rose-200/60 bg-white/80 p-5 text-sm text-foreground shadow-inner">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Random Fact</p>
              <p className="mt-3 text-base font-semibold text-foreground">{randomFact}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-rose-200/40 blur-2xl" />
            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-orange-200/40 blur-2xl" />
            <h3 className="font-heading text-3xl text-foreground">Whisker Wishes</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Little love notes for future adventures, cuddles, and kitteny chaos.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-lg">💌</span>
                <span>Placeholder: A date idea she has always wanted to try.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🎀</span>
                <span>Placeholder: A surprise I want to plan for her.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🌙</span>
                <span>Placeholder: A cozy night tradition we should start.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
