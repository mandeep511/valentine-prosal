import React, { useEffect, useRef, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'heart' | 'sparkle';
  image: HTMLImageElement;
}

interface DecoElement {
  id: string;
  src: string;
  style: React.CSSProperties;
  className: string;
}

const FloatingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const imagesRef = useRef<{ heart: HTMLImageElement | null; sparkle: HTMLImageElement | null }>({
    heart: null,
    sparkle: null
  });

  // Static decorative elements - memoized, no animations that cause reflows
  const decorativeElements = useMemo<DecoElement[]>(() => [
    {
      id: 'bow-top-left',
      src: './assets/deco_bow.png',
      style: { top: '5%', left: '3%', transform: 'rotate(-15deg)' },
      className: 'w-16 md:w-24 opacity-60'
    },
    {
      id: 'cherries-top-right',
      src: './assets/deco_cherries.png',
      style: { top: '8%', right: '5%', transform: 'rotate(10deg)' },
      className: 'w-12 md:w-16 opacity-60'
    },
    {
      id: 'envelope-bottom-left',
      src: './assets/deco_envelope.png',
      style: { bottom: '10%', left: '5%', transform: 'rotate(-8deg)' },
      className: 'w-20 md:w-28 opacity-50'
    },
    {
      id: 'stamp-bottom-right',
      src: './assets/deco_stamp.png',
      style: { bottom: '15%', right: '8%', transform: 'rotate(12deg)' },
      className: 'w-14 md:w-20 opacity-50'
    }
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Preload images
    const heartImg = new Image();
    const sparkleImg = new Image();
    let imagesLoaded = 0;

    const onImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        imagesRef.current = { heart: heartImg, sparkle: sparkleImg };
        initParticles();
        animate();
      }
    };

    heartImg.onload = onImageLoad;
    sparkleImg.onload = onImageLoad;
    heartImg.src = './assets/particle_heart.png';
    sparkleImg.src = './assets/particle_sparkle.png';

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(15, Math.floor(window.innerWidth / 100)); // Responsive count
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const isHeart = Math.random() > 0.3;
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight + window.innerHeight, // Start below viewport
          size: 20 + Math.random() * 20,
          speedY: 0.3 + Math.random() * 0.5, // Slow, gentle rise
          speedX: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: 0.15 + Math.random() * 0.2,
          type: isHeart ? 'heart' : 'sparkle',
          image: isHeart ? heartImg : sparkleImg
        });
      }
    };

    // Animation loop - smooth 60fps
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with slight fade for trail effect (optional, remove for cleaner look)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particles = particlesRef.current;
      const now = performance.now();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(now * 0.001 + i) * 0.1; // Gentle wave motion
        p.rotation += p.rotationSpeed;

        // Reset particle when it goes above viewport
        if (p.y < -p.size) {
          p.y = window.innerHeight + p.size;
          p.x = Math.random() * window.innerWidth;
        }

        // Wrap horizontally
        if (p.x < -p.size) p.x = window.innerWidth + p.size;
        if (p.x > window.innerWidth + p.size) p.x = -p.size;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.image.complete && p.image.naturalWidth > 0) {
          ctx.drawImage(p.image, -p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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

      {/* Canvas for particles - GPU accelerated */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          willChange: 'transform',
          contain: 'strict',
          isolation: 'isolate'
        }}
      />

      {/* Static decorative elements - no animations, just positioned */}
      {decorativeElements.map((deco) => (
        <img
          key={deco.id}
          src={deco.src}
          alt=""
          className={`absolute ${deco.className}`}
          style={deco.style}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
};

export default React.memo(FloatingBackground);
