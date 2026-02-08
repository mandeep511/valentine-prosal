import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

// Get name from URL param or fallback to default
const getNameFromUrl = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name && name.trim()) {
      const decoded = decodeURIComponent(name.trim());
      return decoded.charAt(0).toUpperCase() + decoded.slice(1);
    }
  }
  return 'Minakshi';
};

// Minimal CSS - only what we need, GPU-optimized
const successStyles = `
  .float-gentle {
    animation: floatGentle 3s ease-in-out infinite;
    will-change: transform;
  }
  .float-gentle-delay { animation-delay: 0.5s; }
  .float-gentle-delay-2 { animation-delay: 1s; }

  @keyframes floatGentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .pulse-soft {
    animation: pulseSoft 2s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @keyframes pulseSoft {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.15); opacity: 1; }
  }
`;

const SuccessView: React.FC = () => {
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const myConfettiRef = useRef<confetti.CreateTypes | null>(null);

  const recipientName = useMemo(() => getNameFromUrl(), []);

  useEffect(() => {
    // Create dedicated confetti canvas for better performance
    if (confettiCanvasRef.current) {
      myConfettiRef.current = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true, // Use web worker for calculations - smoother!
      });
    }

    const myConfetti = myConfettiRef.current;
    if (!myConfetti) return;

    // Elegant burst sequence - fewer calls, bigger impact
    // Initial side bursts
    const burst1 = setTimeout(() => {
      myConfetti({
        particleCount: 80,
        angle: 60,
        spread: 80,
        startVelocity: 45,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#fff'],
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0.5,
      });
    }, 100);

    const burst2 = setTimeout(() => {
      myConfetti({
        particleCount: 80,
        angle: 120,
        spread: 80,
        startVelocity: 45,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#fff'],
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2,
        drift: -0.5,
      });
    }, 200);

    // Center celebration burst
    const burst3 = setTimeout(() => {
      myConfetti({
        particleCount: 100,
        spread: 100,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF0000', '#FF69B4', '#FFD700', '#FFF', '#ff477e'],
        ticks: 250,
        gravity: 1,
        scalar: 1,
        shapes: ['circle', 'square'],
      });
    }, 400);

    // Final sparkle shower
    const burst4 = setTimeout(() => {
      myConfetti({
        particleCount: 50,
        spread: 160,
        startVelocity: 25,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#FFD700', '#FFF', '#ff85a1'],
        ticks: 200,
        gravity: 0.6,
        scalar: 0.8,
      });
    }, 700);

    // Cleanup
    return () => {
      clearTimeout(burst1);
      clearTimeout(burst2);
      clearTimeout(burst3);
      clearTimeout(burst4);
      if (myConfettiRef.current) {
        myConfettiRef.current.reset();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-12"
    >
      <style>{successStyles}</style>

      {/* Confetti canvas - dedicated, GPU accelerated */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Static decorations - no heavy animations */}
      <img
        src="./assets/deco_bow.png"
        className="absolute top-8 left-8 w-16 md:w-20 opacity-50"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <img
        src="./assets/deco_cherries.png"
        className="absolute top-12 right-8 w-12 md:w-16 opacity-50"
        alt=""
        loading="lazy"
        decoding="async"
      />

      {/* Main mascot - single gentle animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-pink-300 blur-3xl opacity-30 rounded-full scale-75" />

        <div className="relative w-48 h-48 md:w-64 md:h-64 float-gentle">
          <img
            src="./assets/mascot_happy.png"
            alt="Happy celebration teddy"
            className="w-full h-full object-contain drop-shadow-2xl"
          />

          {/* Minimal floating elements - just 2 hearts */}
          <img
            src="./assets/particle_heart.png"
            className="absolute -top-2 -left-4 w-8 h-8 pulse-soft"
            alt=""
            loading="lazy"
          />
          <img
            src="./assets/particle_heart.png"
            className="absolute -top-4 -right-2 w-6 h-6 pulse-soft"
            style={{ animationDelay: '0.5s' }}
            alt=""
            loading="lazy"
          />
        </div>

        {/* Corner badges */}
        <div className="absolute -top-4 -right-4 bg-white p-2.5 rounded-full shadow-lg">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
        <div className="absolute -bottom-2 -left-2 bg-white p-2.5 rounded-full shadow-lg">
          <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-3 max-w-md"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-red-600 leading-tight">
          Yay!
        </h1>
        <p className="text-3xl md:text-4xl text-pink-500 font-cursive">
          She said yes!
        </p>
        <p className="text-lg md:text-xl text-gray-600 mt-4">
          Can't wait for our date, {recipientName}!
        </p>
        <p className="text-sm text-gray-400">
          (I knew you'd pick the right button 😉)
        </p>
      </motion.div>

      {/* Promise card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 p-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 max-w-sm w-full"
      >
        <h3 className="text-base font-bold text-gray-800 mb-2 font-serif flex items-center justify-center gap-2">
          A Promise
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
        </h3>
        <p className="text-gray-600 italic text-sm">
          "To lots of laughter, chocolate, and making beautiful memories together."
        </p>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(SuccessView);
