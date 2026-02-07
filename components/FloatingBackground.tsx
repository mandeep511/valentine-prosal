import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
  type: 'heart' | 'sparkle';
}

interface FloatingDeco {
  id: string;
  src: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: string;
  rotation: number;
  animationDelay: number;
}

const FloatingBackground: React.FC = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  const decorativeElements: FloatingDeco[] = [
    {
      id: 'bow-top-left',
      src: './assets/deco_bow.png',
      position: { top: '5%', left: '3%' },
      size: 'w-16 md:w-24',
      rotation: -15,
      animationDelay: 0
    },
    {
      id: 'cherries-top-right',
      src: './assets/deco_cherries.png',
      position: { top: '8%', right: '5%' },
      size: 'w-12 md:w-16',
      rotation: 10,
      animationDelay: 0.5
    },
    {
      id: 'envelope-bottom-left',
      src: './assets/deco_envelope.png',
      position: { bottom: '10%', left: '5%' },
      size: 'w-20 md:w-28',
      rotation: -8,
      animationDelay: 1
    },
    {
      id: 'stamp-bottom-right',
      src: './assets/deco_stamp.png',
      position: { bottom: '15%', right: '8%' },
      size: 'w-14 md:w-20',
      rotation: 12,
      animationDelay: 1.5
    },
    {
      id: 'bow-mid-right',
      src: './assets/deco_bow.png',
      position: { top: '40%', right: '2%' },
      size: 'w-10 md:w-14',
      rotation: 25,
      animationDelay: 2
    },
    {
      id: 'cherries-mid-left',
      src: './assets/deco_cherries.png',
      position: { top: '55%', left: '2%' },
      size: 'w-10 md:w-12',
      rotation: -5,
      animationDelay: 2.5
    }
  ];

  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.4 + Math.random() * 0.8,
      rotation: Math.random() * 360,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 18,
      type: Math.random() > 0.4 ? 'heart' : 'sparkle'
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-red-50 opacity-90" />

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(255,182,193,0.6) 0%, transparent 50%)'
        }}
      />

      {/* Decorative noise/grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating particles using custom assets */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute select-none"
          style={{
            width: particle.type === 'heart' ? '40px' : '30px',
            height: particle.type === 'heart' ? '40px' : '30px',
          }}
          initial={{
            x: `${particle.x}vw`,
            y: "110vh",
            rotate: particle.rotation,
            scale: particle.scale,
            opacity: 0.15
          }}
          animate={{
            y: "-10vh",
            rotate: particle.rotation + 360,
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        >
          <img
            src={particle.type === 'heart' ? './assets/particle_heart.png' : './assets/particle_sparkle.png'}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: particle.type === 'sparkle' ? 'drop-shadow(0 0 3px rgba(255,215,0,0.5))' : 'none'
            }}
          />
        </motion.div>
      ))}

      {/* Static decorative elements */}
      {decorativeElements.map((deco) => (
        <motion.div
          key={deco.id}
          className={`absolute ${deco.size} opacity-60 hover:opacity-80 transition-opacity`}
          style={{
            ...deco.position,
            transform: `rotate(${deco.rotation}deg)`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{
            opacity: { duration: 0.8, delay: deco.animationDelay },
            scale: { duration: 0.8, delay: deco.animationDelay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: deco.animationDelay }
          }}
        >
          <img
            src={deco.src}
            alt=""
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
      ))}

      {/* Ambient sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ambient-sparkle-${i}`}
          className="absolute w-4 h-4"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <img
            src="./assets/particle_sparkle.png"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;
