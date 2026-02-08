import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NO_PHRASES, YES_PHRASES } from '../constants';
import { Position } from '../types';
import { Heart } from 'lucide-react';

interface ProposalCardProps {
  onYes: () => void;
}

type MascotMood = 'shy' | 'happy' | 'pleading';

// Get name from URL param or fallback to default
const getNameFromUrl = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name && name.trim()) {
      // Capitalize first letter and decode URI
      const decoded = decodeURIComponent(name.trim());
      return decoded.charAt(0).toUpperCase() + decoded.slice(1);
    }
  }
  return 'Minakshi';
};

const MASCOT_IMAGES: Record<MascotMood, string> = {
  shy: './assets/mascot_shy.png',
  happy: './assets/mascot_happy.png',
  pleading: './assets/mascot_pleading.png'
};

// CSS animations extracted outside component - GPU optimized
const cardStyles = `
  @keyframes gentle-rotate {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(4deg); }
  }
  @keyframes gentle-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes pulse-scale {
    0%, 100% { transform: scale(0.9); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  @keyframes heart-float {
    0%, 100% { transform: translateY(-4px) rotate(-8deg); }
    50% { transform: translateY(4px) rotate(8deg); }
  }
  @keyframes broken-heart {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.7; }
    50% { transform: translateX(-50%) translateY(3px); opacity: 1; }
  }
  .gentle-rotate {
    animation: gentle-rotate 4s ease-in-out infinite;
    will-change: transform;
  }
  .gentle-bob {
    animation: gentle-bob 2.5s ease-in-out infinite;
    will-change: transform;
  }
  .pulse-scale {
    animation: pulse-scale 2s ease-in-out infinite;
    will-change: transform, opacity;
  }
  .heart-float {
    animation: heart-float 2s ease-in-out infinite;
    will-change: transform;
  }
  .heart-float-delay {
    animation: heart-float 2.2s ease-in-out infinite;
    animation-delay: 0.3s;
    will-change: transform;
  }
  .broken-heart {
    animation: broken-heart 1.5s ease-in-out infinite;
    will-change: transform, opacity;
  }
`;

