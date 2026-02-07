import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NO_PHRASES, YES_PHRASES } from '../constants';
import { Position } from '../types';
import { Heart } from 'lucide-react';

interface ProposalCardProps {
  onYes: () => void;
}

type MascotMood = 'shy' | 'happy' | 'pleading';

const MASCOT_IMAGES: Record<MascotMood, string> = {
  shy: './assets/mascot_shy.png',
  happy: './assets/mascot_happy.png',
  pleading: './assets/mascot_pleading.png'
};

const ProposalCard: React.FC<ProposalCardProps> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [mascotMood, setMascotMood] = useState<MascotMood>('shy');
  const [isYesHovered, setIsYesHovered] = useState(false);

  useEffect(() => {
    if (noCount > 0) {
      setMascotMood('pleading');
    } else if (isYesHovered) {
      setMascotMood('happy');
    } else {
      setMascotMood('shy');
    }
  }, [noCount, isYesHovered]);

  const moveButton = () => {
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
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setNoCount(prev => prev + 1);
    moveButton();
  };

  const getNoText = () => NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  const getYesText = () => YES_PHRASES[Math.min(noCount, YES_PHRASES.length - 1)];

  const yesScale = Math.min(1 + (noCount * 0.05), 1.15);

  return (
    <div className="relative w-full max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-white/95 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-visible"
      >
        {/* Decorative top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-300 to-pink-300" />

        {/* Background glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50" />

        {/* Decorative stamp in corner */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 opacity-70"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src="./assets/deco_stamp.png" alt="" className="w-full h-full object-contain" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Heart emoji header */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-4 drop-shadow-sm select-none"
          >
            💝
          </motion.div>

          {/* Title section */}
          <div className="space-y-1 text-center mb-6">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 leading-tight">
              Will you be my Valentine?
            </h2>
            <div className="inline-block relative pt-2">
              <p className="text-3xl md:text-4xl font-cursive text-pink-600 transform -rotate-2">
                Minakshi
              </p>
              <motion.img
                src="./assets/particle_sparkle.png"
                className="absolute -right-6 -top-1 w-5 h-5"
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
                alt=""
              />
            </div>
          </div>
          {/* Nagging message with proper spacing */}
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
          <motion.div
            className="w-full flex justify-center mb-6 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              {/* "Are you sure?" speech bubble tied to mascot */}
              <AnimatePresence>
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
                    {/* Speech bubble tail pointing right toward mascot */}
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
                  </motion.div>
                )}
              </AnimatePresence>

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

                {/* Floating hearts around happy mascot */}
                {mascotMood === 'happy' && (
                  <>
                    <motion.img
                      src="./assets/particle_heart.png"
                      className="absolute -top-2 -left-4 w-6 h-6"
                      animate={{ y: [-5, 5, -5], rotate: [-10, 10, -10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      alt=""
                    />
                    <motion.img
                      src="./assets/particle_heart.png"
                      className="absolute -top-4 -right-2 w-5 h-5"
                      animate={{ y: [5, -5, 5], rotate: [10, -10, 10] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      alt=""
                    />
                    <motion.img
                      src="./assets/particle_sparkle.png"
                      className="absolute top-0 right-0 w-4 h-4"
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      alt=""
                    />
                  </>
                )}

                {/* Tears effect for pleading mascot */}
                {mascotMood === 'pleading' && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl"
                    animate={{ y: [0, 3, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💔
                  </motion.div>
                )}
              </motion.div>

              {/* Decorative rose */}
              <motion.div
                className="absolute -bottom-2 -right-6 text-3xl select-none"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌹
              </motion.div>

              {/* Small bow decoration */}
              {/* <motion.img
                src="./assets/deco_bow.png"
                className="absolute -top-4 -left-6 w-10 h-10 opacity-80"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                alt=""
              /> */}
            </div>
          </motion.div>

          {/* Centered Action Button Area */}
          <div className="flex flex-col items-center justify-center w-full mt-2 mb-6 gap-4">
            {/* Yes Button - Always centered */}
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
              <span className="relative text-lg whitespace-nowrap">{getYesText()}</span>
            </motion.button>

            {/* No button - Below Yes (initial state only) */}
            {noCount === 0 && (
              <motion.button
                onClick={handleNoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 select-none"
              >
                {getNoText()}
              </motion.button>
            )}
          </div>

          {/* Decorative cherries bottom */}
          <motion.img
            src="./assets/deco_cherries.png"
            className="absolute -bottom-2 -left-4 w-10 h-10 opacity-70"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity }}
            alt=""
          />
        </div>
      </motion.div>

      {/* Floating No Button - Teleported to Body */}
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
          <span>{getNoText()}</span>
          <span>{noCount > 5 ? "🏃‍♂️" : "😢"}</span>
        </motion.button>,
        document.body
      )}

    </div>
  );
};

export default ProposalCard;
