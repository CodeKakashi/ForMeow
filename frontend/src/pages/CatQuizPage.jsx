import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  PawPrint,
  ShieldAlert,
  Sparkles,
  Timer,
  Volume2,
  VolumeX,
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { id: 'Angry', emoji: '😾', blurb: 'Stormy whisker mode' },
  { id: 'Moody', emoji: '🌧️', blurb: 'Low-energy loaf mode' },
  { id: 'Romantic', emoji: '💘', blurb: 'Soft purr cuddles' },
  { id: 'Sexy', emoji: '🔥', blurb: 'After-dark cat charm' },
  { id: 'Naughty', emoji: '😼', blurb: 'Teasing paw trouble' },
  { id: 'Funny', emoji: '😹', blurb: 'Chaotic zoomies' },
];

const SENSITIVE_CATEGORIES = new Set(['Sexy', 'Naughty']);
const RAPID_ROUND_SECONDS = 5;
const MEOW_SIC_TRACK = '/audio/meow-lofi.mp3';
const COUPON_SIGNATURE = process.env.REACT_APP_COUPON_SIGN || 'Signed with purrs, Your Human';
const COUPON_SEAL_TEXT = 'Official Purr Seal';

// Update these to match your exact personality and private jokes.
const QUESTION_POOL = [
  {
    id: 'angry-1',
    category: 'Angry',
    prompt: 'When this human gets hissy after a long day, what calms him first?',
    options: ['A quiet hug in silence', 'A spicy debate', 'A cold shower', 'Video-game rage mode'],
    answerIndex: 0,
  },
  {
    id: 'angry-2',
    category: 'Angry',
    prompt: 'In argument mode, his first instinct is usually to...',
    options: ['Pause and breathe', 'Win at all costs', 'Go silent forever', 'Spam memes'],
    answerIndex: 0,
  },
  {
    id: 'angry-3',
    category: 'Angry',
    prompt: 'What phrase melts his temper quickest?',
    options: ['"Talk to me, babe. I am here."', '"You are wrong."', '"Calm down."', '"Whatever."'],
    answerIndex: 0,
  },
  {
    id: 'angry-4',
    category: 'Angry',
    prompt: 'If plans flop, his inner cat most likely...',
    options: ['Paces for a minute then resets', 'Deletes all plans forever', 'Pretends he is fine', 'Sleeps instantly'],
    answerIndex: 0,
  },
  {
    id: 'angry-5',
    category: 'Angry',
    prompt: 'His favorite post-fight repair ritual is...',
    options: ['A real apology + cuddle', 'Buying random gifts', 'Ignoring it overnight', 'One-word texts'],
    answerIndex: 0,
  },
  {
    id: 'moody-1',
    category: 'Moody',
    prompt: 'On cloudy days, what mood-snack helps him most?',
    options: ['Warm chai and a blanket', 'Energy drink and chaos', 'Nothing at all', 'Silent scrolling'],
    answerIndex: 0,
  },
  {
    id: 'moody-2',
    category: 'Moody',
    prompt: 'When he says "I am okay," what is usually true?',
    options: ['He needs gentle space and love', 'He wants a lecture', 'He forgot your name', 'He is actually excited'],
    answerIndex: 0,
  },
  {
    id: 'moody-3',
    category: 'Moody',
    prompt: 'His moody-cat recharge activity is...',
    options: ['Music + dim lights', 'Loud crowds', 'Hot takes on social media', 'Cardio at midnight'],
    answerIndex: 0,
  },
  {
    id: 'moody-4',
    category: 'Moody',
    prompt: 'When his social battery hits 1%, he turns into...',
    options: ['A burrito in a hoodie', 'A party host', 'A travel vlogger', 'A debate club leader'],
    answerIndex: 0,
  },
  {
    id: 'moody-5',
    category: 'Moody',
    prompt: 'Best way to text him in moody mode?',
    options: ['Soft check-in + heart', '20 rapid-fire questions', 'Passive aggressive memes', 'All caps'],
    answerIndex: 0,
  },
  {
    id: 'romantic-1',
    category: 'Romantic',
    prompt: 'His dream date vibe is closest to...',
    options: ['Cozy dinner + long walk', 'Crowded club night', 'Theme park sprint', 'Office lunch break'],
    answerIndex: 0,
  },
  {
    id: 'romantic-2',
    category: 'Romantic',
    prompt: 'Which tiny gesture makes his heart purr instantly?',
    options: ['Forehead kiss', 'Formal handshake', 'Thumbs up emoji', 'Calendar invite'],
    answerIndex: 0,
  },
  {
    id: 'romantic-3',
    category: 'Romantic',
    prompt: 'His favorite love language combo is...',
    options: ['Quality time + touch', 'Only expensive gifts', 'Long voice notes to strangers', 'Winning arguments'],
    answerIndex: 0,
  },
  {
    id: 'romantic-4',
    category: 'Romantic',
    prompt: 'If he writes a love note, it will probably feel...',
    options: ['Poetic and cheesy-cute', 'Corporate and formal', 'One-word minimal', 'Mostly weather updates'],
    answerIndex: 0,
  },
  {
    id: 'romantic-5',
    category: 'Romantic',
    prompt: 'His ideal couple photo mood?',
    options: ['Candid cuddly chaos', 'Passport-style serious', 'No photos ever', 'Only food photos'],
    answerIndex: 0,
  },
  {
    id: 'sexy-1',
    category: 'Sexy',
    prompt: 'His flirty starter move is usually...',
    options: ['Eye contact + sly smile', 'Reciting tax law', 'Talking about weather maps', 'Silence for 2 hours'],
    answerIndex: 0,
  },
  {
    id: 'sexy-2',
    category: 'Sexy',
    prompt: 'What atmosphere makes him feel most magnetic?',
    options: ['Low lights and slow music', 'Harsh office lighting', 'Traffic noise', 'Morning alarms'],
    answerIndex: 0,
  },
  {
    id: 'sexy-3',
    category: 'Sexy',
    prompt: 'His favorite flirty compliment sounds like...',
    options: ['"You are dangerously cute."', '"Your spreadsheet is neat."', '"Okay."', '"Noted."'],
    answerIndex: 0,
  },
  {
    id: 'sexy-4',
    category: 'Sexy',
    prompt: 'His confident "come here" signal is...',
    options: ['That eyebrow raise', 'A yawn', 'Checking battery percent', 'Opening emails'],
    answerIndex: 0,
  },
  {
    id: 'sexy-5',
    category: 'Sexy',
    prompt: 'For him, chemistry is mostly about...',
    options: ['Playfulness + trust', 'Only looks', 'Never talking', 'Competing constantly'],
    answerIndex: 0,
  },
  {
    id: 'naughty-1',
    category: 'Naughty',
    prompt: 'His favorite harmless troublemaker move is...',
    options: ['Stealing one extra kiss', 'Hiding your phone forever', 'Cancelling plans secretly', 'Eating your snacks daily'],
    answerIndex: 0,
  },
  {
    id: 'naughty-2',
    category: 'Naughty',
    prompt: 'When he says "behave," he usually means...',
    options: ['Absolutely do not behave', 'Sleep immediately', 'File paperwork', 'Stop laughing'],
    answerIndex: 0,
  },
  {
    id: 'naughty-3',
    category: 'Naughty',
    prompt: 'His playful revenge for teasing is often...',
    options: ['More teasing + tickles', 'Total silence', 'Blocking you', 'Long lecture mode'],
    answerIndex: 0,
  },
  {
    id: 'naughty-4',
    category: 'Naughty',
    prompt: 'Pick the most "him" mischievous text:',
    options: ['"Come here. No questions."', '"Please see attachment."', '"Call HR."', '"Meeting at 9."'],
    answerIndex: 0,
  },
  {
    id: 'naughty-5',
    category: 'Naughty',
    prompt: 'His cat-burglar trait in romance is...',
    options: ['Unexpected neck kisses', 'Stealing blankets only', 'Canceling cuddles', 'Ignoring eye contact'],
    answerIndex: 0,
  },
  {
    id: 'funny-1',
    category: 'Funny',
    prompt: 'His chaotic comedy signature is...',
    options: ['Random sound effects', 'Only dead silence', 'No jokes allowed', 'Formal speeches'],
    answerIndex: 0,
  },
  {
    id: 'funny-2',
    category: 'Funny',
    prompt: 'At home, his unexpected zoomie moment is...',
    options: ['Dancing for no reason', 'Sorting receipts', 'Studying manuals', 'Watching paint dry'],
    answerIndex: 0,
  },
  {
    id: 'funny-3',
    category: 'Funny',
    prompt: 'His best "I miss you" meme energy is...',
    options: ['Dramatic cat reaction GIF', 'A blank message', 'A weather app screenshot', 'A formal invoice'],
    answerIndex: 0,
  },
  {
    id: 'funny-4',
    category: 'Funny',
    prompt: 'Which pet name would make him laugh most?',
    options: ['Sir Purrsalot', 'Mr. Spreadsheet', 'Captain Quiet', 'Doctor Deadline'],
    answerIndex: 0,
  },
  {
    id: 'funny-5',
    category: 'Funny',
    prompt: 'His humor level during sleepy mode is...',
    options: ['10/10 goofy', '0/10 robotic', 'Angry philosopher', 'History lecturer'],
    answerIndex: 0,
  },
];

