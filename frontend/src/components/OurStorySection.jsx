import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const STORY_SECTIONS = [
  {
    id: 'turning-point',
    title: 'The Turning Point',
    body: `He used to be the guy everyone warned you about. He was tired—tired of the drama, the fake friends, and the way his past kept tripping him up. So, he left. He moved to a new place and buried his head in books. He worked so hard that people who knew him before wouldn't even recognize him. He looked like a success, and he felt proud of that, but his heart was still heavy.

Even though he had fixed his life on the outside, he still felt the sting of being betrayed. He felt lonely in a way that his mom or his new friends couldn't fix. He was starting to think that maybe "happy" just wasn't for him.`,
  },
  {
    id: 'dream',
    title: 'The Dream',
    isDream: true,
    body: `One morning, he woke up with a literal spark in his chest. He'd had a dream that felt more real than his actual life. In it, he was finally home. There was a dog and a cat, and the air felt warm, safe, and thick with a tension he'd never felt before.

He was standing in the middle of the room, shivering and soaked to the bone from the rain. Then, he felt her. She stepped up behind him and wrapped her arms tightly around his waist, pulling his back flush against her front. She was just as wet as he was, her damp clothes clinging to every curve. The heat coming off her skin was incredible—it was hot, electric, and it made his blood race.

She reached up, her wet fingers sliding over his cheeks to cover his eyes. He couldn't see her, but he could feel her everywhere. She didn't just hold him; she pressed into him like she wanted to melt their two bodies into one. As they moved together, the water from the rain mixed with the sweat of their skin and her own natural lubricant. It made everything slick and primal. Every time they touched, it felt like a physical hum, a wild energy that made him crave more.

They were both so wet, their skin sliding against each other with a heavy, rhythmic friction that felt both peaceful and completely out of control. He was going crazy for her—the way she smelled like rain and skin, the way her breath hitched against the back of his neck, and the way her body seemed to know exactly how to fit against his. It wasn't just a hug; it was a total surrender. He wanted to be held by her, to be controlled by her touch, while every inch of his skin screamed for more of her.

He wanted to see her face so badly, but she kept him blinded, letting him experience her only through his senses. When he finally forced his eyes open, he wasn't in the dream anymore. He was alone in his room, breathing hard, his skin still tingling from the ghost of her touch. But for the first time in years, he felt a strange, quiet joy. He didn't just want to get out of bed—he wanted to find the woman who belonged to that feeling.`,
  },
  {
    id: 'encounter',
    title: 'The Encounter',
    body: `That afternoon, he was helping a friend get ready for exams. It was freezing outside, so he stayed in the hallway. That's when he saw his roommate talking to a girl. His roommate was the kind of guy who always brought around people who were nothing but trouble, so he tried to look away.

But then he caught her eye. She looked trapped. He could tell she was uncomfortable and that his roommate was just using him to keep her talking. He didn't want her to suffer, so he played it cool. He made a quick excuse, sent a text to give her a reason to leave, and walked away.

He went to his room, and she went to hers. But it felt like he'd left a piece of himself standing there with her. He couldn't stop thinking about the way the air felt when she was nearby.`,
  },
  {
    id: 'beginning',
    title: 'The Beginning',
    body: `A little while later, she reached out and asked if he could help her study. His heart did a nervous skip, but he said yes. It was the best "yes" of his life.

From the second they sat down together for the books and the grades. It was just her. She had this way of looking at him that made the rest of the world go quiet. They started as friends, just talking and laughing, but every time their hands accidentally brushed against a page or their eyes met across the table, it felt like a promise they hadn't spoken out loud yet.`,
  },
  {
    id: 'face-in-the-rain',
    title: 'The Face in the Rain',
    body: `After lot later, the dream came back.

It was the same house, the same rain, and that same warm, skin-on-skin feeling. He was standing there, soaked and shivering, and she wrapped her arms around him from behind just like before. But this time, when she reached up to cover his eyes, he didn't stay still. He gently took her hands in his and turned around.

The air in the dream went still. As he looked at her, the blur finally cleared away. It wasn't a stranger anymore. It was her—the same girl who sat across from him at the Student Hub, the same girl who laughed at his jokes and asked him for help with her Exam. Seeing her face in that intimate, quiet space felt like coming home. He woke up with a start, his heart racing, realizing that the woman he had been dreaming of was the same one standing right in front of him in real life.

He didn't need to wonder anymore. The moment he saw her face in the dream—the same face that now looked at him with such kindness across a shared desk—the last piece of his broken past finally fell away. The "bad boy" he used to be was gone, replaced by a man who finally found a reason to stay, a reason to breathe, and a reason to love.

He looked at her, and his skin remembered the heat of the rain. He remembered the wild, electric energy of her touch and the way their bodies seemed to melt into one another, slick and perfect. It wasn't just a dream anymore; it was a promise waiting to be kept.

As he reached out and took her hand for the first time in the real world, a shockwave of that same familiar heat raced through him. Her skin was soft, her grip was certain, and the look in her eyes told him she felt it, too. They didn't need words. The tension between them was thick and sweet, a magnetic pull that whispered of all the intimate nights yet to come.`,
  },
  {
    id: 'real-start',
    title: 'The Real Start',
    isFinal: true,
    body: `They say this is where the story ends, with the boy finally finding his peace. But honestly? Now that he's tasted her presence and felt the fire of her touch, this isn't an ending at all. This is the breath before the plunge. This is where our real life—our wild, beautiful, and forever life—finally begins.`,
  },
];

