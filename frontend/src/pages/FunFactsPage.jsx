import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useMemo, useState } from 'react';

const positions = [
  {
    name: 'Missionary',
    about:
      'The classic. One partner lies on their back while the other is on top, facing them. Simple, intimate, and allows for plenty of eye contact.',
    tags: ['Classic', 'Intimate', 'Low Effort'],
  },
  {
    name: 'The Anvil',
    about:
      "A variation of missionary where the partner on the bottom raises their legs and rests their feet on the other partner's shoulders for deeper penetration.",
    tags: ['Deep', 'Classic', 'Athletic'],
  },
  {
    name: 'Doggy Style',
    about:
      'One partner is on all fours while the other approaches from behind. It is a versatile favorite that allows for deep reach.',
    tags: ['Deep', 'Classic', 'Spicy'],
  },
  {
    name: 'Cowgirl',
    about:
      'One partner lies on their back while the other sits on top, facing them. This gives the top partner full control over speed and depth.',
    tags: ['Dominant', 'Intimate', 'Classic'],
  },
  {
    name: 'Reverse Cowgirl',
    about:
      'Similar to Cowgirl, but the partner on top faces away from the partner on the bottom. It provides a different angle and a great view.',
    tags: ['Dominant', 'Visual', 'Spicy'],
  },
  {
    name: 'The Lotus',
    about:
      "One partner sits cross-legged, and the other sits on their lap, facing them, wrapping their legs around the other's waist. Highly intimate and great for kissing.",
    tags: ['Intimate', 'Slow', 'Romantic'],
  },
  {
    name: 'Spooning',
    about:
      'Both partners lie on their sides, facing the same direction, with one nestled against the back of the other. Relaxed, cozy, and perfect for a slower pace.',
    tags: ['Lazy', 'Intimate', 'Slow'],
  },
  {
    name: 'The Scissors',
    about:
      'Both partners lie on their sides, facing each other with their legs intertwined like a pair of scissors. It allows for close body contact and grinding.',
    tags: ['Intimate', 'Slow', 'Unique'],
  },
  {
    name: 'The Butterfly',
    about:
      'The partner on the bottom lies on the edge of a bed or table with their legs up, while the other stands or kneels between them.',
    tags: ['Deep', 'Athletic', 'Spicy'],
  },
  {
    name: 'Standing Doggy',
    about:
      'One partner leans over a piece of furniture (like a bed or sofa) while the other stands behind them. Great for a quick and energetic encounter.',
    tags: ['Quickie', 'Athletic', 'Spicy'],
  },
  {
    name: 'The G-Whiz',
    about:
      'Similar to missionary, but the partner on the bottom keeps their knees tucked tightly toward their chest, focusing the sensation on the G-spot.',
    tags: ['Intimate', 'Deep', 'Classic'],
  },
  {
    name: 'The Lazy Man',
    about:
      "Both partners lie on their sides facing each other. One partner places their top leg over the other's hip. It is low-effort but high-intimacy.",
    tags: ['Lazy', 'Slow', 'Intimate'],
  },
  {
    name: 'The Flatiron',
    about:
      'One partner lies flat on their stomach while the other lies on top of them from behind. It is a grounded, full-body contact variation of doggy style.',
    tags: ['Deep', 'Sensory', 'Spicy'],
  },
  {
    name: 'The Crouching Tiger',
    about:
      'A variation of doggy style where the partner on the bottom keeps their chest low to the ground and their hips elevated.',
    tags: ['Spicy', 'Deep', 'Classic'],
  },
  {
    name: 'The Waterfall',
    about:
      'The partner on the bottom lies on the bed with their head and shoulders hanging slightly off the edge, while the other partner stands over them.',
    tags: ['Visual', 'Adventurous', 'Unique'],
  },
  {
    name: 'The Bridge',
    about:
      'The partner on the bottom arches their back into a bridge position, supported by their hands and feet, while the other partner is on top.',
    tags: ['Athletic', 'Intimate', 'Spicy'],
  },
  {
    name: 'The X',
    about:
      'Both partners lie flat and face each other, but at an angle so their bodies form an \"X\" shape. It is a shallow but very sensitive angle.',
    tags: ['Unique', 'Slow', 'Intimate'],
  },
  {
    name: 'The Seated Butterfly',
    about:
      'The partner on the bottom sits on the edge of a chair or bed, and the other partner stands or kneels in front of them.',
    tags: ['Intimate', 'Deep', 'Dominant'],
  },
  {
    name: 'The Lap Dance',
    about:
      'One partner sits in a sturdy chair while the other sits on their lap facing away, leaning forward for a different angle of sensation.',
    tags: ['Dominant', 'Visual', 'Spicy'],
  },
  {
    name: 'The Spider',
    about:
      'Both partners sit facing each other with legs intertwined, using their arms to prop themselves up and move in a rocking motion.',
    tags: ['Athletic', 'Intimate', 'Unique'],
  },
  {
    name: 'The Mermaid',
    about:
      'The partner on the bottom lies on their side with legs pressed together, while the other partner approaches from the side or behind.',
    tags: ['Sensory', 'Unique', 'Slow'],
  },
  {
    name: 'The Snow Angel',
    about:
      'Both partners lie face-to-face, fully extended, and move their arms and legs in a rhythmic, sweeping motion.',
    tags: ['Slow', 'Intimate', 'Low Effort'],
  },
  {
    name: 'The Coital Alignment Technique',
    about:
      'A modified missionary where the top partner moves higher up, creating a grinding motion rather than a thrusting one.',
    tags: ['Slow', 'Intimate', 'G-Spot'],
  },
  {
    name: 'The Standing O',
    about:
      'Both partners stand face-to-face. One partner lifts the other (or the other wraps their legs around the waist) while supported by a wall.',
    tags: ['Athletic', 'Spicy', 'Quickie'],
  },
  {
    name: 'The Wall Lean',
    about:
      'One partner stands with their back against the wall for support while the other partner is in front or behind them.',
    tags: ['Spicy', 'Quickie', 'Athletic'],
  },
  {
    name: 'The Wheelbarrow',
    about:
      'One partner holds their weight on their hands while the other holds their legs, similar to the childhood game.',
    tags: ['Athletic', 'Adventurous', 'Spicy'],
  },
  {
    name: 'The Pretzel',
    about:
      'One partner lies on their side while the other kneels and lifts the top leg of the partner on the bottom, wrapping it around their waist.',
    tags: ['Deep', 'Unique', 'Intimate'],
  },
  {
    name: 'The T-Square',
    about:
      'One partner lies on their back while the other lies perpendicular across them. This creates a unique angle for stimulation.',
    tags: ['Unique', 'Sensory', 'Low Effort'],
  },
  {
    name: 'The Corkscrew',
    about:
      'The partner on the bottom lies on their side, and the partner on top approaches from behind but at a twisted angle.',
    tags: ['Deep', 'Adventurous', 'Spicy'],
  },
  {
    name: 'The Slide',
    about:
      'One partner sits on a chair or the edge of the bed, and the other partner slides onto them while facing toward them.',
    tags: ['Intimate', 'Slow', 'Dominant'],
  },
  {
    name: 'The Pinwheel',
    about:
      'Both partners lie on their sides, but facing opposite directions, allowing for a unique way to intertwine legs.',
    tags: ['Unique', 'Slow', 'Intimate'],
  },
  {
    name: 'The Wrap Around',
    about:
      "From a standing position, one partner wraps both legs around the other's waist while being held against a sturdy surface.",
    tags: ['Quickie', 'Athletic', 'Spicy'],
  },
  {
    name: 'The Seashell',
    about:
      'A deep version of missionary where the partner on the bottom brings their legs all the way back until their feet are near their head.',
    tags: ['Deep', 'Spicy', 'Athletic'],
  },
  {
    name: 'The Kneel',
    about:
      'Both partners kneel facing each other, allowing for a balanced height and easy reaching for physical contact.',
    tags: ['Intimate', 'Classic', 'Low Effort'],
  },
  {
    name: 'The Balcony',
    about:
      'One partner stands and leans over a railing or high piece of furniture while the other partner approaches from behind.',
    tags: ['Quickie', 'Visual', 'Spicy'],
  },
  {
    name: 'The Firecracker',
    about:
      'The partner on the bottom lies on their back at the very edge of the bed with legs held high, while the other partner stands.',
    tags: ['Deep', 'Visual', 'Spicy'],
  },
  {
    name: 'The Side Saddle',
    about:
      'A variation of cowgirl where the partner on top sits sideways rather than facing forward or backward.',
    tags: ['Dominant', 'Unique', 'Slow'],
  },
  {
    name: 'The Eagle',
    about:
      'The partner on the bottom lies on their back with legs spread wide and high, while the partner on top kneels.',
    tags: ['Classic', 'Deep', 'Intimate'],
  },
  {
    name: 'The Crossbow',
    about:
      'The partner on the bottom lies on their back with one leg flat and the other raised, while the partner on top kneels to the side.',
    tags: ['Unique', 'Deep', 'Intimate'],
  },
  {
    name: 'The Doggy Stand',
    about:
      'One partner stands on the floor and leans forward onto the bed, while the other stands behind them.',
    tags: ['Classic', 'Spicy', 'Low Effort'],
  },
  {
    name: 'The Helicopter',
    about:
      'A playful variation where the partner on top rotates their body 360 degrees while staying connected.',
    tags: ['Adventurous', 'Unique', 'Athletic'],
  },
  {
    name: 'The Piledriver',
    about:
      'The partner on the bottom lies on their back and lifts their hips high, supported by the partner on top who is kneeling.',
    tags: ['Deep', 'Athletic', 'Spicy'],
  },
  {
    name: 'The Frog',
    about:
      'One partner squats on top of the other, who is lying down. This allows for a bouncing movement and great control.',
    tags: ['Dominant', 'Athletic', 'Visual'],
  },
  {
    name: 'The Spooning Reverse',
    about:
      'Both partners lie on their sides, but the partner behind is facing the opposite direction.',
    tags: ['Unique', 'Lazy', 'Slow'],
  },
  {
    name: 'The Side-By-Side',
    about:
      'Both partners lie on their sides facing each other, with their legs alternating to get as close as possible.',
    tags: ['Intimate', 'Slow', 'Romantic'],
  },
  {
    name: 'The Arc de Triomphe',
    about:
      'The partner on the bottom arches their back while the partner on top kneels over them.',
    tags: ['Athletic', 'Spicy', 'Unique'],
  },
  {
    name: 'The High Chair',
    about:
      'One partner sits on a high surface like a kitchen counter while the other stands between their legs.',
    tags: ['Quickie', 'Visual', 'Spicy'],
  },
  {
    name: 'The Deep Diver',
    about:
      "A missionary variation where the bottom partner's hips are elevated by a pillow for a steeper angle.",
    tags: ['G-Spot', 'Deep', 'Classic'],
  },
  {
    name: 'The Scuba',
    about:
      'Both partners lie flat on their stomachs, one on top of the other, moving in a subtle sliding motion.',
    tags: ['Unique', 'Sensory', 'Slow'],
  },
  {
    name: 'The Table Top',
    about:
      'One partner gets on all fours on a table, and the other stands behind them.',
    tags: ['Visual', 'Adventurous', 'Spicy'],
  },
  {
    name: 'The Stairway',
    about:
      'Using the stairs to create a height difference that makes standing positions easier.',
    tags: ['Quickie', 'Unique', 'Athletic'],
  },
  {
    name: 'The Rocking Horse',
    about:
      'In the cowgirl position, the partner on top leans forward and rocks their weight back and forth.',
    tags: ['Dominant', 'Intimate', 'Slow'],
  },
  {
    name: 'The Face-to-Face Spoon',
    about:
      'Spooning but facing each other, allowing for kissing and eye contact.',
    tags: ['Intimate', 'Slow', 'Romantic'],
  },
  {
    name: 'The Suspended Scissors',
    about:
      "One partner lies on their side and the other kneels, lifting one of the partner's legs.",
    tags: ['Deep', 'Athletic', 'Unique'],
  },
  {
    name: 'The Handstand',
    about:
      'One partner is supported in a partial handstand against a wall or bed. For the athletic.',
    tags: ['Athletic', 'Adventurous', 'Spicy'],
  },
  {
    name: 'The Desk Job',
    about:
      'One partner sits on a desk or table, and the other stands, allowing for eye-level contact.',
    tags: ['Visual', 'Quickie', 'Spicy'],
  },
  {
    name: 'The G-Spotter',
    about:
      "A very slow missionary where the bottom partner's legs are kept closed and tight.",
    tags: ['G-Spot', 'Slow', 'Intimate'],
  },
  {
    name: 'The Twist',
    about:
      'One partner lies on their back with legs to one side, while the partner on top approaches from the front.',
    tags: ['Unique', 'Deep', 'Intimate'],
  },
  {
    name: 'The Kneeling Doggy',
    about:
      'Both partners are kneeling, but the one in front leans forward on their elbows.',
    tags: ['Classic', 'Low Effort', 'Spicy'],
  },
  {
    name: 'The Leg Over',
    about:
      "During missionary, the partner on the bottom puts one leg over the partner on top's shoulder.",
    tags: ['Classic', 'Deep', 'Intimate'],
  },
  {
    name: 'The Mountain Climber',
    about:
      "One partner stands while the other lies on the bed, with their legs wrapped around the standing partner's waist.",
    tags: ['Athletic', 'Spicy', 'Deep'],
  },
  {
    name: 'The Pillow Talk',
    about:
      'Using a stack of pillows under the hips to change the angle of any classic position.',
    tags: ['Lazy', 'G-Spot', 'Low Effort'],
  },
  {
    name: 'The Reverse Spoon',
    about:
      'The \"big spoon\" lies on their back while the \"little spoon\" sits on top facing away.',
    tags: ['Dominant', 'Unique', 'Slow'],
  },
  {
    name: 'The Snake',
    about:
      'Both partners lie flat on their stomachs, facing each other, and slither or slide to create friction.',
    tags: ['Sensory', 'Slow', 'Unique'],
  },
  {
    name: 'The V',
    about:
      'The partner on the bottom lies on their back and spreads their legs into a wide V.',
    tags: ['Classic', 'Intimate', 'Low Effort'],
  },
  {
    name: 'The Half-Lotus',
    about:
      "A seated position where only one of the top partner's legs is wrapped around the other's waist.",
    tags: ['Intimate', 'Slow', 'Unique'],
  },
  {
    name: 'The Fusion',
    about:
      "The partner on top lies between the bottom partner's legs and wraps their own legs around the bottom partner's thighs.",
    tags: ['Intimate', 'Slow', 'Sensory'],
  },
  {
    name: 'The Reclined Cowgirl',
    about:
      "The partner on top leans all the way back until their head is resting on the bottom partner's legs.",
    tags: ['Visual', 'Dominant', 'Slow'],
  },
  {
    name: 'The 69',
    about:
      "Both partners are positioned so their heads are at the other's feet, allowing for simultaneous oral pleasure.",
    tags: ['Classic', 'Intimate', 'Spicy'],
  },
];

