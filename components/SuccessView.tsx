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
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 rounded-full" />
        <img 
          src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" 
          alt="Cute celebration" 
          className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white rotate-3"
        />
        <div className="absolute -top-6 -right-6 bg-white p-3 rounded-full shadow-lg rotate-12">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg -rotate-12">
          <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>
      </motion.div>

      <div className="space-y-4 max-w-lg">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-serif font-bold text-red-600 drop-shadow-sm leading-tight"
        >
          Yay! <br/> <span className="text-4xl md:text-6xl text-pink-500 font-cursive">She said yes!</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-700 font-medium"
        >
          Can't wait for our date, Minakshi! <br/> 
          <span className="text-sm text-gray-500 mt-2 block">(I knew you'd pick the right button 😉)</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 max-w-md w-full"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif">A Promise 💌</h3>
        <p className="text-gray-600 italic">
          "To lots of laughter, chocolate, and making beautiful memories together."
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessView;
