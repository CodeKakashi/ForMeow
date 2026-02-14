import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import protocolPdf from '../assets/Protocol.pdf';

const stageTitles = {
  proposal1: 'Will you forever be my favorite place to land?',
  fakeout: "Welcome to the special website... let's start then.",
  proposal2: 'Will you marry me?',
};
const PUNISHMENT_WHATSAPP_NUMBER = '+44 7887153839';

const PROPOSAL1_PUNISHMENT_TIERS = [
  {
    level: 1,
    emoji: '🖤',
    title: 'The "Lingerie" Surprise',
    punishment: 'Out/At Home: Wear something hidden under "normal" clothes during a mundane task. Pro-Tip: Show them a "glimpse" while in a public (but safe) place.',
  },
  {
    level: 2,
    emoji: '🤫',
    title: 'The Silent Seduction',
    punishment: 'At Home: Communicate only through touch and breath for 30 minutes. Pro-Tip: No words allowed, even when things get... loud.',
  },
  {
    level: 3,
    emoji: '🚪',
    title: 'The Threshold Welcome',
    punishment: 'At Home: Meet your partner at the door with a drink and a kiss that lasts at least 2 minutes. Pro-Tip: Don’t even let them take their coat off first.',
  },
  {
    level: 4,
    emoji: '👑',
    title: 'The Grand Finale',
    punishment: 'At Home: Combine three of the previous levels into one "Mega-Date." Pro-Tip: Clear your schedule for the entire next morning.',
  },
  {
    level: 5,
    emoji: '🎤',
    title: 'Meow Voice Note Duty',
    punishment: 'Send one dramatic "I miss you" voice note in cat language.',
  },
  {
    level: 6,
    emoji: '🕺',
    title: 'Zoomie Dance Order',
    punishment: 'Mandatory 10-second goofy dance in the living room.',
  },
  {
    level: 7,
    emoji: '🍫',
    title: 'Snack Bribe Protocol',
    punishment: 'Offer one chocolate or snack tribute to calm the cat.',
  },
  {
    level: 8,
    emoji: '🧸',
    title: 'Cuddle Summon',
    punishment: 'Instant cuddle within 5 minutes. No appeals allowed.',
  },
  {
    level: 9,
    emoji: '🤳',
    title: 'Selfie Penalty',
    punishment: 'Send one shamelessly cute selfie with a kissy face.',
  },
  {
    level: 10,
    emoji: '🎵',
    title: 'Playlist Duty',
    punishment: 'Build a 3-song mini playlist titled "My Favorite Human".',
  },
  {
    level: 11,
    emoji: '🐾',
    title: 'Paw Promise Oath',
    punishment: 'Say "I choose you, always" in your cutest cat voice.',
  },
  {
    level: 12,
    emoji: '🛀',
    title: 'The Submerged Sanctuary',
    punishment: 'At Home: A shared, candlelit bath with zero electronics allowed. Pro-Tip: Use a waterproof speaker for low, bass-heavy lo-fi beats.',
  },
  {
    level: 13,
    emoji: '❄️',
    title: 'Thermal Mapping',
    punishment: 'At Home: Use ice cubes followed immediately by warm breath on sensitive areas. Pro-Tip: Focus on the neck, inner thighs, and lower back.',
  },
  {
    level: 14,
    emoji: '🔥',
    title: 'The Absolute Power Hour',
    punishment: 'At Home: One partner makes every single decision for 60 minutes. Pro-Tip: "Yes" is the only legal response.',
  },
  {
    level: 15,
    emoji: '🍓',
    title: 'The Blind Banquet',
    punishment: 'At Home: Blindfold your partner and feed them various textures (honey, fruit, chocolate). Pro-Tip: Use your fingers, not utensils.',
  },
  {
    level: 16,
    emoji: '👔',
    title: 'The Silk Tie Restraint',
    punishment: 'At Home: Use a soft silk tie to gently secure your partner’s hands. Pro-Tip: Only use it to heighten the "look but don’t touch" rule.',
  },
  {
    level: 17,
    emoji: '🧴',
    title: 'Full Body Canvas',
    punishment: 'At Home: Use body-safe paint or chocolate sauce to "draw" on each other. Pro-Tip: The "cleanup" in the shower is the best part.',
  },
  {
    level: 18,
    emoji: '👁️',
    title: 'The 5-Minute Eye Lock',
    punishment: 'At Home: Sit naked/semi-naked and stare into each other’s eyes without touching. Pro-Tip: The first one to break the gaze loses "control" for the night.',
  },
  {
    level: 19,
    emoji: '📜',
    title: 'The Fantasy Script',
    punishment: 'At Home: Write down one specific scenario you’ve never tried and swap papers. Pro-Tip: Read them aloud while maintaining physical contact.',
  },
  {
    level: 20,
    emoji: '🧴',
    title: 'Aesthetic Oil Ritual',
    punishment: 'At Home: Perform a slow, methodical massage using warmed oils. Pro-Tip: Take 20 minutes on just the legs to build unbearable anticipation.',
  }
];