const tagSort = (a, b) => a.localeCompare(b);

const hashString = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildCardArt = (name) => {
  const hue = hashString(name) % 360;
  const hue2 = (hue + 36) % 360;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hue} 55% 28%)"/>
          <stop offset="100%" stop-color="hsl(${hue2} 50% 18%)"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.2" cy="0.2" r="0.8">
          <stop offset="0%" stop-color="hsla(${hue} 70% 70% / 0.35)"/>
          <stop offset="100%" stop-color="hsla(${hue} 40% 20% / 0)"/>
        </radialGradient>
      </defs>
      <rect width="800" height="480" fill="url(#bg)"/>
      <rect width="800" height="480" fill="url(#glow)"/>
      <g opacity="0.22" stroke="hsla(${hue} 80% 80% / 0.35)" stroke-width="1">
        ${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 60}" y1="-40" x2="${i * 60 + 80}" y2="520" />`).join('')}
      </g>
      <circle cx="620" cy="120" r="90" fill="hsla(${hue2} 60% 60% / 0.15)"/>
      <text x="60" y="420" fill="hsla(0 0% 100% / 0.6)" font-family="Playfair Display, serif" font-size="42" letter-spacing="6">
        ${name.toUpperCase()}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const FunFactsPage = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeTag, setActiveTag] = useState('All');
  const [hoveredName, setHoveredName] = useState(null);
  const [favoriteMap, setFavoriteMap] = useState({});
  const [pulseName, setPulseName] = useState(null);

  const tags = useMemo(() => {
    const tagSet = new Set();
    positions.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return ['All', ...Array.from(tagSet).sort(tagSort)];
  }, []);

  const artMap = useMemo(() => {
    const map = new Map();
    positions.forEach((item) => {
      map.set(item.name, buildCardArt(item.name));
    });
    return map;
  }, []);

  const filteredPositions = useMemo(() => {
    if (activeTag === 'All') {
      return positions;
    }
    return positions.filter((item) => item.tags.includes(activeTag));
  }, [activeTag]);

  const rainLines = useMemo(
    () =>
      Array.from({ length: 70 }, (_, index) => ({
        id: `rain-${index}`,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2 + Math.random() * 2,
        height: 24 + Math.random() * 36,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    [],
  );

  const toggleFavorite = (name) => {
    setFavoriteMap((prev) => ({ ...prev, [name]: !prev[name] }));
    setPulseName(name);
    window.setTimeout(() => setPulseName(null), 450);
  };

  const handleUnlock = (event) => {
    event.preventDefault();
    if (password === 'Razia@123') {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleViewMore = (name) => {
    const query = `What is ${name} Sex position`;
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isUnlocked) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0b0b12] px-4 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] via-[#171325] to-[#1c1026]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(181,146,187,0.18),_transparent_55%)]" />
        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-white/20 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="text-xs uppercase tracking-[0.5em] text-rose-200/70">Private Page</p>
            <h1 className="sanctuary-title mt-4 text-3xl sm:text-4xl">Are you really Meowisiki because this page is only for her</h1>
            <p className="sanctuary-body mt-3 text-sm text-white/70">Enter the password and prove</p>

            <form onSubmit={handleUnlock} className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-sm outline-none focus:border-rose-200/60"
              />
              {showError && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
                  Wrong password
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-full border border-rose-200/50 bg-rose-200/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-rose-100 transition hover:bg-rose-200/30"
              >
                Unlock
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b12] px-4 py-16 text-white sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .sanctuary-title { font-family: 'Playfair Display', serif; }
        .sanctuary-body { font-family: 'Inter', sans-serif; }

        .sanctuary-smoke {
          position: absolute;
          inset: -30%;
          background: radial-gradient(circle at 20% 30%, rgba(112, 88, 160, 0.35), transparent 55%),
            radial-gradient(circle at 80% 20%, rgba(66, 52, 120, 0.4), transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 75, 120, 0.35), transparent 55%);
          opacity: 0.4;
          filter: blur(40px);
          animation: sanctuarySmoke 28s ease-in-out infinite;
        }

        @keyframes sanctuarySmoke {
          0% { transform: translateX(-6%) translateY(0); }
          50% { transform: translateX(6%) translateY(3%); }
          100% { transform: translateX(-6%) translateY(0); }
        }

        .sanctuary-rain {
          position: absolute;
          top: -20%;
          width: 1px;
          background: linear-gradient(to bottom, rgba(230, 210, 255, 0), rgba(170, 140, 220, 0.55));
          animation-name: sanctuaryRain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes sanctuaryRain {
          0% { transform: translateY(0); }
          100% { transform: translateY(140vh); }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] via-[#171325] to-[#1c1026]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(181,146,187,0.18),_transparent_55%)]" />
      <div className="sanctuary-smoke" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {rainLines.map((drop) => (
          <span
            key={drop.id}
            className="sanctuary-rain"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              opacity: drop.opacity,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-rose-200/70">Our Sanctuary</p>
          <h1 className="sanctuary-title mt-4 text-4xl sm:text-5xl lg:text-6xl">Our Sanctuary</h1>
          <p className="sanctuary-body mt-4 text-base text-white/70 sm:text-lg">
            A refined, intimate library of positions. Filter by heat level and explore at your pace.
          </p>
          <button
            type="button"
            onClick={() =>
              window.open(
                'https://www.google.com/search?q=What+is+Missionary+Sex+position',
                '_blank',
                'noopener,noreferrer',
              )
            }
            className="mt-6 rounded-full border border-rose-200/50 bg-rose-200/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100 transition hover:bg-rose-200/20"
          >
            View More
          </button>
        </header>

        <nav className="flex flex-wrap items-center justify-center gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                activeTag === tag
                  ? 'border-rose-200/80 bg-rose-200/20 text-rose-100 shadow-[0_0_25px_rgba(248,113,113,0.35)]'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-rose-200/50 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </nav>

        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          transition={{ layout: { duration: 0.35, ease: 'easeOut' } }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPositions.map((item) => {
              const isHovered = hoveredName === item.name;
              const isFavorite = Boolean(favoriteMap[item.name]);
              const isPulsing = pulseName === item.name;

              return (
                <motion.article
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  onHoverStart={() => setHoveredName(item.name)}
                  onHoverEnd={() => setHoveredName(null)}
                  onClick={() => setHoveredName((prev) => (prev === item.name ? null : item.name))}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(185, 120, 165, 0.25)' }}
                >
                  <div className="relative mb-4 h-36 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={artMap.get(item.name)}
                      alt={`${item.name} visual`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="sanctuary-title text-2xl text-white">{item.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={`${item.name}-${tag}`}
                            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(item.name);
                      }}
                      animate={isPulsing ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-full border border-white/20 bg-white/10 p-2 text-white/70 transition hover:text-rose-200"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-200 text-rose-200' : ''}`} />
                    </motion.button>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleViewMore(item.name);
                    }}
                    className="mt-4 rounded-full border border-rose-200/40 bg-rose-200/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-100 opacity-0 pointer-events-none transition group-hover:opacity-100 group-hover:pointer-events-auto hover:bg-rose-200/20"
                  >
                    View More
                  </button>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="sanctuary-body mt-4 text-sm leading-relaxed text-white/75"
                      >
                        {item.about}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