const ProposalCard: React.FC<ProposalCardProps> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [isYesHovered, setIsYesHovered] = useState(false);
  const [recipientName, setRecipientName] = useState('Minakshi');

  // Read name from URL on mount
  useEffect(() => {
    setRecipientName(getNameFromUrl());
  }, []);

  // Derive mascot mood directly instead of useEffect
  const mascotMood = useMemo<MascotMood>(() => {
    if (noCount > 0) return 'pleading';
    if (isYesHovered) return 'happy';
    return 'shy';
  }, [noCount, isYesHovered]);

  const moveButton = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const btnWidth = 160;
    const btnHeight = 60;
    const padding = 20;

    const maxX = width - btnWidth - padding;
    const maxY = height - btnHeight - padding;

    const newX = Math.random() * (Math.max(0, maxX - padding)) + padding;
    const newY = Math.random() * (Math.max(0, maxY - padding)) + padding;

    setNoButtonPos({ x: newX, y: newY });
  }, []);

  const handleNoClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setNoCount(prev => prev + 1);
    moveButton();
  }, [moveButton]);

  const noText = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  const yesText = YES_PHRASES[Math.min(noCount, YES_PHRASES.length - 1)];
  const yesScale = Math.min(1 + (noCount * 0.05), 1.15);

  return (
    <div className="relative w-full max-w-md mx-auto px-4">
      <style>{cardStyles}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-white/95 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-visible"
      >
        {/* Decorative top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-300 to-pink-300" />

        {/* Background glows - static, no animation needed */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50" />

        {/* Decorative stamp in corner - CSS animation */}
        <div className="absolute top-4 right-4 w-12 h-12 opacity-70 gentle-rotate">
          <img src="./assets/deco_stamp.png" alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Heart emoji header - CSS animation */}
          <div className="text-6xl mb-4 drop-shadow-sm select-none gentle-rotate">
            💝
          </div>

          {/* Title section */}
          <div className="space-y-1 text-center mb-6">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 leading-tight">
              Will you be my Valentine?
            </h2>
            <div className="inline-block relative pt-2">
              <p
                className="text-3xl md:text-4xl text-pink-600 transform -rotate-2"
                style={{
                  fontFamily: "'Dancing Script', 'Pacifico', cursive",
                  fontWeight: 600,
                  textShadow: '1px 1px 2px rgba(236, 72, 153, 0.15)'
                }}
              >
                {recipientName}
              </p>
              <img
                src="./assets/particle_sparkle.png"
                className="absolute -right-6 -top-1 w-5 h-5 pulse-scale"
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Nagging message */}
          <AnimatePresence>
            {noCount > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center w-full pb-2"
              >
                <p className="text-md md:text-base font-medium text-pink-500 animate-pulse">
                  {noCount > 5 ? "Say yes already! 🥺" : "Why are you doing this? 😭"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mascot section */}
          <div className="w-full flex justify-center mb-6 relative">
            <div className="relative">
              {/* "Are you sure?" speech bubble tied to mascot */}
              {/* <AnimatePresence>
                {noCount > 0 && noCount <= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -left-32 md:-left-40 top-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-100"
                    style={{ transformOrigin: 'right center' }}
                  >
                    <p className="text-gray-700 font-medium text-sm flex items-center gap-2 whitespace-nowrap">
                      Are you sure? <span className="text-lg">😰</span>
                    </p>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
                  </motion.div>
                )}
              </AnimatePresence> */}

              {/* Mascot image with mood-based switching */}
              <motion.div
                className="relative w-40 h-40 md:w-48 md:h-48"
                key={mascotMood}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={MASCOT_IMAGES[mascotMood]}
                  alt="Cute teddy mascot"
                  className="w-full h-full object-contain drop-shadow-xl"
                />

                {/* Floating hearts around happy mascot - CSS animations */}
                {mascotMood === 'happy' && (
                  <>
                    <img
                      src="./assets/particle_heart.png"
                      className="absolute -top-2 -left-4 w-6 h-6 heart-float"
                      alt=""
                      loading="lazy"
                    />
                    <img
                      src="./assets/particle_heart.png"
                      className="absolute -top-4 -right-2 w-5 h-5 heart-float-delay"
                      alt=""
                      loading="lazy"
                    />
                    <img
                      src="./assets/particle_sparkle.png"
                      className="absolute top-0 right-0 w-4 h-4 pulse-scale"
                      alt=""
                      loading="lazy"
                    />
                  </>
                )}

                {/* Tears effect for pleading mascot - CSS animation */}
                {mascotMood === 'pleading' && (
                  <div className="absolute -bottom-2 left-1/2 text-2xl broken-heart">
                    💔
                  </div>
                )}
              </motion.div>

              {/* Decorative rose - CSS animation */}
              <div className="absolute -bottom-2 -right-6 text-3xl select-none gentle-bob">
                🌹
              </div>
            </div>
          </div>

          {/* Centered Action Button Area */}
          <div className="flex flex-col items-center justify-center w-full mt-2 mb-6 gap-4">
            {/* Yes Button */}
            <motion.button
              onClick={onYes}
              onMouseEnter={() => setIsYesHovered(true)}
              onMouseLeave={() => setIsYesHovered(false)}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale + 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-pink-200/50 flex items-center gap-2 z-20 relative overflow-hidden group select-none"
              style={{ touchAction: 'manipulation' }}
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Heart className="w-5 h-5 fill-white/90 animate-pulse" />
              <span className="relative text-lg whitespace-nowrap">{yesText}</span>
            </motion.button>

            {/* No button - initial state only */}
            {noCount === 0 && (
              <motion.button
                onClick={handleNoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 select-none"
              >
                {noText}
              </motion.button>
            )}
          </div>

          {/* Decorative cherries - CSS animation */}
          <img
            src="./assets/deco_cherries.png"
            className="absolute -bottom-4 -left-6 w-16 h-16 opacity-80 gentle-rotate"
            alt=""
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Floating No Button - Portal */}
      {noCount > 0 && createPortal(
        <motion.button
          key="floating-no"
          initial={{ scale: 0, opacity: 0, x: noButtonPos.x, y: noButtonPos.y }}
          animate={{
            x: noButtonPos.x,
            y: noButtonPos.y,
            scale: 1,
            opacity: 1
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            opacity: { duration: 0.2 }
          }}
          onClick={handleNoClick}
          className="fixed top-0 left-0 z-[9999] bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-6 rounded-full shadow-xl border border-gray-200 whitespace-nowrap select-none flex items-center gap-2"
          style={{ touchAction: 'manipulation' }}
        >
          <span>{noText}</span>
          <span>{noCount > 5 ? "🏃‍♂️" : "😢"}</span>
        </motion.button>,
        document.body
      )}
    </div>
  );
};

export default React.memo(ProposalCard);
