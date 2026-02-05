import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Sparkles } from 'lucide-react';

const SCRATCH_CARD_WIDTH = 340;
const SCRATCH_CARD_HEIGHT = 196;
const SCRATCH_DOWNLOAD_THRESHOLD = 40;
const COUPON_SEAL_TEXT = 'Official Love Seal';
const COUPON_SIGNER = 'Haarish';
const PAW_CURSOR =
  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2732%27 height=%2732%27 viewBox=%270 0 32 32%27%3E%3Ccircle cx=%2716%27 cy=%2719%27 r=%277.5%27 fill=%27%23f472b6%27/%3E%3Ccircle cx=%279%27 cy=%2711%27 r=%273.5%27 fill=%27%23fb7185%27/%3E%3Ccircle cx=%2716%27 cy=%278.5%27 r=%273.7%27 fill=%27%23fb7185%27/%3E%3Ccircle cx=%2723%27 cy=%2711%27 r=%273.5%27 fill=%27%23fb7185%27/%3E%3Ccircle cx=%2727%27 cy=%2717%27 r=%273.2%27 fill=%27%23fb7185%27/%3E%3C/svg%3E") 14 14, pointer';

const couponChallenges = [
  {
    id: 'coupon-1',
    prize: 'One 30-minute back scratch pass',
    question: 'Type the pet name: "meowiski"',
    answers: ['meowiski'],
    password: 'PAW-01',
  },
  {
    id: 'coupon-2',
    prize: 'Dinner of your choice (no debates)',
    question: 'Valentine month number?',
    answers: ['2', '02', 'feb', 'february'],
    password: 'PAW-02',
  },
  {
    id: 'coupon-3',
    prize: 'Movie night with full cuddle control',
    question: 'Complete this: "Forever ____"',
    answers: ['yours'],
    password: 'PAW-03',
  },
  {
    id: 'coupon-4',
    prize: 'Breakfast in bed + forehead kisses',
    question: 'Which animal theme is this site built around?',
    answers: ['cat', 'cats'],
    password: 'PAW-04',
  },
  {
    id: 'coupon-5',
    prize: 'No-hissing peace dinner date',
    question: 'Type this exactly: "purr"',
    answers: ['purr'],
    password: 'PAW-05',
  },
  {
    id: 'coupon-6',
    prize: 'One extra cuddle marathon ticket',
    question: 'What comes after "meow"? (hint: "meow ____")',
    answers: ['meow', 'again', 'more'],
    password: 'PAW-06',
  },
];

const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, '');

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

