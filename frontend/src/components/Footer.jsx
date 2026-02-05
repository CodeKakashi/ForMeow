import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ConfettiButton } from './ConfettiButton';

const MEOW_SIC_TRACK = '/audio/meow-lofi.mp3';

const romanticReasons = [
  'Her laugh resets every bad mood.',
  'She makes even random days feel magical.',
  'Staying mad lasts 10 seconds near her smile.',
  'She is my favorite person and my safe place.',
  'Every argument ends with wanting her closer.',
  'She is chaos and comfort in the cutest form.',
];

const floatingDecor = Array.from({ length: 10 }, (_, index) => ({
  id: `footer-float-${index}`,
  left: 8 + ((index * 9.5) % 84),
  top: 10 + ((index * 11.3) % 76),
  icon: index % 3 === 0 ? '🐾' : index % 3 === 1 ? '❤️' : '🧶',
  duration: 4.5 + (index % 5) * 0.6,
  delay: index * 0.18,
}));

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isPetting, setIsPetting] = useState(false);
  const [petHearts, setPetHearts] = useState([]);
  const [romanticEmergency, setRomanticEmergency] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const petZoneRef = useRef(null);
  const heartSpawnRef = useRef(0);
  const heartTimersRef = useRef([]);
  const emergencyAudioRef = useRef(null);

  const spawnHeart = useCallback((xPercent, yPercent) => {
    const id = `${Date.now()}-${Math.random()}`;
    setPetHearts((previous) => [...previous, { id, xPercent, yPercent }]);

    const timerId = window.setTimeout(() => {
      setPetHearts((previous) => previous.filter((heart) => heart.id !== id));
    }, 850);

    heartTimersRef.current.push(timerId);
  }, []);

  useEffect(() => {
    const activeTimers = heartTimersRef.current;
    const emergencyAudio = emergencyAudioRef.current;

    return () => {
      activeTimers.forEach((timerId) => window.clearTimeout(timerId));
      if (emergencyAudio) {
        emergencyAudio.pause();
      }
    };
  }, []);

  const handlePetStroke = (event) => {
    if (!petZoneRef.current) {
      return;
    }

    const now = Date.now();
    if (now - heartSpawnRef.current < 75) {
      return;
    }
    heartSpawnRef.current = now;

    const rect = petZoneRef.current.getBoundingClientRect();
    const touchPoint =
      event.touches?.[0] ||
      event.changedTouches?.[0] || {
        clientX: event.clientX,
        clientY: event.clientY,
      };

    const xPercent = ((touchPoint.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((touchPoint.clientY - rect.top) / rect.height) * 100;
    spawnHeart(Math.max(8, Math.min(92, xPercent)), Math.max(12, Math.min(88, yPercent)));
  };

  const toggleRomanticEmergency = async () => {
    if (!emergencyAudioRef.current) {
      return;
    }

    if (romanticEmergency) {
      emergencyAudioRef.current.pause();
      emergencyAudioRef.current.currentTime = 0;
      setRomanticEmergency(false);
      return;
    }

    try {
      await emergencyAudioRef.current.play();
      setAudioError(false);
    } catch (error) {
      setAudioError(true);
    }
    setRomanticEmergency(true);
  };

  const decorativePaws = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <footer className="relative overflow-hidden px-4 py-10 sm:py-12">
      <audio ref={emergencyAudioRef} loop preload="none" src={MEOW_SIC_TRACK} onError={() => setAudioError(true)} />

      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-accent/30 to-transparent" />

      <div className="pointer-events-none absolute inset-0 opacity-20">
        {floatingDecor.map((item) => (
          <motion.div
            key={item.id}
            className="absolute text-2xl"
            style={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 360], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: item.duration, repeat: Infinity, delay: item.delay }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleRomanticEmergency}
        className="absolute bottom-3 right-4 z-30 rounded-full bg-white/65 p-2 text-sm opacity-30 shadow-md transition hover:opacity-100"
        aria-label="Romantic emergency peace offering"
        title="Romantic emergency peace offering"
      >
        🐾
      </button>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Interactive Footer</p>
            <h3 className="mt-2 font-heading text-4xl text-foreground sm:text-5xl">Pet The Sleeping Cat</h3>
            <p className="mt-2 text-sm text-foreground/75">Hover or stroke the cat to hear purr vibes and spawn hearts.</p>

            <div
              ref={petZoneRef}
              className="relative mt-4 overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-100 to-orange-100 p-5"
              onMouseEnter={() => setIsPetting(true)}
              onMouseLeave={() => setIsPetting(false)}
              onMouseMove={handlePetStroke}
              onTouchStart={(event) => {
                setIsPetting(true);
                handlePetStroke(event);
              }}
              onTouchMove={handlePetStroke}
              onTouchEnd={() => setIsPetting(false)}
            >
              <motion.div className="mx-auto w-fit text-7xl" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.9, repeat: Infinity }}>
                {isPetting ? '😻' : '😽'}
              </motion.div>
              <p className="mt-2 text-sm font-semibold text-rose-900">{isPetting ? 'Prrrr... keep going...' : 'Shhh... sleepy baby cat.'}</p>

              <AnimatePresence>
                {petHearts.map((heart) => (
                  <motion.span
                    key={heart.id}
                    className="pointer-events-none absolute text-xl"
                    style={{ left: `${heart.xPercent}%`, top: `${heart.yPercent}%` }}
                    initial={{ opacity: 0, y: 6, scale: 0.6 }}
                    animate={{ opacity: [0, 1, 1, 0], y: -34, scale: [0.6, 1.05, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                  >
                    💖
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-xl sm:p-6"
          >
            <div className="flex justify-center">
              <ConfettiButton />
            </div>

            <div className="mt-5 rounded-2xl bg-white/80 p-5 shadow-inner">
              <div className="mb-3 flex items-center justify-center gap-3">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Heart className="h-7 w-7 fill-secondary text-secondary" />
                </motion.div>
                <h3 className="font-heading text-3xl text-foreground">Made with Love and Purrs</h3>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
                  <Heart className="h-7 w-7 fill-secondary text-secondary" />
                </motion.div>
              </div>
              <p className="text-base text-muted-foreground">For the most amazing person in the world 💕</p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mt-4 text-center text-sm text-muted-foreground"
            >
              © {currentYear} • Forever Yours
            </motion.p>
          </motion.section>
        </div>

        <div className="mt-5 flex justify-center gap-4 text-2xl opacity-50">
          {decorativePaws.map((item) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: item * 0.06 }}
            >
              🐾
            </motion.span>
          ))}
        </div>

        <AnimatePresence>
          {romanticEmergency && (
            <motion.section
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              className="mt-4 rounded-3xl border border-rose-300/70 bg-rose-50/90 p-5 shadow-xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Hissing Peace Offering Activated</p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -6, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏳️
                </motion.span>
                <p className="text-sm font-semibold text-rose-900">White flag raised. Lo-fi meow-sic now playing.</p>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {romanticReasons.map((reason) => (
                  <p key={reason} className="rounded-2xl bg-white/80 px-4 py-2 text-sm font-medium text-rose-900">
                    • {reason}
                  </p>
                ))}
              </div>

              {audioError && (
                <p className="mt-3 text-xs font-semibold text-rose-700">
                  Meow-sic file missing. Add <span className="font-bold">public/audio/meow-lofi.mp3</span>.
                </p>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};