const REWARD_TIERS = [
  {
    minPercent: 90,
    title: 'Favorite Baby',
    badge: '👑🐱',
    message: 'You know every whisker, every mood, every secret purr.',
    coupons: [
      // STEAMY
      "Good for one 'Blindfold & Explore' session: You relax, I take full control for 30 minutes.",
      "Valid for one 'Ice or Heat' sensory play night—dealer's choice on the temperature.",

      // PLAYFUL
      "Good for one 'Strip Trivia' match: Every wrong answer costs a piece of clothing.",
      "Valid for one 'Kitchen Counter Quickie'—anytime, regardless of what you want me to cook.",

      // HIGH INTIMACY
      "Good for one 'Sensual Massage' session: 45 minutes of full body attention.",
      "Valid for one One bath together night: You run the water, I bring the bubbles, and we stay in until we prune.",

      // ROMANTIC
      "Good for one 'Slow Dance in the Dark': Just us, one song, and zero space between our bodies.",
      "Valid for one 'Sunrise Spoons' Morning suprise Fuck"
    ]
  },
  {
    minPercent: 70,
    title: 'Whisker Wizard',
    badge: '✨🐾',
    message: 'Your feline intuition is strong and dangerously adorable.',
    coupons: [
      "Good for one 'Hands-On' morning: Breakfast-in-bed served with a side of wandering hands.",
      "Valid for one 'Slow Burn' night: A custom playlist, low lights, and a dance that leads nowhere but the bedroom.",
      "Redeem one 'You Were Right' pass: Admit you won the argument, but I get to choose your 'punishment'.",
      "Good for one 'Skin-on-Skin' midnight session: No clothes, no phones, just total sensory focus."
    ],
  },
  {
    minPercent: 40,
    title: 'Curious House Cat',
    badge: '😺',
    message: 'Solid instincts. A few whiskers still need investigation.',
    coupons: [
      "Valid for one 'Wrestling Match': Whoever pins the other down for 10 seconds gets to make one 'naughty' demand.",
      "Good for one 'Hands-On' Movie Night: Every time a character kisses on screen, we have to lose an item of clothing."
    ]
  },
  {
    minPercent: 0,
    title: 'Kitten In Training',
    badge: '🐣🐾',
    message: 'You are here for catnip and chaos, and that is still cute.',
    coupons: [
      'Good for one "no judgment" re-quiz rematch',
      "I will say what to do now, but you have to follow it immediately: could be a kiss, a cuddle, or a tickle attack.",
    ],
  },
];

