import { motion } from 'framer-motion';
import { useState } from 'react';
import myWomen from '../assets/myWomen.jpeg';


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

const moodChips = [
  { label: 'Kind', tone: 'soft' },
  { label: 'Brilliant', tone: 'bright' },
  { label: 'Playful', tone: 'playful' },
  { label: 'Caring', tone: 'caring' },
  { label: 'Mischievous', tone: 'mischievous' },
  { label: 'Adorable', tone: 'sweet' },
  { label: 'Gentle', tone: 'gentle' },
  { label: 'Horny', tone: 'bold' },
  { label: 'Sexy', tone: 'sensual' },
];

const moreMoodChips = [
  { label: 'Deep', tone: 'profound' },
  { label: 'Dreamy', tone: 'ethereal' },
  { label: 'Fated', tone: 'destined' },
  { label: 'Loyal', tone: 'steady' },
  { label: 'Magnetic', tone: 'attractive' },
  { label: 'Protective', tone: 'strong' },
  { label: 'Vulnerable', tone: 'raw' },
  { label: 'Devoted', tone: 'loyal' },
  { label: 'Peaceful', tone: 'calm' },
  { label: 'Healed', tone: 'restored' },
  { label: 'Primal', tone: 'wild' },
  { label: 'Electric', tone: 'charged' },
  { label: 'Seductive', tone: 'alluring' },
  { label: 'Hungry', tone: 'craving' },
  { label: 'Tantalizing', tone: 'teasing' },
  { label: 'Intoxicating', tone: 'addictive' },
  { label: 'Breathless', tone: 'intense' },
  { label: 'Steamy', tone: 'hot' },
  { label: 'Uninhibited', tone: 'free' },
  { label: 'Addictive', tone: 'obsessive' },
  { label: 'Honest', tone: 'sincere' },
  { label: 'Tender', tone: 'soft' },
  { label: 'Wistful', tone: 'longing' },
  { label: 'Wild', tone: 'untamed' },
  { label: 'Sparky', tone: 'energetic' },
  { label: 'Daring', tone: 'bold' },
  { label: 'Radiant', tone: 'glowing' },
  { label: 'Affectionate', tone: 'warm' },
  { label: 'Enchanting', tone: 'magical' },
  { label: 'Desirous', tone: 'passionate' },
  { label: 'Slick', tone: 'wet' },
  { label: 'Thirsty', tone: 'craving' },
  { label: 'Heat', tone: 'burning' },
  { label: 'Surrendered', tone: 'yielding' },
  { label: 'Obsessed', tone: 'fixated' },
  { label: 'Tangled', tone: 'intertwined' },
  { label: 'Feverish', tone: 'intense' },
  { label: 'Flush', tone: 'blushing' },
  { label: 'Velvet', tone: 'smooth' },
  { label: 'Dominant', tone: 'commanding' },
  { label: 'Submissive', tone: 'trusting' },
  { label: 'Euphoric', tone: 'high' },
  { label: 'Skin-to-Skin', tone: 'bare' },
  { label: 'Rhythmic', tone: 'flowing' },
  { label: 'Soul-Bound', tone: 'eternal' },
  { label: 'Recognized', tone: 'familiar' },
  { label: 'Home', tone: 'belonging' },
  { label: 'Awakened', tone: 'new' },
  { label: 'Ethereal', tone: 'otherworldly' },
  { label: 'Sanctuary', tone: 'safe' },
  { label: 'Anchored', tone: 'grounded' },
  { label: 'Synchronized', tone: 'aligned' },
  { label: 'Infinite', tone: 'endless' },
  { label: 'Cherished', tone: 'valued' },
  { label: 'Teasing', tone: 'frisky' },
  { label: 'Flirty', tone: 'charming' },
  { label: 'Bratty', tone: 'feisty' },
  { label: 'Captivated', tone: 'hooked' },
  { label: 'Fearless', tone: 'brave' },
  { label: 'Electric', tone: 'vibrant' },
  { label: 'Impulsive', tone: 'spontaneous' },
  { label: 'Irresistible', tone: 'magnetic' },
  { label: 'Unfiltered', tone: 'honest' },
  { label: 'Aching', tone: 'longing' },
  { label: 'Trembling', tone: 'shaky' },
  { label: 'Haunting', tone: 'lingering' },
  { label: 'Quiet', tone: 'introspective' },
  { label: 'Recovering', tone: 'healing' },
  { label: 'Stubborn', tone: 'persistent' },
  { label: 'Whole', tone: 'complete' },
];

