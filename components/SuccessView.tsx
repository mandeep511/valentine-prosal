import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

const SuccessView: React.FC = () => {
  useEffect(() => {
    // Initial big explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ['heart'],
        colors: ['#FF0000', '#FF69B4', '#FFF']
      });
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-8 space-y-8"
    >
      {/* Floating decorative elements */}
      <motion.img
        src="./assets/deco_bow.png"
        className="absolute top-10 left-10 w-16 md:w-24 opacity-70"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
        alt=""
      />
      <motion.img
        src="./assets/deco_cherries.png"
        className="absolute top-20 right-10 w-12 md:w-16 opacity-70"
        animate={{ y: [0, 8, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        alt=""
      />
      <motion.img
        src="./assets/deco_envelope.png"
        className="absolute bottom-20 left-10 w-20 md:w-28 opacity-60"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        alt=""
      />

      {/* Main mascot celebration */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 rounded-full" />

        {/* Happy teddy mascot instead of GIF */}
        <div className="relative w-56 h-56 md:w-72 md:h-72">
          <img
            src="./assets/mascot_happy.png"
            alt="Happy celebration teddy"
            className="w-full h-full object-contain drop-shadow-2xl"
          />

          {/* Floating hearts around mascot */}
          <motion.img
            src="./assets/particle_heart.png"
            className="absolute -top-4 -left-8 w-10 h-10"
            animate={{ y: [-10, 10, -10], rotate: [-15, 15, -15], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            alt=""
          />
          <motion.img
            src="./assets/particle_heart.png"
            className="absolute -top-6 -right-4 w-8 h-8"
            animate={{ y: [10, -10, 10], rotate: [15, -15, 15], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            alt=""
          />
          <motion.img
            src="./assets/particle_heart.png"
            className="absolute top-1/4 -right-10 w-7 h-7"
            animate={{ y: [-5, 5, -5], x: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            alt=""
          />

          {/* Sparkles */}
          <motion.img
            src="./assets/particle_sparkle.png"
            className="absolute -top-2 left-1/4 w-6 h-6"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
          />
          <motion.img
            src="./assets/particle_sparkle.png"
            className="absolute top-8 -right-6 w-5 h-5"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
          />
          <motion.img
            src="./assets/particle_sparkle.png"
            className="absolute bottom-10 -left-6 w-5 h-5"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
            alt=""
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
          />
        </div>

        <div className="absolute -top-6 -right-6 bg-white p-3 rounded-full shadow-lg rotate-12">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg -rotate-12">
          <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>

        {/* Stamp decoration */}
        <motion.img
          src="./assets/deco_stamp.png"
          className="absolute -bottom-6 -right-8 w-14 h-14 opacity-80"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          alt=""
        />
      </motion.div>

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
        {/* Decorative bow on card */}
        <motion.img
          src="./assets/deco_bow.png"
          className="absolute -top-3 -right-3 w-12 h-12 opacity-80"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
          alt=""
        />

        <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif flex items-center gap-2">
          A Promise
          <motion.img
            src="./assets/particle_heart.png"
            className="w-5 h-5 inline"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            alt=""
          />
        </h3>
        <p className="text-gray-600 italic">
          "To lots of laughter, chocolate, and making beautiful memories together."
        </p>
      </motion.div>

      {/* Floating particle effects */}
      {[...Array(6)].map((_, i) => (
        <motion.img
          key={`floating-heart-${i}`}
          src="./assets/particle_heart.png"
          className="absolute w-6 h-6 pointer-events-none opacity-40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4
          }}
          alt=""
        />
      ))}
    </motion.div>
  );
};

export default SuccessView;