const shuffleArray = (items) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const shuffleQuestionOptions = (question) => {
  const optionsWithMarker = question.options.map((option, index) => ({
    option,
    isCorrect: index === question.answerIndex,
  }));
  const randomizedOptions = shuffleArray(optionsWithMarker);

  return {
    ...question,
    options: randomizedOptions.map((item) => item.option),
    answerIndex: randomizedOptions.findIndex((item) => item.isCorrect),
  };
};

const getRewardTier = (percent) => {
  return REWARD_TIERS.find((tier) => percent >= tier.minPercent) || REWARD_TIERS[REWARD_TIERS.length - 1];
};

const clampQuestionCount = (value) => {
  const next = Number(value);
  if (!Number.isFinite(next)) {
    return 10;
  }
  return Math.min(30, Math.max(5, Math.round(next)));
};

const catFeedback = {
  correct: {
    gif: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
    title: 'Purr-fect Hit!',
    subtitle: 'Heart-eyes cat approves this answer.',
  },
  wrong: {
    gif: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
    title: 'Judgy Cat Stare...',
    subtitle: 'The whiskers disagree. Try the next one.',
  },
  timeout: {
    gif: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    title: 'Zoomie Timer KO!',
    subtitle: 'Rapid Round clawed the clock first.',
  },
};

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  const maxRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + maxRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, maxRadius);
  ctx.arcTo(x + width, y + height, x, y + height, maxRadius);
  ctx.arcTo(x, y + height, x, y, maxRadius);
  ctx.arcTo(x, y, x + width, y, maxRadius);
  ctx.closePath();
};