const PROPOSAL2_PUNISHMENT_TIERS = [
  {
    level: 1,
    emoji: '🍷',
    title: 'Spicy "Truth or Drink"',
    punishment: 'At Home: Ask the "forbidden" questions about fantasies or past "best-ofs." Pro-Tip: If they drink to skip, they owe a physical forfeit.',
  },
  {
    level: 2,
    emoji: '🕯️',
    title: 'The Candlelight Hand-Off',
    punishment: 'At Home: Lead them through a dark house by a single flame. Pro-Tip: End the tour by blowing out the candle in the bedroom.',
  },
  {
    level: 3,
    emoji: '👠',
    title: 'The "Vibe Check" Night Out',
    punishment: 'Out: Wear your most provocative attire to a high-end lounge. Pro-Tip: Spend the night whispering what you’ll do the moment you turn the door key.',
  },
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
  {
    level: 9,
    emoji: '👁️',
    title: 'The Unspoken Command',
    punishment: 'At Home: Spend 10 minutes communicating only through eye contact and breath. Pro-Tip: The first person to break eye contact must perform a 5-minute massage on the other.',
  },
  {
    level: 10,
    emoji: '🏙️',
    title: 'The Hidden Exhibition',
    punishment: 'Out: Go to a crowded lounge. One partner wears something "daring" underneath their clothes and must secretly show a glimpse to the other. Pro-Tip: Do it while a waiter is nearby for maximum thrill.',
  },
  {
    level: 11,
    emoji: '🧣',
    title: 'The Silk Blindfold Map',
    punishment: 'At Home: Blindfold your partner and trace a "map" on their body using only your lips. Pro-Tip: They have to guess the "destination" (the specific spot) to earn a kiss.',
  },
  {
    level: 12,
    emoji: '🧴',
    title: 'The Artist & The Canvas',
    punishment: 'At Home: Use edible body paint or chocolate to write a "to-do list" on your partner’s skin. Pro-Tip: You have to "erase" each item using only your tongue.',
  },
  {
    level: 13,
    emoji: '🥂',
    title: 'The "Last Chance" Bar',
    punishment: 'Out: Meet at a bar as strangers. Buy each other a drink and flirt as if you’ve never met. Pro-Tip: The "winner" of the flirt-off gets to choose the music for the drive home.',
  },
  {
    level: 14,
    emoji: '🌡️',
    title: 'Thermal Tease',
    punishment: 'At Home: Alternate between an ice cube and a warm, damp cloth on sensitive areas like the neck and inner thighs. Pro-Tip: Keep the blindfold from Level 11 on for heightened sensation.',
  },
  {
    level: 15,
    emoji: '🛀',
    title: 'The Submerged Sanctuary',
    punishment: 'At Home: A shared bath with zero electronics allowed. Pro-Tip: Wash each other’s bodies with extreme, agonizing slowness.',
  },
  {
    level: 16,
    emoji: '🍷',
    title: 'Spicy Truth or Forfeit',
    punishment: 'At Home: Ask the deepest, most "shameful" fantasies. If they refuse to answer, they must remove one item of clothing. Pro-Tip: The last person with clothes on wins a "free pass" for a week.',
  },
  {
    level: 17,
    emoji: '🕯️',
    title: 'Shadow Play',
    punishment: 'At Home: Turn off all the lights and use one candle to cast shadows while you dance or move together. Pro-Tip: Focus on how your silhouettes look on the wall.',
  },
  {
    level: 18,
    emoji: '⏳',
    title: 'The 15-Minute No-Touch Rule',
    punishment: 'At Home: Lay face-to-face, as close as possible without skin touching. Pro-Tip: Whisper exactly what you want to do once the timer goes off.',
  },
  {
    level: 19,
    emoji: '👂',
    title: 'The Audio Tease',
    punishment: 'At Home: Record a 30-second whisper of your dirtiest secret and send it to them while they are in the other room. Pro-Tip: They aren\'t allowed to come find you until you "summon" them.',
  },
  {
    level: 20,
    emoji: '🔥',
    title: 'The Absolute Submission',
    punishment: 'At Home: Hand over your phone or a "remote" (if you have one) and let them dictate every move for the rest of the night. Pro-Tip: Total trust is the ultimate aphrodisiac.',
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
  if (level >= 20) {
    return 'You don\'t love me anymore 😭';
  }
  if (level >= 17) {
    return 'I know this is not my Meowiski 😢';
  }
  if (level >= 14) {
    return 'You don\'t want to go higher than 14, do you? 😒';
  }
  if (level >= 11) {
    return 'You really want to hit 11+? 🥺';
  }
  if (level >= 9) {
    return 'Hiss 9+? 😠';
  }
  if (level >= 7) {
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
  const isSecondStage = stage === 'proposal2' || stage === 'confirmSure' || stage === 'confirmTerms';

  if (isSecondStage) {
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
  const [hasOpenedTerms, setHasOpenedTerms] = useState(false);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);

  const interactiveStage = stage === 'proposal1' || stage === 'proposal2';
  const isSecondProposalStage = stage === 'proposal2' || stage === 'confirmSure' || stage === 'confirmTerms';
  const isSecondProposal = stage === 'proposal2';
  const activePunishmentTiers = useMemo(
    () => (isSecondProposalStage ? PROPOSAL2_PUNISHMENT_TIERS : PROPOSAL1_PUNISHMENT_TIERS),
    [isSecondProposalStage],
  );
  const punishmentSetLabel = isSecondProposalStage ? 'Proposal #2 Set' : 'Proposal #1 Set';
  const currentPunishment = useMemo(
    () => getPunishmentForLevel(angerLevel, activePunishmentTiers),
    [angerLevel, activePunishmentTiers],
  );
  const unlockedPunishments = useMemo(
    () => activePunishmentTiers.filter((punishment) => angerLevel >= punishment.level),
    [angerLevel, activePunishmentTiers],
  );
  const unlockedPunishmentsDescending = useMemo(
    () => [...unlockedPunishments].sort((a, b) => b.level - a.level),
    [unlockedPunishments],
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
    setAngerLevel((previous) => previous + 1);
  }, []);

  useEffect(() => {
    setAngerLevel(0);
    setNoButtonPosition({ x: 72, y: 70 });
    setHasOpenedTerms(false);
    setHasAgreedTerms(false);
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

  const handleGoHome = () => {
    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current);
    }
    navigate('/home');
  };

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
      setStage('confirmSure');
      return;
    }

    if (stage === 'confirmSure') {
      setStage('confirmTerms');
      return;
    }

    if (stage === 'confirmTerms') {
      if (!hasOpenedTerms || !hasAgreedTerms) {
        return;
      }
      if (!hasSentFinalWhatsAppRef.current) {
        hasSentFinalWhatsAppRef.current = true;
        // sendPunishmentsToWhatsApp();
      }
      setStage('reveal');
    }
  };

  const canConfirmTerms = hasOpenedTerms && hasAgreedTerms;

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
      `Stage: ${isSecondProposalStage ? 'Will you marry me?' : 'Will you forever be my favorite place to land?'}`,
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
  }, [angerLevel, currentPunishment, isSecondProposalStage, punishmentSetLabel, unlockedPunishments]);

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
                A sanctuary crafted just for you, because of all the paths I could have followed, I’m so grateful I found my home in your heart
              </p>
              <h1 className="mt-4 text-center font-heading text-5xl leading-tight sm:text-7xl">{stageTitles[stage]}</h1>
              <p className={`mt-3 text-center text-sm sm:text-base ${isSecondProposal ? 'text-rose-100/85' : 'text-foreground/75'}`}>
                {isSecondProposal
                  ? 'The weight of the world waits on your paw—choose your path, my Queen.'
                  : 'A soft touch from you, a world of warmth for me..'}
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

              {angerLevel <= 20 && (
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
              )}

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
                    {/*<p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                      {punishmentSetLabel}
                     </p> */}
                    <p className="mt-2 text-base font-bold sm:text-lg">
                      {currentPunishment.emoji} {currentPunishment.title}
                    </p>
                    <p className="mt-1 text-sm font-medium opacity-90">{currentPunishment.punishment}</p>

                    <div className="mt-4 space-y-3">
                      {unlockedPunishmentsDescending.map((punishment, index) => (
                        <div
                          key={`punishment-row-${punishment.level}`}
                          className={`rounded-2xl border px-3 py-2 ${
                            isSecondProposal
                              ? 'border-rose-200/20 bg-rose-200/10 text-rose-100'
                              : 'border-rose-100 bg-white/70 text-rose-900'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                            <span>
                              {punishment.emoji} L{punishment.level} — {punishment.title}
                            </span>
                            {index === 0 && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                                  isSecondProposal ? 'bg-rose-200/30 text-rose-100' : 'bg-rose-200/70 text-rose-900'
                                }`}
                              >
                                Latest
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs font-medium opacity-90">{punishment.punishment}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'confirmSure' && (
            <motion.div
              key="confirmSure"
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -18 }}
              className={`relative w-full rounded-3xl border p-7 shadow-2xl backdrop-blur-sm sm:p-10 ${
                isSecondProposalStage
                  ? 'border-red-200/40 bg-black/35 text-rose-50'
                  : 'border-white/75 bg-white/80 text-foreground'
              }`}
            >
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-rose-200/80">
                Final Purr-Check
              </p>
              <h2 className="mt-4 text-center font-heading text-5xl leading-tight sm:text-7xl">
                Is your heart settled on me, or do I need to keep winning you over?
              </h2>
              <p className="mt-3 text-center text-sm sm:text-base text-rose-100/85">
                This is your last soft pause before forever.
              </p>

              <div className="mt-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleYesClick}
                  className="rounded-full bg-gradient-to-r from-rose-400 via-red-400 to-orange-300 px-8 py-3 text-lg font-bold text-red-950 shadow-lg transition hover:opacity-95"
                >
                  Yes, 100%
                </button>
              </div>
            </motion.div>
          )}

          {stage === 'confirmTerms' && (
            <motion.div
              key="confirmTerms"
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -18 }}
              className={`relative w-full rounded-3xl border p-7 shadow-2xl backdrop-blur-sm sm:p-10 ${
                isSecondProposalStage
                  ? 'border-red-200/40 bg-black/35 text-rose-50'
                  : 'border-white/75 bg-white/80 text-foreground'
              }`}
            >
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-rose-200/80">
                Before Signing Up
              </p>
              <h2 className="mt-4 text-center font-heading text-4xl leading-tight sm:text-6xl">
                Read the terms and conditions before signing up.
              </h2>
              <p className="mt-3 text-center text-sm sm:text-base text-rose-100/85">
                Open the PDF below, then confirm you agree.
              </p>

              <div className="mt-6 flex items-center justify-center">
                <a
                  href={protocolPdf}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setHasOpenedTerms(true)}
                  className="rounded-full border border-rose-200/60 bg-rose-100/10 px-6 py-2 text-sm font-bold text-rose-100 shadow-md transition hover:bg-rose-100/20"
                >
                  Open Terms (PDF)
                </a>
              </div>

              <label className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-rose-100/90">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-rose-200/60 text-rose-500 focus:ring-rose-300/60"
                  checked={hasAgreedTerms}
                  onChange={(event) => setHasAgreedTerms(event.target.checked)}
                />
                Yes, I agree Terms and Condition
              </label>

              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleYesClick}
                  disabled={!canConfirmTerms}
                  className={`rounded-full px-8 py-3 text-lg font-bold shadow-lg transition ${
                    canConfirmTerms
                      ? 'bg-gradient-to-r from-rose-400 via-red-400 to-orange-300 text-red-950 hover:opacity-95'
                      : 'cursor-not-allowed bg-rose-200/30 text-rose-100/70'
                  }`}
                >
                  Yes, I Agree
                </button>
              </div>
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
                   I know it’s barely a heartbeat in time, but my heart has already claimed its forever home—you are my wife and my world, meow and always ❤️
                  </h2>
                  <p className="mt-4 text-sm font-semibold text-foreground/75">
                    Jumping to the main website...
                  </p>
                  <div className="mt-6 flex">
                    <button
                      type="button"
                      onClick={handleGoHome}
                      className="rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-6 py-2 text-sm font-bold text-foreground shadow-lg transition hover:opacity-95"
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
