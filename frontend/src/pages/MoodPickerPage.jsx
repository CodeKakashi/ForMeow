import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ExternalLink,
  Flame,
  HeartHandshake,
  MessageCircleHeart,
  Pause,
  Play,
  Siren,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

const EMERGENCY_MESSAGE =
  "Babe SOS 🆘 I need you 😭 . I'm really struggling right now and could use your love and support. Can we talk? I just need to feel close to you. Love you. ❤️";
const EMERGENCY_NUMBER = process.env.REACT_APP_EMERGENCY_NUMBER || '447887153839';
const HUG_COUNTER_KEY = 'formeow_virtual_hug_counter';

const moodLibrary = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '🥰',
    category: 'The Basics',
    gradient: 'from-rose-200 via-pink-100 to-orange-100',
    poem:
      'You glow like morning light on satin skies.\nI keep falling for that smile of yours.\nToday, let us dance in simple joy.',
    vibeLabel: 'Play Our Happy Vibe',
    vibeUrl: 'https://open.spotify.com/track/6f4itfvWzS59Qu7JWorhxn',
    audioSrc: '/audio/moods/happy.mp3',
  },
  {
    id: 'missing-me',
    name: 'Missing Me',
    emoji: '🥺',
    category: 'The Basics',
    gradient: 'from-peach-200 via-rose-100 to-pink-100',
    poem:
      'Across the miles, my heartbeat still finds you.\nClose your eyes and I am in your hands.\nMy love is already on its way.',
    vibeLabel: 'Watch A Cute Comfort Clip',
    vibeUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    audioSrc: '/audio/moods/missing-me.mp3',
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😤',
    category: 'The Basics',
    gradient: 'from-red-200 via-rose-200 to-orange-100',
    poem:
      'Let the thunder pass through your chest.\nI am here for the storm and after.\nWe can breathe, then rebuild together.',
    vibeLabel: 'Grounding Breath Session',
    vibeUrl: 'https://www.youtube.com/watch?v=SEfs5TJZ6Nk',
    audioSrc: '/audio/moods/angry.mp3',
  },
  {
    id: 'frustrated',
    name: 'Frustrated',
    emoji: '😫',
    category: 'The Basics',
    gradient: 'from-amber-200 via-orange-100 to-rose-100',
    poem:
      'When everything knots up all at once,\nlet me be the patient little untie.\nOne breath, one step, one soft reset.',
    vibeLabel: 'Reset Playlist',
    vibeUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0',
    audioSrc: '/audio/moods/frustrated.mp3',
  },
  {
    id: 'bored',
    name: 'Bored',
    emoji: '🥱',
    category: 'The Basics',
    gradient: 'from-sky-200 via-cyan-100 to-indigo-100',
    poem:
      'Boredom is a sleepy little cat.\nLet us poke it with a silly kiss.\nAdventure can start in one laugh.',
    vibeLabel: 'Quick Fun Video',
    vibeUrl: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM',
    audioSrc: '/audio/moods/bored.mp3',
  },
  {
    id: 'hopeless',
    name: 'Hopeless',
    emoji: '🌊',
    category: 'Deep Emotions',
    gradient: 'from-slate-300 via-blue-200 to-cyan-100',
    poem:
      'Even oceans bow to the moon each night.\nHold on to me while the dark is loud.\nHope is small, but it is alive.',
    vibeLabel: 'Soft Hopeful Piano',
    vibeUrl: 'https://www.youtube.com/watch?v=2OEL4P1Rz04',
    audioSrc: '/audio/moods/hopeless.mp3',
  },
  {
    id: 'depressed',
    name: 'Depressed',
    emoji: '☁️',
    category: 'Deep Emotions',
    gradient: 'from-zinc-300 via-slate-200 to-violet-100',
    poem:
      'Cloudy days do not erase the sun.\nI will sit right here, no fixing, just love.\nYou are never heavy to my heart.',
    vibeLabel: 'Gentle Cat Comfort',
    vibeUrl: 'https://www.youtube.com/watch?v=4IP_E7efGWE',
    audioSrc: '/audio/moods/depressed.mp3',
  },
  {
    id: 'guilty',
    name: 'Guilty',
    emoji: '😔',
    category: 'Deep Emotions',
    gradient: 'from-stone-300 via-neutral-200 to-rose-100',
    poem:
      'Mistakes are pages, not the whole story.\nYour heart is still soft and worthy.\nCome here, let grace hold you first.',
    vibeLabel: 'Self-Forgiveness Meditation',
    vibeUrl: 'https://www.youtube.com/watch?v=2FGR-OspxsU',
    audioSrc: '/audio/moods/guilty.mp3',
  },
  {
    id: 'ashamed',
    name: 'Ashamed',
    emoji: '😶‍🌫️',
    category: 'Deep Emotions',
    gradient: 'from-neutral-300 via-stone-200 to-pink-100',
    poem:
      'You are not your worst moment.\nYou are still the girl I adore.\nCome back to me, come back to you.',
    vibeLabel: 'Compassion Talk',
    vibeUrl: 'https://www.youtube.com/watch?v=w6T02g5hnT4',
    audioSrc: '/audio/moods/ashamed.mp3',
  },
  {
    id: 'fearful',
    name: 'Fearful',
    emoji: '😨',
    category: 'Deep Emotions',
    gradient: 'from-indigo-200 via-sky-100 to-cyan-100',
    poem:
      'Fear may knock, but love answers first.\nTake my hand through every what-if.\nYou are safe in us.',
    vibeLabel: 'Calming Rain Sounds',
    vibeUrl: 'https://www.youtube.com/watch?v=mPZkdNFkNps',
    audioSrc: '/audio/moods/fearful.mp3',
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '🌹',
    category: 'Spicy/Romantic',
    gradient: 'from-fuchsia-900 via-rose-900 to-pink-800',
    poem:
      'Tonight your name tastes like roses.\nLet the lights go soft and slow.\nI want every heartbeat with you.',
    vibeLabel: 'Slow-Dance Track',
    vibeUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v',
    audioSrc: '/audio/moods/romantic.mp3',
    spicy: true,
  },
  {
    id: 'aroused',
    name: 'Aroused',
    emoji: '🔥',
    category: 'Spicy/Romantic',
    gradient: 'from-rose-950 via-red-900 to-fuchsia-900',
    poem:
      'Your eyes are sparks and velvet heat.\nCome closer until the room forgets us.\nLet desire write the next line.',
    vibeLabel: 'Late-Night Slow Jam',
    vibeUrl: 'https://open.spotify.com/track/6b2RcmUt1g9N9mQ3CbjX2Y',
    audioSrc: '/audio/moods/aroused.mp3',
    spicy: true,
  },
  {
    id: 'randy',
    name: 'Randy',
    emoji: '😈',
    category: 'Spicy/Romantic',
    gradient: 'from-purple-950 via-fuchsia-900 to-red-900',
    poem:
      'That grin means trouble in silk.\nI am absolutely not resisting.\nCome claim your favorite distraction.',
    vibeLabel: 'Flirty Playlist',
    vibeUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWV7EzJMK2FUI',
    audioSrc: '/audio/moods/randy.mp3',
    spicy: true,
  },
  {
    id: 'horny',
    name: 'Horny',
    emoji: '🥵',
    category: 'Spicy/Romantic',
    gradient: 'from-red-950 via-rose-900 to-orange-900',
    poem:
      'Heat like this deserves a soundtrack.\nI am all in for your wild smile.\nLet tonight blush for us.',
    vibeLabel: 'Steamy RnB Vibe',
    vibeUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4SBhb3fqCJd',
    audioSrc: '/audio/moods/horny.mp3',
    spicy: true,
  },
  {
    id: 'irritable',
    name: 'Irritable',
    emoji: '⚡',
    category: 'Irritable',
    gradient: 'from-yellow-200 via-amber-200 to-orange-100',
    poem:
      'Tiny things can scrape the soul today.\nLet me be your soft place anyway.\nYou do not have to be sweet for me to stay.',
    vibeLabel: 'Lo-Fi Decompress',
    vibeUrl: 'https://www.youtube.com/live/jfKfPfyJRdk',
    audioSrc: '/audio/moods/irritable.mp3',
  },
];