const moodChipStyles = {
  soft: 'border-white/60 bg-white/70 text-foreground shadow-[0_10px_18px_rgba(15,23,42,0.08)]',
  bright: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(245,158,11,0.18)]',
  playful: 'border-pink-200/80 bg-pink-100/80 text-pink-900 shadow-[0_10px_18px_rgba(236,72,153,0.2)]',
  caring: 'border-emerald-200/80 bg-emerald-100/80 text-emerald-900 shadow-[0_10px_18px_rgba(16,185,129,0.18)]',
  mischievous: 'border-violet-200/80 bg-violet-100/80 text-violet-900 shadow-[0_10px_18px_rgba(139,92,246,0.2)]',
  sweet: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(244,63,94,0.18)]',
  gentle: 'border-sky-200/80 bg-sky-100/80 text-sky-900 shadow-[0_10px_18px_rgba(56,189,248,0.18)]',
  bold: 'border-fuchsia-200/80 bg-fuchsia-100/80 text-fuchsia-900 shadow-[0_10px_18px_rgba(217,70,239,0.22)]',
  sensual: 'border-red-200/80 bg-red-100/80 text-red-900 shadow-[0_10px_18px_rgba(248,113,113,0.2)]',
  profound: 'border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-[0_10px_18px_rgba(30,41,59,0.18)]',
  ethereal: 'border-indigo-200/80 bg-indigo-100/80 text-indigo-900 shadow-[0_10px_18px_rgba(99,102,241,0.2)]',
  destined: 'border-amber-200/80 bg-amber-50/90 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.18)]',
  steady: 'border-teal-200/80 bg-teal-100/80 text-teal-900 shadow-[0_10px_18px_rgba(20,184,166,0.18)]',
  attractive: 'border-pink-200/80 bg-pink-100/80 text-pink-900 shadow-[0_10px_18px_rgba(244,114,182,0.2)]',
  strong: 'border-blue-200/80 bg-blue-100/80 text-blue-900 shadow-[0_10px_18px_rgba(59,130,246,0.2)]',
  raw: 'border-stone-200/80 bg-stone-100/80 text-stone-900 shadow-[0_10px_18px_rgba(120,113,108,0.18)]',
  loyal: 'border-cyan-200/80 bg-cyan-100/80 text-cyan-900 shadow-[0_10px_18px_rgba(34,211,238,0.18)]',
  calm: 'border-sky-200/80 bg-sky-50/90 text-sky-900 shadow-[0_10px_18px_rgba(125,211,252,0.18)]',
  restored: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-900 shadow-[0_10px_18px_rgba(52,211,153,0.18)]',
  wild: 'border-orange-200/80 bg-orange-100/80 text-orange-900 shadow-[0_10px_18px_rgba(249,115,22,0.2)]',
  charged: 'border-yellow-200/80 bg-yellow-100/80 text-yellow-900 shadow-[0_10px_18px_rgba(250,204,21,0.2)]',
  alluring: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(251,113,133,0.2)]',
  craving: 'border-red-200/80 bg-red-100/80 text-red-900 shadow-[0_10px_18px_rgba(248,113,113,0.2)]',
  teasing: 'border-fuchsia-200/80 bg-fuchsia-100/80 text-fuchsia-900 shadow-[0_10px_18px_rgba(232,121,249,0.2)]',
  addictive: 'border-violet-200/80 bg-violet-100/80 text-violet-900 shadow-[0_10px_18px_rgba(167,139,250,0.2)]',
  intense: 'border-rose-200/80 bg-rose-200/70 text-rose-950 shadow-[0_10px_18px_rgba(244,63,94,0.25)]',
  hot: 'border-orange-200/80 bg-orange-200/70 text-orange-950 shadow-[0_10px_18px_rgba(251,146,60,0.25)]',
  free: 'border-lime-200/80 bg-lime-100/80 text-lime-900 shadow-[0_10px_18px_rgba(163,230,53,0.2)]',
  obsessive: 'border-purple-200/80 bg-purple-100/80 text-purple-900 shadow-[0_10px_18px_rgba(196,181,253,0.22)]',
  sincere: 'border-neutral-200/80 bg-neutral-100/80 text-neutral-900 shadow-[0_10px_18px_rgba(115,115,115,0.18)]',
  longing: 'border-indigo-200/80 bg-indigo-50/90 text-indigo-900 shadow-[0_10px_18px_rgba(129,140,248,0.2)]',
  untamed: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.2)]',
  energetic: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(251,113,133,0.2)]',
  glowing: 'border-yellow-200/80 bg-yellow-50/90 text-yellow-900 shadow-[0_10px_18px_rgba(253,224,71,0.2)]',
  warm: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.2)]',
  magical: 'border-indigo-200/80 bg-indigo-100/80 text-indigo-900 shadow-[0_10px_18px_rgba(165,180,252,0.2)]',
  passionate: 'border-red-200/80 bg-red-200/70 text-red-950 shadow-[0_10px_18px_rgba(239,68,68,0.25)]',
  wet: 'border-cyan-200/80 bg-cyan-100/80 text-cyan-900 shadow-[0_10px_18px_rgba(56,189,248,0.2)]',
  burning: 'border-orange-300/80 bg-orange-200/80 text-orange-950 shadow-[0_10px_18px_rgba(249,115,22,0.28)]',
  yielding: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(244,114,182,0.2)]',
  fixated: 'border-purple-200/80 bg-purple-200/70 text-purple-950 shadow-[0_10px_18px_rgba(126,34,206,0.22)]',
  intertwined: 'border-teal-200/80 bg-teal-100/80 text-teal-900 shadow-[0_10px_18px_rgba(13,148,136,0.2)]',
  blushing: 'border-pink-200/80 bg-pink-100/80 text-pink-900 shadow-[0_10px_18px_rgba(236,72,153,0.2)]',
  smooth: 'border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-[0_10px_18px_rgba(71,85,105,0.18)]',
  commanding: 'border-red-200/80 bg-red-200/70 text-red-950 shadow-[0_10px_18px_rgba(220,38,38,0.28)]',
  trusting: 'border-sky-200/80 bg-sky-100/80 text-sky-900 shadow-[0_10px_18px_rgba(56,189,248,0.2)]',
  high: 'border-fuchsia-200/80 bg-fuchsia-100/80 text-fuchsia-900 shadow-[0_10px_18px_rgba(192,132,252,0.24)]',
  bare: 'border-stone-200/80 bg-stone-100/80 text-stone-900 shadow-[0_10px_18px_rgba(120,113,108,0.2)]',
  flowing: 'border-emerald-200/80 bg-emerald-100/80 text-emerald-900 shadow-[0_10px_18px_rgba(16,185,129,0.2)]',
  eternal: 'border-indigo-200/80 bg-indigo-100/80 text-indigo-900 shadow-[0_10px_18px_rgba(129,140,248,0.2)]',
  familiar: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.2)]',
  belonging: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(251,113,133,0.2)]',
  new: 'border-lime-200/80 bg-lime-100/80 text-lime-900 shadow-[0_10px_18px_rgba(163,230,53,0.2)]',
  otherworldly: 'border-violet-200/80 bg-violet-100/80 text-violet-900 shadow-[0_10px_18px_rgba(167,139,250,0.22)]',
  safe: 'border-emerald-200/80 bg-emerald-50/90 text-emerald-900 shadow-[0_10px_18px_rgba(52,211,153,0.2)]',
  grounded: 'border-stone-200/80 bg-stone-100/80 text-stone-900 shadow-[0_10px_18px_rgba(120,113,108,0.2)]',
  aligned: 'border-cyan-200/80 bg-cyan-100/80 text-cyan-900 shadow-[0_10px_18px_rgba(34,211,238,0.2)]',
  endless: 'border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-[0_10px_18px_rgba(71,85,105,0.18)]',
  valued: 'border-pink-200/80 bg-pink-100/80 text-pink-900 shadow-[0_10px_18px_rgba(244,114,182,0.2)]',
  frisky: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.2)]',
  charming: 'border-rose-200/80 bg-rose-100/80 text-rose-900 shadow-[0_10px_18px_rgba(251,113,133,0.2)]',
  feisty: 'border-orange-200/80 bg-orange-100/80 text-orange-900 shadow-[0_10px_18px_rgba(249,115,22,0.2)]',
  hooked: 'border-violet-200/80 bg-violet-100/80 text-violet-900 shadow-[0_10px_18px_rgba(167,139,250,0.22)]',
  brave: 'border-blue-200/80 bg-blue-100/80 text-blue-900 shadow-[0_10px_18px_rgba(59,130,246,0.2)]',
  vibrant: 'border-yellow-200/80 bg-yellow-100/80 text-yellow-900 shadow-[0_10px_18px_rgba(253,224,71,0.2)]',
  spontaneous: 'border-fuchsia-200/80 bg-fuchsia-100/80 text-fuchsia-900 shadow-[0_10px_18px_rgba(192,132,252,0.24)]',
  magnetic: 'border-pink-200/80 bg-pink-100/80 text-pink-900 shadow-[0_10px_18px_rgba(244,114,182,0.2)]',
  honest: 'border-neutral-200/80 bg-neutral-100/80 text-neutral-900 shadow-[0_10px_18px_rgba(115,115,115,0.2)]',
  shaky: 'border-blue-200/80 bg-blue-100/80 text-blue-900 shadow-[0_10px_18px_rgba(96,165,250,0.2)]',
  lingering: 'border-violet-200/80 bg-violet-100/80 text-violet-900 shadow-[0_10px_18px_rgba(167,139,250,0.22)]',
  introspective: 'border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-[0_10px_18px_rgba(71,85,105,0.2)]',
  healing: 'border-emerald-200/80 bg-emerald-100/80 text-emerald-900 shadow-[0_10px_18px_rgba(16,185,129,0.2)]',
  persistent: 'border-amber-200/80 bg-amber-100/80 text-amber-900 shadow-[0_10px_18px_rgba(251,191,36,0.2)]',
  complete: 'border-slate-200/80 bg-slate-100/80 text-slate-900 shadow-[0_10px_18px_rgba(71,85,105,0.2)]',
};

export const AboutHerPage = () => {
  const [visibleMoodCount, setVisibleMoodCount] = useState(4);
  const allMoodChips = [...moodChips, ...moreMoodChips];
  const visibleMoodChips = allMoodChips.slice(0, visibleMoodCount);
  const hasMoreMoods = visibleMoodCount < allMoodChips.length;

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
                She is the warmth in my day and the wonder in my nights. This page is my own little constellation—a collection of all the beautiful things that make her exactly who she is
              </p>
              <div className="flex flex-wrap gap-3">
                {visibleMoodChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg ${moodChipStyles[chip.tone]}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              {hasMoreMoods && (
                <button
                  type="button"
                  onClick={() => setVisibleMoodCount((count) => Math.min(count + 4, allMoodChips.length))}
                  className="mt-4 rounded-full border border-white/60 bg-white/70 px-5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Show More Moods
                </button>
              )}
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
                    src={myWomen}
                    alt="A soft romantic bouquet"
                    className="h-80 w-full object-cover sm:h-[28rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-foreground">
                    A little space for my favorite photo.
                  </div>
                </div>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p>My Women with small teeth and big Heart.</p>
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
