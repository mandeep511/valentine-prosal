import React, { useMemo } from 'react';

interface FloatingParticle {
  id: number;
  x: number;
  scale: number;
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
  // Memoize particles - only create once, never re-render
  const particles = useMemo<FloatingParticle[]>(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (i * 8) + Math.random() * 5, // Distribute evenly with slight randomness
      scale: 0.5 + (i % 3) * 0.2,
      delay: i * 0.8,
      duration: 15 + (i % 4) * 5,
      type: i % 3 === 0 ? 'sparkle' : 'heart' as const
    }))
  , []);

  // Memoize decorative elements
  const decorativeElements = useMemo<FloatingDeco[]>(() => [
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
    }
  ], []);

  // Memoize ambient sparkle positions (computed once)
  const ambientSparkles = useMemo(() =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${15 + i * 18}%`,
      top: `${20 + (i % 3) * 25}%`,
      duration: 2.5 + i * 0.3
    }))
  , []);

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

      {/* CSS-based floating particles - much more performant than framer-motion */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0.15; }
          50% { opacity: 0.35; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0.15; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .float-particle {
          will-change: transform, opacity;
          animation: floatUp var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
        .gentle-float {
          will-change: transform;
          animation: gentleFloat 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .sparkle-effect {
          will-change: transform, opacity;
          animation: sparkle var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
      `}</style>

      {/* Floating particles using CSS animations */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute float-particle select-none"
          style={{
            left: `${particle.x}%`,
            width: particle.type === 'heart' ? '32px' : '24px',
            height: particle.type === 'heart' ? '32px' : '24px',
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
            transform: `scale(${particle.scale})`,
          } as React.CSSProperties}
        >
          <img
            src={particle.type === 'heart' ? './assets/particle_heart.png' : './assets/particle_sparkle.png'}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}

      {/* Static decorative elements with CSS animation */}
      {decorativeElements.map((deco) => (
        <div
          key={deco.id}
          className={`absolute ${deco.size} opacity-60 gentle-float`}
          style={{
            ...deco.position,
            transform: `rotate(${deco.rotation}deg)`,
            '--delay': `${deco.animationDelay}s`,
          } as React.CSSProperties}
        >
          <img
            src={deco.src}
            alt=""
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
          />
        </div>
      ))}

      {/* Ambient sparkle effects with CSS */}
      {ambientSparkles.map((sparkle) => (
        <div
          key={`ambient-sparkle-${sparkle.id}`}
          className="absolute w-4 h-4 sparkle-effect"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            '--duration': `${sparkle.duration}s`,
            '--delay': `${sparkle.id * 0.5}s`,
          } as React.CSSProperties}
        >
          <img
            src="./assets/particle_sparkle.png"
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(FloatingBackground);