const dailyCompliments = [
  'You make ordinary days feel like tiny festivals.',
  'Your laugh is still my favorite sound in the world.',
  'You are soft where the world is hard.',
  'You are my calm when life gets noisy.',
  'You turn random moments into core memories.',
  'You love deeply and it changes everyone around you.',
  'Your smile is my immediate mood reset.',
  'You are beautiful in every light, every hour.',
  'You make kindness look effortless.',
  'You are brave even on your quiet days.',
  'You care for people with your whole heart.',
  'Your presence feels like home.',
  'You make my future feel exciting and safe.',
  'You are playful, brilliant, and full of soul.',
  'You make me want to be better every day.',
  'Your eyes hold entire universes.',
  'You are my favorite hello and hardest goodbye.',
  'You are magic in human form.',
  'You listen with your whole being.',
  'You have the prettiest way of being real.',
  'You make love look easy and honest.',
  'Your voice can melt every stressful thought I have.',
  'You are both my peace and my spark.',
  'You make rainy days feel romantic.',
  'You are stunning in ways beyond looks.',
  'You are my favorite reason to smile at my phone.',
  'You make silly moments feel sacred.',
  'Your hugs fix parts of me I cannot explain.',
  'You are the safest place in my world.',
  'You make effort look graceful.',
  'You are pure poetry in motion.',
  'You love in a way that heals.',
  'You are sunshine with a heartbeat.',
  'You make me feel chosen every day.',
  'You are endlessly adorable and wildly beautiful.',
  'You are strong even when you feel small.',
  'You make every room warmer.',
  'You are my favorite person to do nothing with.',
  'You make dreams feel reachable.',
  'You are a masterpiece of softness and fire.',
  'You have the most comforting energy.',
  'You make my heart feel understood.',
  'You are elegant, even in pajamas and chaos.',
  'You make long days lighter.',
  'You are effortlessly lovable.',
  'You make every plan better just by being there.',
  'You are my luckiest chapter.',
  'You make affection feel natural and full.',
  'You are my best kind of distraction.',
  'You make me believe in forever.',
  'You are thoughtful in the sweetest ways.',
  'You are my favorite plot twist.',
  'You make me feel at peace with myself.',
  'You are all heart, all wonder, all mine.',
  'You are the reason love feels real to me.',
  'You make tenderness look powerful.',
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${mins}:${secs}`;
};

const getDailyCompliment = () => {
  const today = new Date();
  const utcDayStamp = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const dayNumber = Math.floor(utcDayStamp / 86400000);
  return dailyCompliments[dayNumber % dailyCompliments.length];
};

const buildSmsUrl = (digits, message) => {
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const separator = isiOS ? '&' : '?';
  return `sms:${digits}${separator}body=${encodeURIComponent(message)}`;
};

const buildWhatsAppUrl = (digits, message) => {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

const normalizeUkNumber = (rawValue) => {
  const digits = rawValue.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('44')) {
    return digits;
  }

  return `44${digits.replace(/^0+/, '')}`;
};

const VoiceNotePlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError(false);
  }, [src]);

  const togglePlayback = async () => {
    if (!audioRef.current) {
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      setAudioError(true);
    }
  };

  const handleSeek = (event) => {
    if (!audioRef.current) {
      return;
    }

    const nextTime = Number(event.target.value);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 p-4 shadow-inner backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlayback}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-foreground shadow-lg transition-transform hover:scale-105"
          aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-foreground/80">
            <span className="inline-flex items-center gap-1">
              <Volume2 className="h-3.5 w-3.5" />
              Voice Note
            </span>
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/80 accent-pink-500"
          />
        </div>
      </div>

      {audioError && (
        <p className="mt-3 text-xs text-rose-700">
          Voice note missing. Add this file: <span className="font-semibold">public{src}</span>
        </p>
      )}

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setAudioError(true);
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

export const MoodPickerPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [hugCount, setHugCount] = useState(0);
  const [heartBurst, setHeartBurst] = useState([]);
  const [burstVisible, setBurstVisible] = useState(false);
  const burstTimerRef = useRef(null);

  const dailyCompliment = useMemo(() => getDailyCompliment(), []);

  useEffect(() => {
    const savedCount = Number(localStorage.getItem(HUG_COUNTER_KEY));
    if (Number.isFinite(savedCount) && savedCount >= 0) {
      setHugCount(savedCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HUG_COUNTER_KEY, String(hugCount));
  }, [hugCount]);

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) {
        clearTimeout(burstTimerRef.current);
      }
    };
  }, []);

  const handleEmergency = () => {
    const digits = normalizeUkNumber(EMERGENCY_NUMBER);

    if (!digits) {
      window.alert('Set REACT_APP_EMERGENCY_NUMBER as a UK number, e.g. 447887153839.');
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(digits, EMERGENCY_MESSAGE);
    window.location.assign(whatsappUrl);
  };

  const handleEmergencySms = () => {
    const digits = normalizeUkNumber(EMERGENCY_NUMBER);

    if (!digits) {
      window.alert('Set REACT_APP_EMERGENCY_NUMBER as a UK number, e.g. 447887153839.');
      return;
    }

    const smsUrl = buildSmsUrl(digits, EMERGENCY_MESSAGE);
    window.location.assign(smsUrl);
  };

  const handleVirtualHug = () => {
    setHugCount((prevCount) => prevCount + 1);
    setBurstVisible(true);

    const particles = Array.from({ length: 56 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: Math.random() * 100,
      y: 72 + Math.random() * 24,
      drift: Math.random() * 40 - 20,
      duration: 1.8 + Math.random() * 1.6,
      delay: Math.random() * 0.35,
      size: 1 + Math.random() * 1.7,
      rotate: Math.random() * 280 - 140,
      emoji: ['💗', '💖', '💕', '💘'][Math.floor(Math.random() * 4)],
    }));

    setHeartBurst(particles);

    if (burstTimerRef.current) {
      clearTimeout(burstTimerRef.current);
    }

    burstTimerRef.current = setTimeout(() => {
      setBurstVisible(false);
      setHeartBurst([]);
    }, 2600);
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:pb-14 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-accent/45 to-background" />
        <div className="pointer-events-none absolute inset-0">
          {[...Array(22)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute text-2xl opacity-30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.1 }}
            >
              {i % 3 === 0 ? '💞' : i % 3 === 1 ? '✨' : '🐾'}
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Mood Picker
            </span>
            <h1 className="mt-4 font-heading text-5xl text-foreground sm:text-6xl">
              How Are You Feeling, Love?
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Pick a mood and I will send comfort, laughs, romance, and my voice right to your heart.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {moodLibrary.map((mood, index) => (
              <motion.button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group rounded-3xl border p-5 text-left shadow-lg backdrop-blur-md transition-all ${
                  mood.spicy
                    ? 'border-fuchsia-300/40 bg-black/40 text-white shadow-fuchsia-950/50'
                    : 'border-white/70 bg-white/65 text-foreground'
                }`}
              >
                <div
                  className={`mb-4 rounded-2xl bg-gradient-to-br p-4 ${mood.gradient} ${
                    mood.spicy ? 'ring-1 ring-white/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{mood.emoji}</span>
                    {mood.spicy && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-100">
                        <Flame className="h-3 w-3" />
                        Night Mode
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`font-heading text-3xl ${mood.spicy ? 'text-rose-100' : 'text-foreground'}`}>
                  {mood.name}
                </h3>
                <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.2em] ${mood.spicy ? 'text-rose-200/85' : 'text-muted-foreground'}`}>
                  {mood.category}
                </p>
                <p className={`mt-2 text-sm ${mood.spicy ? 'text-rose-100/85' : 'text-foreground/80'}`}>
                  Tap for your poem, vibe link, and a voice note from me.
                </p>
              </motion.button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 shadow-xl"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Daily Compliment
              </p>
              <h2 className="font-heading text-4xl text-foreground">Reason I Love You Today</h2>
              <p className="mt-4 rounded-2xl bg-white/65 p-4 text-lg text-foreground/90 shadow-inner">
                {dailyCompliment}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Rotates automatically every day from a list of {dailyCompliments.length} reasons.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-6 shadow-xl"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Virtual Hug Counter
              </p>
              <h2 className="font-heading text-4xl text-foreground">Send A Hug</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Each tap adds one hug and triggers a full-screen heart burst.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={handleVirtualHug}
                  className="h-12 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-6 text-base font-bold text-foreground shadow-lg hover:opacity-95"
                >
                  <HeartHandshake className="h-5 w-5" />
                  Send A Virtual Hug
                </Button>

                <div className="rounded-full border border-white/70 bg-white/70 px-5 py-2 text-sm font-semibold text-foreground shadow-sm">
                  Hugs sent: {hugCount}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <button
              type="button"
              onClick={handleEmergency}
              className="w-full rounded-3xl border border-rose-200/80 bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 p-6 text-center shadow-[0_0_40px_rgba(244,114,182,0.5)] transition-transform hover:scale-[1.01]"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.22em] text-rose-800">
                <Siren className="h-4 w-4" />
                Emergency Love Line
              </span>
              <p className="mt-4 font-cute text-2xl uppercase tracking-[0.08em] text-rose-900 sm:text-3xl">
                IN CASE OF EMERGENCY
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-rose-900/80 sm:text-base">
                Opens WhatsApp with your prefilled support message.
              </p>
            </button>

            <div className="mt-3 flex justify-center">
              <Button
                type="button"
                onClick={handleEmergencySms}
                variant="outline"
                className="rounded-full border-white/80 bg-white/70 px-5 text-sm font-semibold text-foreground"
              >
                SMS Fallback
              </Button>
            </div>

            {/* <p className="mt-2 text-center text-xs text-muted-foreground">
              Set <span className="font-semibold">REACT_APP_EMERGENCY_NUMBER</span> as UK number (e.g. 447887153839 or 07887153839).
            </p> */}
          </motion.div>
        </div>
      </section>

      <Dialog open={Boolean(selectedMood)} onOpenChange={(isOpen) => !isOpen && setSelectedMood(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/40 bg-gradient-to-b from-white/95 via-pink-50/95 to-rose-100/95 p-0 sm:max-w-2xl">
          {selectedMood && (
            <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 via-pink-100/70 to-secondary/40" />

              <DialogTitle className="flex items-center gap-3 text-4xl font-heading text-foreground">
                <span>{selectedMood.emoji}</span>
                <span>{selectedMood.name}</span>
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {selectedMood.category}
              </DialogDescription>

              <div className="mt-5 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-inner">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">To My Meowiski</p>
                <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-foreground/90">
                  {selectedMood.poem}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="h-11 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-5 text-sm font-semibold text-foreground hover:opacity-95">
                  <a href={selectedMood.vibeUrl} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" />
                    {selectedMood.vibeLabel}
                  </a>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full border-white/70 bg-white/70 px-5 text-sm font-semibold text-foreground"
                  onClick={handleEmergency}
                >
                  <MessageCircleHeart className="h-4 w-4" />
                  Need Extra Support
                </Button>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Voice Note Player
                </p>
                <VoiceNotePlayer src={selectedMood.audioSrc} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {burstVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-gradient-to-t from-pink-200/25 via-transparent to-transparent"
          >
            {heartBurst.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{ left: `${particle.x}%`, top: `${particle.y}%`, fontSize: `${particle.size}rem` }}
                initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0.4 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: -240 - Math.random() * 140,
                  x: particle.drift,
                  rotate: particle.rotate,
                  scale: [0.4, 1, 1],
                }}
                transition={{ duration: particle.duration, delay: particle.delay, ease: 'easeOut' }}
              >
                {particle.emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
