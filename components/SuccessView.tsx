import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

// CSS animations extracted outside component
const successStyles = `
  @keyframes gentle-bounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.05) rotate(3deg); }
    75% { transform: scale(1.05) rotate(-3deg); }
  }
  @keyframes float-y {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float-y-alt {
    0%, 100% { transform: translateY(0) rotate(5deg); }
    50% { transform: translateY(8px) rotate(-5deg); }
  }
  @keyframes heart-dance {
    0%, 100% { transform: translateY(-10px) rotate(-15deg) scale(1); }
    50% { transform: translateY(10px) rotate(15deg) scale(1.2); }
  }
  @keyframes sparkle-pulse {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  @keyframes float-heart {
    0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.2; }
    50% { transform: translateY(-30px) scale(1.1); opacity: 0.5; }
  }
  .gentle-bounce { animation: gentle-bounce 2s ease-in-out infinite; }
  .float-y { animation: float-y 4s ease-in-out infinite; }
  .float-y-alt { animation: float-y-alt 3.5s ease-in-out infinite; }
  .heart-dance { animation: heart-dance 2s ease-in-out infinite; }
  .heart-dance-delay { animation: heart-dance 1.8s ease-in-out infinite 0.3s; }
  .heart-dance-delay-2 { animation: heart-dance 2.2s ease-in-out infinite 0.6s; }
  .sparkle-pulse { animation: sparkle-pulse 1.5s ease-in-out infinite; }
  .sparkle-pulse-delay { animation: sparkle-pulse 1.2s ease-in-out infinite 0.5s; }
  .sparkle-pulse-delay-2 { animation: sparkle-pulse 1.8s ease-in-out infinite 0.3s; }
  .float-heart { animation: float-heart 3s ease-in-out infinite; }
`;

// Pre-computed positions for floating hearts
const floatingHeartPositions = [
  { left: '15%', top: '20%', delay: '0s' },
  { left: '30%', top: '45%', delay: '0.4s' },
  { left: '45%', top: '70%', delay: '0.8s' },
  { left: '60%', top: '20%', delay: '1.2s' },
  { left: '75%', top: '45%', delay: '1.6s' },
];

const SuccessView: React.FC = () => {
  const confettiRef = useRef<number | null>(null);

  useEffect(() => {
    // Initial burst - runs for 2 seconds only, then stops
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });

      if (Date.now() < end) {
        confettiRef.current = requestAnimationFrame(frame);
      }
    };
    confettiRef.current = requestAnimationFrame(frame);

    // Heart burst - single shot
    const heartTimeout = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['circle'],
        colors: ['#FF0000', '#FF69B4', '#FFF']
      });
    }, 500);

    // Cleanup on unmount
    return () => {
      if (confettiRef.current) {
        cancelAnimationFrame(confettiRef.current);
      }
      clearTimeout(heartTimeout);
      confetti.reset();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-8 space-y-8"
    >
      <style>{successStyles}</style>

      {/* Floating decorative elements - CSS animations */}
      <img
        src="./assets/deco_bow.png"
        className="absolute top-10 left-10 w-16 md:w-24 opacity-70 float-y"
        alt=""
        loading="lazy"
      />
      <img
        src="./assets/deco_cherries.png"
        className="absolute top-20 right-10 w-12 md:w-16 opacity-70 float-y-alt"
        alt=""
        loading="lazy"
      />
      <img
        src="./assets/deco_envelope.png"
        className="absolute bottom-20 left-10 w-20 md:w-28 opacity-60 float-y"
        alt=""
        loading="lazy"
      />

      {/* Main mascot celebration - CSS animation */}
      <div className="relative gentle-bounce">
        <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 rounded-full" />

        <div className="relative w-56 h-56 md:w-72 md:h-72">
          <img
            src="./assets/mascot_happy.png"
            alt="Happy celebration teddy"
            className="w-full h-full object-contain drop-shadow-2xl"
          />

          {/* Floating hearts - CSS animations */}
          <img
            src="./assets/particle_heart.png"
            className="absolute -top-4 -left-8 w-10 h-10 heart-dance"
            alt=""
            loading="lazy"
          />
          <img
            src="./assets/particle_heart.png"
            className="absolute -top-6 -right-4 w-8 h-8 heart-dance-delay"
            alt=""
            loading="lazy"
          />
          <img
            src="./assets/particle_heart.png"
            className="absolute top-1/4 -right-10 w-7 h-7 heart-dance-delay-2"
            alt=""
            loading="lazy"
          />

          {/* Sparkles - CSS animations */}
          <img
            src="./assets/particle_sparkle.png"
            className="absolute -top-2 left-1/4 w-6 h-6 sparkle-pulse"
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
            loading="lazy"
          />
          <img
            src="./assets/particle_sparkle.png"
            className="absolute top-8 -right-6 w-5 h-5 sparkle-pulse-delay"
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
            loading="lazy"
          />
          <img
            src="./assets/particle_sparkle.png"
            className="absolute bottom-10 -left-6 w-5 h-5 sparkle-pulse-delay-2"
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
            loading="lazy"
          />
        </div>

        <div className="absolute -top-6 -right-6 bg-white p-3 rounded-full shadow-lg rotate-12">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg -rotate-12">
          <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>

        {/* Stamp decoration - static */}
        <img
          src="./assets/deco_stamp.png"
          className="absolute -bottom-6 -right-8 w-14 h-14 opacity-80"
          alt=""
          loading="lazy"
        />
      </div>

      <div className="space-y-4 max-w-lg">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-serif font-bold text-red-600 drop-shadow-sm leading-tight"
        >
          Yay! <br /> <span className="text-4xl md:text-6xl text-pink-500 font-cursive">She said yes!</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-700 font-medium"
        >
          Can't wait for our date, Minakshi! <br />
          <span className="text-sm text-gray-500 mt-2 block">(I knew you'd pick the right button 😉)</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 max-w-md w-full relative overflow-hidden"
      >
        {/* Decorative bow on card - static */}
        <img
          src="./assets/deco_bow.png"
          className="absolute -top-3 -right-3 w-12 h-12 opacity-80"
          alt=""
          loading="lazy"
        />

        <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif flex items-center gap-2">
          A Promise
          <img
            src="./assets/particle_heart.png"
            className="w-5 h-5 inline animate-pulse"
            alt=""
            loading="lazy"
          />
        </h3>
        <p className="text-gray-600 italic">
          "To lots of laughter, chocolate, and making beautiful memories together."
        </p>
      </motion.div>

      {/* Floating hearts - CSS animation, reduced count */}
      {floatingHeartPositions.map((pos, i) => (
        <img
          key={`floating-heart-${i}`}
          src="./assets/particle_heart.png"
          className="absolute w-6 h-6 pointer-events-none float-heart"
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: pos.delay,
          }}
          alt=""
          loading="lazy"
        />
      ))}
    </motion.div>
  );
};

export default React.memo(SuccessView);