const drawScratchLayer = (canvas, ctx) => {
  const overlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  overlay.addColorStop(0, '#d4d4d8');
  overlay.addColorStop(0.5, '#a8a29e');
  overlay.addColorStop(1, '#78716c');

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Quicksand, sans-serif';
  ctx.fillText('Scratch With Your Paw', canvas.width / 2, 62);
  ctx.font = 'bold 13px Quicksand, sans-serif';
  ctx.fillText('Download unlocks after 40%', canvas.width / 2, 84);
  ctx.fillText('🐾', canvas.width / 2 - 46, 118);
  ctx.fillText('🐾', canvas.width / 2, 126);
  ctx.fillText('🐾', canvas.width / 2 + 46, 118);
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

const downloadCouponImage = (prize, couponIndex) => {
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

  for (let i = 0; i < 28; i += 1) {
    const x = 70 + (i % 7) * 185;
    const y = 92 + Math.floor(i / 7) * 170;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
    ctx.font = '30px "Quicksand", sans-serif';
    ctx.fillText(i % 2 === 0 ? '🐾' : '💖', x, y);
  }

  drawRoundedRect(ctx, 105, 95, 1190, 710, 42);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.93)';
  ctx.fill();
  ctx.strokeStyle = '#f9a8d4';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.save();
  ctx.setLineDash([20, 16]);
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 140, 130, 1120, 640, 34);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#9f1239';
  ctx.font = '700 42px "Quicksand", sans-serif';
  ctx.fillText('ForMeow Coupon Vault Reward', 180, 225);

  ctx.fillStyle = '#be185d';
  ctx.font = '600 26px "Quicksand", sans-serif';
  ctx.fillText(`Coupon ${couponIndex + 1}`, 180, 275);

  ctx.fillStyle = '#881337';
  ctx.font = '700 56px "Quicksand", sans-serif';
  wrapCanvasText(ctx, prize, 760).forEach((line, lineIndex) => {
    ctx.fillText(line, 180, 405 + lineIndex * 70);
  });

  ctx.fillStyle = '#9f1239';
  ctx.font = '600 28px "Quicksand", sans-serif';
  ctx.fillText(`Signed by: ${COUPON_SIGNER}`, 180, 705);
  ctx.fillText(`Seal: ${COUPON_SEAL_TEXT}`, 180, 745);

  const sealX = 1060;
  const sealY = 515;
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

  ctx.textAlign = 'center';
  ctx.fillStyle = '#881337';
  ctx.font = '700 24px "Quicksand", sans-serif';
  ctx.fillText('SPECIAL SEAL', sealX, sealY - 22);
  ctx.font = '700 22px "Quicksand", sans-serif';
  ctx.fillText(COUPON_SEAL_TEXT, sealX, sealY + 6);
  ctx.font = '800 52px "Quicksand", sans-serif';
  ctx.fillText('🐾', sealX, sealY + 68);
  ctx.textAlign = 'left';

  const slug = prize
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  const link = document.createElement('a');
  link.download = `vault-coupon-${couponIndex + 1}-${slug || 'gift'}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const ScratchCouponCard = ({ challenge, index }) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const strokeCountRef = useRef(0);
  const sadCatTimerRef = useRef(null);
  const [answerInput, setAnswerInput] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSadCat, setShowSadCat] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [revealPercent, setRevealPercent] = useState(0);

  const clearSadTimer = useCallback(() => {
    if (sadCatTimerRef.current) {
      window.clearTimeout(sadCatTimerRef.current);
      sadCatTimerRef.current = null;
    }
  }, []);

  const getPoint = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    const sourcePoint =
      event.touches?.[0] ||
      event.changedTouches?.[0] || {
        clientX: event.clientX,
        clientY: event.clientY,
      };

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (sourcePoint.clientX - rect.left) * scaleX,
      y: (sourcePoint.clientY - rect.top) * scaleY,
    };
  }, []);

  const scratchAt = useCallback((point) => {
    const canvas = canvasRef.current;
    if (!canvas || !point) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  const checkRevealProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const sampleStride = 30;
    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += sampleStride) {
      total += 1;
      if (pixels[i] < 20) {
        transparent += 1;
      }
    }

    const percent = total > 0 ? Math.round((transparent / total) * 100) : 0;
    setRevealPercent(percent);

    if (percent >= SCRATCH_DOWNLOAD_THRESHOLD) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startScratch = (event) => {
    if (!isUnlocked || revealed) {
      return;
    }
    isDrawingRef.current = true;
    scratchAt(getPoint(event));
  };

  const moveScratch = (event) => {
    if (!isUnlocked || !isDrawingRef.current || revealed) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    scratchAt(getPoint(event));
    strokeCountRef.current += 1;
    if (strokeCountRef.current % 8 === 0) {
      checkRevealProgress();
    }
  };

  const endScratch = () => {
    if (!isDrawingRef.current) {
      return;
    }
    isDrawingRef.current = false;
    checkRevealProgress();
  };

  const resetCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    drawScratchLayer(canvas, ctx);
    strokeCountRef.current = 0;
    setRevealPercent(0);
    setRevealed(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.width = SCRATCH_CARD_WIDTH;
    canvas.height = SCRATCH_CARD_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    drawScratchLayer(canvas, ctx);
  }, []);

  useEffect(() => {
    return () => {
      clearSadTimer();
    };
  }, [clearSadTimer]);

  const checkAnswer = () => {
    const answerCorrect = challenge.answers.some((value) => normalize(value) === normalize(answerInput));

    if (!answerCorrect) {
      setUnlockError('Wrong answer. Try again.');
      setShowSadCat(true);
      clearSadTimer();
      sadCatTimerRef.current = window.setTimeout(() => {
        setShowSadCat(false);
      }, 1200);
      return;
    }

    setUnlockError('');
    setShowSadCat(false);
    setIsUnlocked(true);
  };

  return (
    <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Coupon {index + 1}</p>
      <p className="mt-1 text-sm font-semibold text-rose-900">Question: {challenge.question}</p>

      {!isUnlocked && (
        <div className="mt-3 grid gap-2">
          <input
            type="text"
            value={answerInput}
            onChange={(event) => setAnswerInput(event.target.value)}
            className="h-10 rounded-xl border border-rose-200 bg-white px-3 text-sm font-medium text-foreground outline-none ring-pink-200 focus:ring-2"
            placeholder="Enter answer..."
          />
          <button
            type="button"
            onClick={checkAnswer}
            className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-foreground transition hover:opacity-95"
          >
            Check Answer
          </button>
          {unlockError && <p className="text-xs font-semibold text-rose-700">{unlockError}</p>}

          <AnimatePresence>
            {showSadCat && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-center text-sm font-semibold text-rose-800"
              >
                😿 Sad cat says: that answer is wrong.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {isUnlocked && (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-rose-800">
          Password revealed: {challenge.password}
        </p>
      )}

      <div className="relative mt-4 mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">Vault Reward</p>
            <p className="mt-1 text-base font-semibold text-rose-900">{isUnlocked ? challenge.prize : 'Locked reward'}</p>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="relative z-10 h-auto w-full touch-none"
          style={{ cursor: isUnlocked ? PAW_CURSOR : 'not-allowed', opacity: isUnlocked ? 1 : 0.75 }}
          onMouseDown={startScratch}
          onMouseMove={moveScratch}
          onMouseLeave={endScratch}
          onMouseUp={endScratch}
          onTouchStart={startScratch}
          onTouchMove={moveScratch}
          onTouchEnd={endScratch}
        />

        {!isUnlocked && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/20">
            <div className="rounded-full bg-rose-900/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-rose-100">
              Locked
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold text-rose-800">
        <span>
          {!isUnlocked
            ? 'Unlock first'
            : revealed
              ? `Download ready (${SCRATCH_DOWNLOAD_THRESHOLD}% reached)`
              : `Scratched: ${revealPercent}%`}
        </span>
        <div className="flex items-center gap-2">
          {isUnlocked && (
            <button
              type="button"
              onClick={resetCard}
              className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] transition hover:bg-rose-200"
            >
              Re-Scratch
            </button>
          )}
          {isUnlocked && revealed && (
            <button
              type="button"
              onClick={() => downloadCouponImage(challenge.prize, index)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-foreground transition hover:opacity-95"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CouponVaultPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-orange-50 px-4 pb-14 pt-12 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Locked Reward Zone</p>
          <h1 className="mt-2 font-heading text-5xl text-foreground sm:text-6xl">Scratch-Off Coupon Vault</h1>
          <p className="mt-2 text-sm text-foreground/75 sm:text-base">
            One question + one password + one coupon. Scratch at least 40% to download.
          </p>
        </motion.div>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl">
          <div className="mb-4 rounded-2xl border border-white/70 bg-white/75 p-4">
            <p className="text-sm font-semibold text-foreground">
              Seal: <span className="font-bold">{COUPON_SEAL_TEXT}</span>
              <br />
              Signed by: <span className="font-bold">{COUPON_SIGNER}</span>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {couponChallenges.map((challenge, index) => (
              <ScratchCouponCard key={challenge.id} challenge={challenge} index={index} />
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-white/70 bg-white/70 p-4 text-center"
        >
          <p className="text-sm font-semibold text-foreground/80">
            <Sparkles className="mr-1 inline h-4 w-4" />
            Download appears only after scratching at least {SCRATCH_DOWNLOAD_THRESHOLD}%.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