const wrapCanvasText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }
    currentLine = testLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

export const CatQuizPage = () => {
  const audioRef = useRef(null);
  const [phase, setPhase] = useState('setup');
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState(() =>
    CATEGORY_OPTIONS.map((category) => category.id),
  );
  const [mode, setMode] = useState('normal');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [sensitiveUnlocked, setSensitiveUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RAPID_ROUND_SECONDS);
  const [musicOn, setMusicOn] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [couponIndex, setCouponIndex] = useState(0);
  const [couponDirection, setCouponDirection] = useState(1);

  const isRapidMode = mode === 'rapid';
  const pointsPerCorrect = isRapidMode ? 2 : 1;
  const currentQuestion = quizQuestions[currentIndex];

  const shouldGateSensitiveContent =
    phase === 'question' &&
    Boolean(currentQuestion) &&
    SENSITIVE_CATEGORIES.has(currentQuestion.category) &&
    !sensitiveUnlocked;

  const answeredCount = useMemo(() => {
    if (phase === 'setup') {
      return 0;
    }
    if (phase === 'feedback') {
      return currentIndex + 1;
    }
    if (phase === 'result') {
      return quizQuestions.length;
    }
    return currentIndex;
  }, [phase, currentIndex, quizQuestions.length]);

  const maxScore = quizQuestions.length * pointsPerCorrect;
  const scorePercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const rewardTier = getRewardTier(scorePercent);
  const progressPercent = quizQuestions.length > 0 ? (answeredCount / quizQuestions.length) * 100 : 0;
  const coupons = rewardTier.coupons;
  const currentCoupon = coupons[couponIndex] || '';

  const handleAnswer = useCallback(
    (selectedIndex, timedOut = false) => {
      if (!currentQuestion) {
        return;
      }

      const isCorrect = selectedIndex === currentQuestion.answerIndex;
      if (isCorrect) {
        setScore((prevScore) => prevScore + pointsPerCorrect);
      }

      setFeedback({
        timedOut,
        isCorrect,
        selectedIndex,
        correctIndex: currentQuestion.answerIndex,
      });
      setPhase('feedback');
    },
    [currentQuestion, pointsPerCorrect],
  );

  useEffect(() => {
    const audioElement = audioRef.current;

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'question' && isRapidMode && !shouldGateSensitiveContent && currentQuestion) {
      setTimeLeft(RAPID_ROUND_SECONDS);
    }
  }, [phase, isRapidMode, shouldGateSensitiveContent, currentQuestion]);

  useEffect(() => {
    if (phase === 'result') {
      setCouponIndex(0);
      setCouponDirection(1);
    }
  }, [phase, rewardTier]);

  useEffect(() => {
    if (!(phase === 'question' && isRapidMode && !shouldGateSensitiveContent && currentQuestion)) {
      return;
    }

    if (timeLeft <= 0) {
      handleAnswer(null, true);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [phase, isRapidMode, shouldGateSensitiveContent, currentQuestion, timeLeft, handleAnswer]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((item) => item !== categoryId);
      }
      return [...prevCategories, categoryId];
    });
  };

  const startQuiz = () => {
    const categoriesToUse =
      selectedCategories.length > 0 ? selectedCategories : CATEGORY_OPTIONS.map((category) => category.id);

    const categoryFilteredQuestions = QUESTION_POOL.filter((question) =>
      categoriesToUse.includes(question.category),
    );
    const randomQuestions = shuffleArray(categoryFilteredQuestions);
    const totalQuestions = Math.min(clampQuestionCount(questionCount), randomQuestions.length);
    const selectedQuestions = randomQuestions.slice(0, totalQuestions).map(shuffleQuestionOptions);

    setQuizQuestions(selectedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setSensitiveUnlocked(false);
    setTimeLeft(RAPID_ROUND_SECONDS);
    setCouponIndex(0);
    setCouponDirection(1);
    setPhase('question');
  };

  const continueQuiz = () => {
    if (currentIndex >= quizQuestions.length - 1) {
      setPhase('result');
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSensitiveUnlocked(false);
    setFeedback(null);
    setPhase('question');
  };

  const resetQuiz = () => {
    setPhase('setup');
    setQuizQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setSensitiveUnlocked(false);
    setTimeLeft(RAPID_ROUND_SECONDS);
    setCouponIndex(0);
    setCouponDirection(1);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) {
      return;
    }

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
      return;
    }

    try {
      await audioRef.current.play();
      setMusicOn(true);
      setAudioError(false);
    } catch (error) {
      setMusicOn(false);
      setAudioError(true);
    }
  };

  const feedbackType = feedback?.timedOut ? 'timeout' : feedback?.isCorrect ? 'correct' : 'wrong';
  const feedbackCard = feedbackType ? catFeedback[feedbackType] : null;
  const canGoPrevCoupon = couponIndex > 0;
  const canGoNextCoupon = couponIndex < coupons.length - 1;

  const moveCoupon = (direction) => {
    if (direction > 0 && canGoNextCoupon) {
      setCouponDirection(1);
      setCouponIndex((prevIndex) => prevIndex + 1);
      return;
    }

    if (direction < 0 && canGoPrevCoupon) {
      setCouponDirection(-1);
      setCouponIndex((prevIndex) => prevIndex - 1);
    }
  };

  const downloadCouponImage = () => {
    if (!currentCoupon) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, '#ffe3ef');
    bgGradient.addColorStop(0.5, '#ffd8e7');
    bgGradient.addColorStop(1, '#ffecd2');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 24; i += 1) {
      const x = 60 + (i % 6) * 220;
      const y = 80 + Math.floor(i / 6) * 180;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '32px "Quicksand", sans-serif';
      ctx.fillText(i % 2 === 0 ? '🐾' : '💗', x, y);
    }

    drawRoundedRect(ctx, 110, 100, 1180, 700, 42);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fill();
    ctx.strokeStyle = '#f9a8d4';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.save();
    ctx.setLineDash([20, 16]);
    ctx.strokeStyle = '#fda4af';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, 145, 135, 1110, 630, 34);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#9f1239';
    ctx.font = '700 40px "Quicksand", sans-serif';
    ctx.fillText('ForMeow Gift Coupon', 180, 220);

    ctx.fillStyle = '#be185d';
    ctx.font = '600 26px "Quicksand", sans-serif';
    ctx.fillText(`Reward Tier: ${rewardTier.badge} ${rewardTier.title}`, 180, 270);
    ctx.fillText(`Coupon ${couponIndex + 1} of ${coupons.length}`, 180, 310);

    ctx.fillStyle = '#881337';
    ctx.font = '700 56px "Quicksand", sans-serif';
    const wrappedCoupon = wrapCanvasText(ctx, currentCoupon, 760);
    wrappedCoupon.forEach((line, lineIndex) => {
      ctx.fillText(line, 180, 410 + lineIndex * 70);
    });

    ctx.fillStyle = '#9f1239';
    ctx.font = '600 28px "Quicksand", sans-serif';
    ctx.fillText(COUPON_SIGNATURE, 180, 700);

    const sealX = 1060;
    const sealY = 510;
    const sealRadius = 125;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(251, 113, 133, 0.23)';
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#be123c';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius - 22, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#9f1239';
    ctx.stroke();

    ctx.fillStyle = '#881337';
    ctx.font = '700 24px "Quicksand", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPECIAL SEAL', sealX, sealY - 22);
    ctx.font = '700 22px "Quicksand", sans-serif';
    ctx.fillText(COUPON_SEAL_TEXT, sealX, sealY + 6);
    ctx.font = '800 52px "Quicksand", sans-serif';
    ctx.fillText('🐾', sealX, sealY + 68);
    ctx.textAlign = 'left';

    const slug = currentCoupon
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 45);

    const link = document.createElement('a');
    link.download = `for-meow-coupon-${couponIndex + 1}-${slug || 'gift'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-orange-50">
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={MEOW_SIC_TRACK}
        onError={() => setAudioError(true)}
        onEnded={() => setMusicOn(false)}
      />

      <section className="relative overflow-hidden px-4 pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0">
          {[...Array(28)].map((_, index) => (
            <motion.span
              key={`paw-float-${index}`}
              className="absolute text-lg opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: index * 0.08 }}
            >
              {index % 3 === 0 ? '🐾' : index % 3 === 1 ? '💖' : '✨'}
            </motion.span>
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Valentine Cat Quiz</p>
              <h1 className="font-heading text-4xl text-foreground sm:text-5xl">How well do my meows know me?</h1>
            </div>

            <button
              type="button"
              onClick={toggleMusic}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-white"
            >
              {musicOn ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {musicOn ? 'Mute The Meow-sic' : 'Play The Meow-sic'}
            </button>
          </div>

          {audioError && (
            <p className="mb-4 rounded-2xl border border-amber-300/70 bg-amber-50/80 px-4 py-2 text-sm text-amber-900">
              Meow-sic file missing. Add a track at <span className="font-semibold">public/audio/meow-lofi.mp3</span>.
            </p>
          )}

          {phase !== 'setup' && (
            <div className="mb-6 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-lg backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>
                  Question {Math.min(currentIndex + (phase === 'feedback' ? 1 : 0), quizQuestions.length)} of{' '}
                  {quizQuestions.length}
                </span>
                <span>
                  Cat-Score: {score}/{maxScore}
                </span>
              </div>

              <div className="relative h-20 rounded-2xl bg-gradient-to-r from-rose-100 to-orange-100">
                <div className="absolute left-4 right-4 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/80" />
                <motion.div
                  className="absolute top-1/2 text-4xl"
                  style={{ left: `calc(${Math.min(progressPercent, 100)}% - 24px)` }}
                  animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🐈
                </motion.div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-4xl">🥣</div>
                <div className="absolute right-4 bottom-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700">
                  Treats
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {phase === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                <div className="rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-orange-100 p-5">
                  <p className="text-base font-semibold text-foreground sm:text-lg">
                    Welcome to the Ultimate Paws-on Test! Are you a true Baby who knows her favorite human&apos;s
                    every whisker, or are you just here for the catnip? Prove your feline intuition!
                  </p>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/80 bg-white/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Quiz Setup</p>
                    <label className="mt-3 block text-sm font-semibold text-foreground">
                      Number of Questions (default 10)
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      value={questionCount}
                      onChange={(event) => setQuestionCount(clampQuestionCount(event.target.value))}
                      className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-rose-200 accent-pink-500"
                    />
                    <div className="mt-2 inline-flex rounded-full bg-pink-100 px-4 py-1 text-sm font-bold text-rose-900">
                      {questionCount} questions
                    </div>

                    <p className="mt-4 text-sm font-semibold text-foreground">Choose Your Round Style</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMode('normal')}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'normal'
                          ? 'bg-gradient-to-r from-pink-300 to-rose-300 text-foreground shadow-md'
                          : 'bg-white text-foreground/80'
                          }`}
                      >
                        Classic Purr (Normal)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('rapid')}
                        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'rapid'
                          ? 'bg-gradient-to-r from-orange-300 to-rose-300 text-foreground shadow-md'
                          : 'bg-white text-foreground/80'
                          }`}
                      >
                        <Timer className="h-4 w-4" />
                        Rapid Round (2x Points)
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/80 bg-white/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Pick Categories
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {CATEGORY_OPTIONS.map((category) => {
                        const isActive = selectedCategories.includes(category.id);
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => toggleCategory(category.id)}
                            className={`rounded-2xl border px-3 py-2 text-left transition ${isActive
                              ? 'border-pink-300 bg-pink-100 shadow-sm'
                              : 'border-white/70 bg-white text-foreground/80'
                              }`}
                          >
                            <p className="text-sm font-bold">
                              {category.emoji} {category.id}
                            </p>
                            <p className="text-[11px]">{category.blurb}</p>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Tip: if you uncheck everything, the quiz auto-selects all categories.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startQuiz}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-7 py-3 text-base font-bold text-foreground shadow-lg transition hover:opacity-95"
                >
                  <Sparkles className="h-4 w-4" />
                  Unleash The Paws-on Test
                </button>
              </motion.div>
            )}

            {phase === 'question' && currentQuestion && (
              <motion.div
                key={`question-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                {isRapidMode && !shouldGateSensitiveContent && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-900">
                    <Timer className="h-4 w-4" />
                    {timeLeft}s whisker timer
                  </div>
                )}

                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">
                  <PawPrint className="h-3.5 w-3.5" />
                  {currentQuestion.category}
                </div>

                <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                  {shouldGateSensitiveContent ? 'Sensitive Question Locked' : currentQuestion.prompt}
                </h2>

                {shouldGateSensitiveContent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-2xl border border-rose-300/70 bg-rose-50/80 p-5"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-rose-700">
                      <ShieldAlert className="h-4 w-4" />
                      Sensitive Content Warning
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3 text-5xl">
                      <span>🙈</span>
                      <motion.span
                        animate={{ rotate: [-8, 8, -8] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-flex text-rose-600"
                      >
                        <PawPrint className="h-10 w-10" />
                      </motion.span>
                    </div>
                    <p className="mt-3 text-center text-sm font-medium text-rose-900">
                      Tiny paw is covering the eyes. Reveal only if you are ready for a spicy meow.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSensitiveUnlocked(true)}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-5 py-2 text-sm font-bold text-foreground shadow-md transition hover:opacity-95"
                    >
                      Paw-ceed, I Can Handle It
                    </button>
                  </motion.div>
                ) : (
                  <div className="mt-6 grid gap-3">
                    {currentQuestion.options.map((option, optionIndex) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswer(optionIndex)}
                        className="w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-left text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 sm:text-base"
                      >
                        Purr-mit Answer {String.fromCharCode(65 + optionIndex)}: {option}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {phase === 'feedback' && feedbackCard && currentQuestion && (
              <motion.div
                key={`feedback-${currentQuestion.id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                <div className="grid items-center gap-5 sm:grid-cols-[220px_1fr]">
                  <img
                    src={feedbackCard.gif}
                    alt={feedback?.isCorrect ? 'Heart-eyes cat GIF' : 'Judgy cat GIF'}
                    className="h-56 w-full rounded-2xl object-cover shadow-lg"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Answer Verdict</p>
                    <h2 className="mt-2 font-heading text-4xl text-foreground sm:text-5xl">{feedbackCard.title}</h2>
                    <p className="mt-2 text-sm text-foreground/80">{feedbackCard.subtitle}</p>
                    <p className="mt-3 rounded-2xl bg-pink-100 px-4 py-2 text-sm font-semibold text-rose-900">
                      Right whisker: {currentQuestion.options[feedback.correctIndex]}
                    </p>
                    {feedback.selectedIndex !== null && feedback.selectedIndex !== undefined && (
                      <p className="mt-2 text-sm text-foreground/80">
                        Your whisker pick: {currentQuestion.options[feedback.selectedIndex]}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={continueQuiz}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-6 py-3 text-sm font-bold text-foreground shadow-lg transition hover:opacity-95"
                >
                  <PawPrint className="h-4 w-4" />
                  {currentIndex >= quizQuestions.length - 1 ? 'Paw-sitively Final?' : 'Paw-s to Next Whisker'}
                </button>
              </motion.div>
            )}

            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Final Cat-Score</p>
                <h2 className="mt-2 font-heading text-5xl text-foreground sm:text-6xl">
                  {score}/{maxScore}
                </h2>
                <p className="mt-1 text-sm text-foreground/80">
                  {isRapidMode ? 'Rapid Round score includes 2x points.' : 'Classic Purr scoring applied.'}
                </p>

                <div className="mt-5 rounded-2xl bg-gradient-to-r from-rose-100 to-orange-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Rank Unlocked</p>
                  <p className="mt-1 text-2xl font-cute text-rose-900">
                    {rewardTier.badge} {rewardTier.title}
                  </p>
                  <p className="mt-2 text-sm text-rose-900/90">{rewardTier.message}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-rose-800">
                    Accuracy: {scorePercent}%
                  </p>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Gift Coupons Unlocked
                  </p>
                  <p className="mb-3 text-xs text-foreground/70">
                    Swipe left/right on the coupon card to browse one by one.
                  </p>

                  <div className="relative min-h-[230px] overflow-hidden rounded-2xl">
                    <AnimatePresence mode="wait" custom={couponDirection}>
                      <motion.div
                        key={`${couponIndex}-${currentCoupon}`}
                        custom={couponDirection}
                        initial={{
                          x: couponDirection > 0 ? 95 : -95,
                          opacity: 0,
                          rotate: couponDirection > 0 ? 2 : -2,
                        }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        exit={{
                          x: couponDirection > 0 ? -95 : 95,
                          opacity: 0,
                          rotate: couponDirection > 0 ? -2 : 2,
                        }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                          if (info.offset.x <= -70) {
                            moveCoupon(1);
                            return;
                          }
                          if (info.offset.x >= 70) {
                            moveCoupon(-1);
                          }
                        }}
                        className="relative rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-orange-50 px-5 py-5 text-rose-900 shadow-md"
                      >
                        <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full border-[3px] border-rose-500/70 bg-rose-200/70 p-2 text-center">
                          <p className="text-[10px] font-extrabold uppercase leading-tight tracking-[0.12em] text-rose-800">
                            Special Seal
                          </p>
                          <p className="mt-1 text-2xl">🐾</p>
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">
                          Coupon {couponIndex + 1} of {coupons.length}
                        </p>
                        <p className="mt-2 pr-24 text-base font-bold sm:text-lg">🎟️ {currentCoupon}</p>
                        <p className="mt-4 text-xs font-semibold italic text-rose-700">{COUPON_SIGNATURE}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveCoupon(-1)}
                      disabled={!canGoPrevCoupon}
                      className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground transition enabled:hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={() => moveCoupon(1)}
                      disabled={!canGoNextCoupon}
                      className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground transition enabled:hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={downloadCouponImage}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground shadow-md transition hover:opacity-95"
                    >
                      <Download className="h-4 w-4" />
                      Download This Coupon
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetQuiz}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-6 py-3 text-sm font-bold text-foreground shadow-lg transition hover:opacity-95"
                >
                  <Sparkles className="h-4 w-4" />
                  Re-Paw the Whole Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
