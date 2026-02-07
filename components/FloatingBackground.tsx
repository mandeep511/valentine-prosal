import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FLOATING_EMOJIS } from '../constants';
import { FloatingElement } from '../types';

const FloatingBackground: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random floating elements
    const newElements: FloatingElement[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      scale: 0.5 + Math.random() * 1,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
      emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-red-50 opacity-80" />
      
      {/* Decorative noise/grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-2xl md:text-4xl opacity-20 select-none"
          initial={{ 
            x: `${el.x}vw`, 
            y: "110vh", 
            rotate: el.rotation,
            scale: el.scale 
          }}
          animate={{ 
            y: "-10vh", 
            rotate: el.rotation + 360 
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;