const renderParagraphs = (text) =>
  text.split('\n\n').map((paragraph, index) => (
    <p key={`${paragraph.slice(0, 12)}-${index}`} className="leading-relaxed text-[15px] sm:text-base">
      {paragraph}
    </p>
  ));

export const OurStorySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDreamRevealed, setIsDreamRevealed] = useState(false);
  const stormAudioRef = useRef({
    context: null,
    rainSource: null,
    rainGain: null,
    thunderTimer: null,
  });

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 80 }, (_, index) => ({
        id: `rain-${index}`,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1.6 + Math.random() * 1.8,
        height: 24 + Math.random() * 38,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [],
  );
  const glassDrops = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: `glass-${index}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 8 + Math.random() * 14,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const audioState = stormAudioRef.current;
    if (audioState.thunderTimer) {
      window.clearTimeout(audioState.thunderTimer);
    }
    if (audioState.rainSource) {
      try {
        audioState.rainSource.stop();
      } catch {
        // ignore stop errors
      }
    }
    if (audioState.context) {
      audioState.context.close();
    }
    stormAudioRef.current = {
      context: null,
      rainSource: null,
      rainGain: null,
      thunderTimer: null,
    };
  }, [isOpen]);

  const scheduleThunder = () => {
    const audioState = stormAudioRef.current;
    if (!audioState.context) {
      return;
    }

    const delay = 7000 + Math.random() * 9000;
    audioState.thunderTimer = window.setTimeout(() => {
      const ctx = audioState.context;
      if (!ctx) {
        return;
      }
      const now = ctx.currentTime;
      const duration = 2.2 + Math.random() * 1.6;

      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 180;

      const thunderGain = ctx.createGain();
      thunderGain.gain.setValueAtTime(0.0001, now);
      thunderGain.gain.exponentialRampToValueAtTime(0.6, now + 0.05);
      thunderGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noiseSource.connect(lowpass).connect(thunderGain).connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + duration + 0.1);

      scheduleThunder();
    }, delay);
  };

  const startStormAudio = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const audioState = stormAudioRef.current;
    if (audioState.context) {
      if (audioState.context.state === 'suspended') {
        await audioState.context.resume();
      }
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return;
    }

    const ctx = new AudioContext();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 320;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 4200;

    const gain = ctx.createGain();
    gain.gain.value = 0.18;

    source.connect(highpass).connect(lowpass).connect(gain).connect(ctx.destination);
    source.start();

    stormAudioRef.current = {
      context: ctx,
      rainSource: source,
      rainGain: gain,
      thunderTimer: null,
    };

    scheduleThunder();
  };

  const handleOpen = () => {
    setIsOpen(true);
    startStormAudio();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section id="our-story" className="relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;500;600&display=swap');

        .story-font-body { font-family: 'Lora', serif; }
        .story-font-title { font-family: 'Playfair Display', serif; }

        .story-rain-drop {
          position: absolute;
          top: -20%;
          width: 1.5px;
          background: linear-gradient(to bottom, rgba(210, 228, 255, 0), rgba(190, 210, 255, 0.75));
          animation-name: storyRain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes storyRain {
          0% { transform: translateY(0); }
          100% { transform: translateY(140vh); }
        }

        .story-pulse {
          animation: storyPulse 3.4s ease-in-out infinite;
        }

        @keyframes storyPulse {
          0% { box-shadow: 0 0 0 0 rgba(120, 155, 255, 0.15); }
          70% { box-shadow: 0 0 36px 8px rgba(120, 155, 255, 0.28); }
          100% { box-shadow: 0 0 0 0 rgba(120, 155, 255, 0.15); }
        }

        .story-glow {
          animation: storyGlow 2.6s ease-in-out infinite;
        }

        @keyframes storyGlow {
          0% { box-shadow: 0 0 12px rgba(110, 150, 255, 0.25), 0 0 26px rgba(70, 90, 200, 0.2); }
          50% { box-shadow: 0 0 26px rgba(120, 170, 255, 0.45), 0 0 46px rgba(90, 110, 220, 0.3); }
          100% { box-shadow: 0 0 12px rgba(110, 150, 255, 0.25), 0 0 26px rgba(70, 90, 200, 0.2); }
        }

        .story-arrow {
          position: absolute;
          top: -26px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.65);
          animation: storyArrow 2s ease-in-out infinite;
        }

        .story-arrow-left { left: -18px; transform: rotate(-12deg); }
        .story-arrow-right { right: -18px; transform: rotate(12deg); }

        @keyframes storyArrow {
          0% { transform: translateY(0) scale(1); opacity: 0.55; }
          50% { transform: translateY(4px) scale(1.05); opacity: 0.9; }
          100% { transform: translateY(0) scale(1); opacity: 0.55; }
        }

        .story-breeze {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle at 20% 40%, rgba(120, 150, 255, 0.2), transparent 60%),
            radial-gradient(circle at 80% 60%, rgba(90, 120, 220, 0.18), transparent 65%),
            radial-gradient(circle at 50% 20%, rgba(150, 180, 255, 0.12), transparent 55%);
          opacity: 0.45;
          filter: blur(20px);
          animation: storyBreeze 18s linear infinite;
        }

        @keyframes storyBreeze {
          0% { transform: translateX(-6%) translateY(0); }
          50% { transform: translateX(6%) translateY(3%); }
          100% { transform: translateX(-6%) translateY(0); }
        }

        .story-mist {
          position: absolute;
          inset: -10% -20%;
          background: linear-gradient(120deg, rgba(20, 30, 60, 0.45), rgba(20, 40, 80, 0.15), rgba(40, 30, 70, 0.4));
          opacity: 0.35;
          filter: blur(10px);
          animation: storyMist 26s ease-in-out infinite;
        }

        @keyframes storyMist {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-6%) translateY(-2%); }
          100% { transform: translateX(0) translateY(0); }
        }

        .story-lightning {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 18%, rgba(255, 255, 255, 0.6), transparent 45%),
            radial-gradient(circle at 35% 12%, rgba(200, 220, 255, 0.45), transparent 50%),
            linear-gradient(120deg, rgba(120, 170, 255, 0.2), transparent 40%);
          opacity: 0;
          mix-blend-mode: screen;
          animation: storyLightning 10s infinite;
        }

        @keyframes storyLightning {
          0%, 88%, 100% { opacity: 0; }
          89% { opacity: 0.65; }
          90% { opacity: 0.15; }
          91% { opacity: 0.75; }
          92% { opacity: 0.2; }
          93% { opacity: 0.85; }
          94% { opacity: 0; }
        }

        .story-lightning-flash {
          position: absolute;
          inset: 0;
          background: rgba(160, 190, 255, 0.12);
          opacity: 0;
          animation: storyFlash 10s infinite;
        }

        @keyframes storyFlash {
          0%, 88%, 100% { opacity: 0; }
          89% { opacity: 0.25; }
          90% { opacity: 0.08; }
          91% { opacity: 0.32; }
          92% { opacity: 0.1; }
          93% { opacity: 0.28; }
          94% { opacity: 0; }
        }

        .story-glass-drop {
          position: absolute;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), rgba(120, 150, 255, 0.35) 60%, transparent 72%);
          box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.25), 0 0 10px rgba(110, 150, 255, 0.2);
          animation-name: storyGlassDrop;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes storyGlassDrop {
          0% { transform: translateY(0) scale(0.95); opacity: 0; }
          12% { opacity: 0.7; }
          40% { opacity: 0.35; transform: translateY(10px) scale(1); }
          70% { opacity: 0.6; transform: translateY(26px) scale(0.98); }
          100% { opacity: 0; transform: translateY(40px) scale(0.92); }
        }
      `}</style>

      {!isOpen && (
        <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70"
          >
            <span>Click here</span>
            <span className="text-base text-white/60">↓</span>
          </motion.div>
          <div className="relative">
            <span className="story-arrow story-arrow-left">↘</span>
            <span className="story-arrow story-arrow-right">↙</span>
            <motion.button
              type="button"
              onClick={handleOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="story-glow group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-gradient-to-r from-[#121b3c] via-[#1b2450] to-[#2a1740] px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white backdrop-blur"
            >
              <span className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(130,160,255,0.35),transparent_60%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                Our Story <span className="text-lg">📖</span>
              </span>
              <span className="pointer-events-none absolute -right-10 -top-12 h-24 w-24 rounded-full bg-white/10 blur-2xl transition duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />
            </motion.button>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Tap to enter the rain
          </p>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="story-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1022] via-[#121a3a] to-[#1b0f2f]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(98,127,255,0.18),_transparent_45%)] opacity-70" />
            <div className="story-breeze" />
            <div className="story-mist" />
            <div className="story-lightning" />
            <div className="story-lightning-flash" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {rainDrops.map((drop) => (
                <span
                  key={drop.id}
                  className="story-rain-drop"
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

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {glassDrops.map((drop) => (
                <span
                  key={drop.id}
                  className="story-glass-drop"
                  style={{
                    left: `${drop.left}%`,
                    top: `${drop.top}%`,
                    width: `${drop.size}px`,
                    height: `${drop.size}px`,
                    opacity: drop.opacity,
                    animationDuration: `${drop.duration}s`,
                    animationDelay: `${drop.delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative h-full w-full overflow-y-auto px-5 py-10 sm:px-10">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close story"
                className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/10 p-2 text-white/80 transition hover:bg-white/20"
              >
                ✕
              </button>

              <div className="mx-auto w-full max-w-4xl story-font-body text-white/85">
                <div className="mb-10 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Our Story</p>
                  <h2 className="story-font-title mt-4 text-4xl sm:text-5xl lg:text-6xl text-white">
                    Our Story 📖
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-white/60">
                    A rain-soaked memory, a dream, and the beginning of forever.
                  </p>
                </div>

                <div className="space-y-10">
                  {STORY_SECTIONS.map((section, index) => {
                    const baseClasses =
                      'rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur';
                    const pulseClass = section.isFinal ? 'story-pulse' : '';

                    if (section.isDream) {
                      return (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                          className={`${baseClasses}`}
                        >
                          <h3 className="story-font-title text-2xl sm:text-3xl text-white mb-4">
                            {section.title}
                          </h3>
                          <div
                            className="group relative cursor-pointer"
                            onClick={() => setIsDreamRevealed(true)}
                          >
                            <div
                              className={`space-y-4 text-white/75 transition duration-500 ${
                                isDreamRevealed ? 'blur-0' : 'blur-[2px]'
                              } group-hover:blur-0`}
                            >
                              {renderParagraphs(section.body)}
                            </div>
                            {!isDreamRevealed && (
                              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/0 via-white/0 to-[#0d1127]/40" />
                            )}
                          </div>
                          <div className="mt-6 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => setIsDreamRevealed(true)}
                              className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/20"
                            >
                              Clear the Mist
                            </button>
                            <span className="text-xs text-white/50">
                              Hover to reveal, or tap the button.
                            </span>
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className={`${baseClasses} ${pulseClass}`}
                      >
                        <h3 className="story-font-title text-2xl sm:text-3xl text-white mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-4 text-white/75">{renderParagraphs(section.body)}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
