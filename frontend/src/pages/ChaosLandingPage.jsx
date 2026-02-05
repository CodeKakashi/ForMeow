import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const stageTitles = {
  proposal1: 'Will you be my Valentine?',
  fakeout: "Welcome to the special website... let's start then.",
  proposal2: 'Will you marry me?',
};
const PUNISHMENT_WHATSAPP_NUMBER = '+44 7887153839';

const PROPOSAL1_PUNISHMENT_TIERS = [
  {
    level: 1,
    emoji: '💋',
    title: 'Forehead Kiss Tax',
    punishment: 'Penalty unlocked: 3 surprise forehead kisses.',
  },
  {
    level: 2,
    emoji: '🎤',
    title: 'Meow Voice Note Duty',
    punishment: 'Send one dramatic "I miss you" voice note in cat language.',
  },
  {
    level: 3,
    emoji: '🕺',
    title: 'Zoomie Dance Order',
    punishment: 'Mandatory 10-second goofy dance in the living room.',
  },
  {
    level: 4,
    emoji: '🍫',
    title: 'Snack Bribe Protocol',
    punishment: 'Offer one chocolate or snack tribute to calm the cat.',
  },
  {
    level: 5,
    emoji: '🧸',
    title: 'Cuddle Summon',
    punishment: 'Instant cuddle within 5 minutes. No appeals allowed.',
  },
  {
    level: 6,
    emoji: '🤳',
    title: 'Selfie Penalty',
    punishment: 'Send one shamelessly cute selfie with a kissy face.',
  },
  {
    level: 7,
    emoji: '🎵',
    title: 'Playlist Duty',
    punishment: 'Build a 3-song mini playlist titled "My Favorite Human".',
  },
  {
    level: 8,
    emoji: '🐾',
    title: 'Paw Promise Oath',
    punishment: 'Say "I choose you, always" in your cutest cat voice.',
  },
];

const PROPOSAL2_PUNISHMENT_TIERS = [
  {
    level: 1,
    emoji: '🌹',
    title: 'Rose Compliment Fine',
    punishment: 'Give one poetic compliment worthy of a romance movie.',
  },
  {
    level: 2,
    emoji: '📞',
    title: 'Call-Me-Baby Duty',
    punishment: 'Drop a sweet call or voice note within 10 minutes.',
  },
  {
    level: 3,
    emoji: '🧁',
    title: 'Dessert Bribe',
    punishment: 'Promise one dessert date with zero negotiations.',
  },
  {
    level: 4,
    emoji: '🎬',
    title: 'Movie Night Surrender',
    punishment: 'She gets full movie choice + cuddle rights.',
  },
  {
    level: 5,
    emoji: '💞',
    title: '100-Kiss Challenge',
    punishment: 'Redeemable for 100 tiny kisses over the next date.',
  },
  {
    level: 6,
    emoji: '🧸',
    title: 'No-Hissing Treaty',
    punishment: 'One full evening of only gentle words and soft hugs.',
  },
  {
    level: 7,
    emoji: '👩‍❤️‍👨',
    title: 'Future-Date Contract',
    punishment: 'Plan one dreamy date idea and send the full itinerary.',
  },
  {
    level: 8,
    emoji: '💍',
    title: 'Wifey Privilege Premium',
    punishment: 'Officially call her "my wife meow" for the rest of the day.',
  },
];

const getPunishmentForLevel = (level, punishmentTiers) => {
  const validLevel = Math.max(0, Math.floor(level));
  return (
    [...punishmentTiers]
      .reverse()
      .find((punishment) => validLevel >= punishment.level) || null
  );
};

const getNoButtonLabel = (level) => {
  if (level >= 8) {
    return 'Nope? Brave 😼';
  }
  if (level >= 5) {
    return 'Still No? 🙀';
  }
  if (level >= 3) {
    return 'No-ish 🐾';
  }
  return 'No';
};

const normalizePhoneNumber = (rawValue) => {
  const digits = (rawValue || '').replace(/\D/g, '');
  if (!digits) {
    return '';
  }

  if (digits.startsWith('00')) {
    return digits.slice(2);
  }

  return digits;
};

const buildWhatsAppUrl = (digits, message) => {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

const getBackgroundStyle = (stage, angerLevel) => {
  const anger = Math.min(angerLevel, 8);

  if (stage === 'proposal2') {
    return {
      background: `radial-gradient(circle at top, hsl(355 90% ${30 - anger * 1.6}%), hsl(356 85% ${
        19 - anger * 1.2
      }%), hsl(359 80% ${11 - anger * 0.7}%))`,
    };
  }

  return {
    background: `radial-gradient(circle at top, hsl(340 100% ${97 - anger * 3.8}%), hsl(350 95% ${
      93 - anger * 4
    }%), hsl(4 86% ${89 - anger * 4.2}%))`,
  };
};

export const ChaosLandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const noButtonRef = useRef(null);
  const moveThrottleRef = useRef(0);
  const redirectTimerRef = useRef(null);
  const hasSentFinalWhatsAppRef = useRef(false);

  const [stage, setStage] = useState('proposal1');
  const [angerLevel, setAngerLevel] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 72, y: 70 });

  const interactiveStage = stage === 'proposal1' || stage === 'proposal2';
  const isSecondProposal = stage === 'proposal2';
  const activePunishmentTiers = useMemo(
    () => (stage === 'proposal2' ? PROPOSAL2_PUNISHMENT_TIERS : PROPOSAL1_PUNISHMENT_TIERS),
    [stage],
  );
  const punishmentSetLabel = stage === 'proposal2' ? 'Proposal #2 Set' : 'Proposal #1 Set';
  const currentPunishment = useMemo(
    () => getPunishmentForLevel(angerLevel, activePunishmentTiers),
    [angerLevel, activePunishmentTiers],
  );
  const unlockedPunishments = useMemo(
    () => activePunishmentTiers.filter((punishment) => angerLevel >= punishment.level),
    [angerLevel, activePunishmentTiers],
  );

  const floatingTokens = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: `chaos-float-${index}`,
        left: 8 + Math.random() * 84,
        top: 8 + Math.random() * 78,
        icon: index % 3 === 0 ? '🐾' : index % 3 === 1 ? '💘' : '✨',
        duration: 3 + Math.random() * 2.5,
        delay: index * 0.08,
      })),
    [],
  );

  const jumpNoButton = useCallback(() => {
    const minX = 14;
    const maxX = 86;
    const minY = 48;
    const maxY = 84;

    setNoButtonPosition({
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    });
    setAngerLevel((previous) => Math.min(previous + 1, 20));
  }, []);

  useEffect(() => {
    setAngerLevel(0);
    setNoButtonPosition({ x: 72, y: 70 });
  }, [stage]);

  useEffect(() => {
    if (stage !== 'fakeout') {
      return;
    }

    const timerId = window.setTimeout(() => {
      setStage('proposal2');
    }, 2300);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== 'reveal') {
      return;
    }

    redirectTimerRef.current = window.setTimeout(() => {
      navigate('/home');
    }, 3300);

    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, [stage, navigate]);

  const handleMouseMove = (event) => {
    if (!interactiveStage || !noButtonRef.current || !containerRef.current) {
      return;
    }

    const now = Date.now();
    if (now - moveThrottleRef.current < 120) {
      return;
    }

    const rect = noButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

    if (distance < 130) {
      moveThrottleRef.current = now;
      jumpNoButton();
    }
  };

  const handleYesClick = () => {
    if (stage === 'proposal1') {
      setStage('fakeout');
      return;
    }

    if (stage === 'proposal2') {
      if (!hasSentFinalWhatsAppRef.current) {
        hasSentFinalWhatsAppRef.current = true;
        // sendPunishmentsToWhatsApp();
      }
      setStage('reveal');
    }
  };

  const sendPunishmentsToWhatsApp = useCallback(() => {
    const digits = normalizePhoneNumber(PUNISHMENT_WHATSAPP_NUMBER);
    if (!digits) {
      window.alert(
        'Set REACT_APP_GRUMPY_WHATSAPP_NUMBER (or REACT_APP_EMERGENCY_NUMBER) to your WhatsApp number.',
      );
      return;
    }

    const unlockedText =
      unlockedPunishments.length > 0
        ? unlockedPunishments
            .map((punishment) => `L${punishment.level}: ${punishment.title} - ${punishment.punishment}`)
            .join('\n')
        : 'No punishments unlocked yet. Grumpy level is still peaceful.';

    const message = [
      '😾 Grumpy Cat Punishment Alert!',
      `Stage: ${stage === 'proposal2' ? 'Will you marry me?' : 'Will you be my Valentine?'}`,
      `Punishment Set: ${punishmentSetLabel}`,
      `Current Grumpy Level: ${angerLevel}`,
      `Latest Punishment: ${currentPunishment ? currentPunishment.title : 'None yet'}`,
      '',
      'Unlocked Punishments:',
      unlockedText,
    ].join('\n');

    const whatsappUrl = buildWhatsAppUrl(digits, message);
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.alert('Please allow pop-ups for this site to open WhatsApp in a new tab.');
    }
  }, [angerLevel, currentPunishment, punishmentSetLabel, stage, unlockedPunishments]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-8 sm:py-14"
      style={getBackgroundStyle(stage, angerLevel)}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0">
        {floatingTokens.map((token) => (
          <motion.span
            key={token.id}
            className="absolute text-xl opacity-25"
            style={{ left: `${token.left}%`, top: `${token.top}%` }}
            animate={{ y: [0, -14, 0], opacity: [0.1, 0.35, 0.1], rotate: [-4, 4, -4] }}
            transition={{ duration: token.duration, repeat: Infinity, delay: token.delay }}
          >
            {token.icon}
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[82vh] w-full max-w-5xl items-center justify-center">
        <AnimatePresence mode="wait">
          {(stage === 'proposal1' || stage === 'proposal2') && (
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -18 }}
              className={`relative w-full rounded-3xl border p-7 shadow-2xl backdrop-blur-sm sm:p-10 ${
                isSecondProposal
                  ? 'border-red-200/40 bg-black/35 text-rose-50'
                  : 'border-white/75 bg-white/80 text-foreground'
              }`}
            >
              <p
                className={`text-center text-xs font-bold uppercase tracking-[0.2em] ${
                  isSecondProposal ? 'text-rose-200/80' : 'text-muted-foreground'
                }`}
              >
                A special website for a special person.
              </p>
              <h1 className="mt-4 text-center font-heading text-5xl leading-tight sm:text-7xl">{stageTitles[stage]}</h1>
              <p className={`mt-3 text-center text-sm sm:text-base ${isSecondProposal ? 'text-rose-100/85' : 'text-foreground/75'}`}>
                {isSecondProposal
                  ? 'The suspense is intentional. Choose wisely, Cat-Queen.'
                  : 'One tiny click for you, one giant purr for me.'}
              </p>

              <div className="mt-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleYesClick}
                  className={`rounded-full px-8 py-3 text-lg font-bold shadow-lg transition hover:opacity-95 ${
                    isSecondProposal
                      ? 'bg-gradient-to-r from-rose-400 via-red-400 to-orange-300 text-red-950'
                      : 'bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 text-foreground'
                  }`}
                >
                  Yes, Absolutely
                </button>
              </div>

              <button
                ref={noButtonRef}
                type="button"
                onMouseEnter={jumpNoButton}
                onClick={jumpNoButton}
                className={`absolute rounded-full px-6 py-2 text-sm font-bold shadow-md transition ${
                  isSecondProposal ? 'bg-white text-rose-900' : 'bg-rose-100 text-rose-800'
                }`}
                style={{
                  left: `${noButtonPosition.x}%`,
                  top: `${noButtonPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {getNoButtonLabel(angerLevel)}
              </button>

              <AnimatePresence>
                {angerLevel > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-2xl border border-rose-300/70 bg-rose-100/80 px-3 py-2 text-rose-900"
                  >
                    <span className="text-2xl">😾</span>
                    <p className="text-xs font-bold uppercase tracking-[0.16em]">
                      Grumpy Cat Level {angerLevel}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {currentPunishment && (
                  <motion.div
                    key={`punishment-${currentPunishment.level}-${stage}`}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    className={`mt-8 rounded-2xl border px-4 py-4 shadow-inner ${
                      isSecondProposal
                        ? 'border-rose-300/50 bg-rose-950/40 text-rose-100'
                        : 'border-rose-200 bg-rose-50 text-rose-900'
                    }`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                      Grumpy Cat Punishment Unlocked
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                      {punishmentSetLabel}
                    </p>
                    <p className="mt-2 text-base font-bold sm:text-lg">
                      {currentPunishment.emoji} {currentPunishment.title}
                    </p>
                    <p className="mt-1 text-sm font-medium opacity-90">{currentPunishment.punishment}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {unlockedPunishments.map((punishment) => (
                        <span
                          key={`chip-${punishment.level}`}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            isSecondProposal ? 'bg-rose-200/20 text-rose-100' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {punishment.emoji} L{punishment.level}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'fakeout' && (
            <motion.div
              key="fakeout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full rounded-3xl border border-white/80 bg-white/85 p-10 text-center shadow-2xl backdrop-blur-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Special Access Granted</p>
              <h2 className="mt-3 font-heading text-5xl text-foreground sm:text-6xl">{stageTitles.fakeout}</h2>
              <p className="mt-4 text-sm font-medium text-foreground/75">Initializing chaos sequence...</p>
            </motion.div>
          )}

          {stage === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              className="w-full rounded-3xl border border-white/75 bg-white/85 p-7 shadow-2xl backdrop-blur-sm sm:p-10"
            >
              <div className="grid items-center gap-6 sm:grid-cols-[240px_1fr]">
                <img
                  src="https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif"
                  alt="Flirty smiling cat gif"
                  className="h-60 w-full rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Fake-Out Complete</p>
                  <h2 className="mt-2 font-heading text-4xl text-foreground sm:text-5xl">
                    I know it&apos;s tooooo soon, just testing you! You&apos;ve already become my wife meow. ❤️
                  </h2>
                  <p className="mt-4 text-sm font-semibold text-foreground/75">
                    Jumping to the main website and quiz now...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
