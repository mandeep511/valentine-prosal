import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NO_PHRASES, YES_PHRASES } from '../constants';
import { Position } from '../types';
import { Heart } from 'lucide-react';

interface ProposalCardProps {
  onYes: () => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Initialize window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveButton = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Heuristic button size
    const btnWidth = 160; 
    const btnHeight = 60; 
    const padding = 20;

    // Calculate safe area
    const maxX = width - btnWidth - padding;
    const maxY = height - btnHeight - padding;

    const newX = Math.random() * (Math.max(0, maxX - padding)) + padding;
    const newY = Math.random() * (Math.max(0, maxY - padding)) + padding;

    setNoButtonPos({ x: newX, y: newY });
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Stop propagation to prevent firing on underlying elements if any
    e.stopPropagation();
    setNoCount(prev => prev + 1);
    moveButton();
  };

  const getNoText = () => NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  const getYesText = () => YES_PHRASES[Math.min(noCount, YES_PHRASES.length - 1)];

  // Yes button scale logic - limited growth
  const yesScale = Math.min(1 + (noCount * 0.05), 1.15); 

  return (
    <div className="relative w-full max-w-md mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="bg-white/95 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 relative overflow-hidden min-h-[500px] flex flex-col items-center"
      >
        {/* Decorative background elements inside the card */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-300 to-pink-300" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 flex flex-col items-center w-full h-full flex-grow">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-4 drop-shadow-sm select-none"
          >
            💝
          </motion.div>

          <div className="space-y-1 text-center mb-6">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-800 leading-tight">
              Will you be my Valentine?
            </h2>
            <div className="inline-block relative pt-2">
              <p className="text-3xl md:text-4xl font-cursive text-pink-600 transform -rotate-2">
                Minakshi
              </p>
            </div>
          </div>

          <motion.div
            className="w-full flex justify-center mb-8 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-1">
               <img 
                 src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3LvMWF1NW96M3F0NzM3dWY4aJrsecI1DjI5/l0HlUlsQxPiqM2BG8/giphy.gif"
                 alt="Cute cat asking" 
                 className="w-full h-full object-cover pointer-events-none"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <motion.div 
              className="absolute -bottom-4 -right-2 text-4xl select-none"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌹
            </motion.div>
          </motion.div>

          {/* Action Area */}
          <div className="flex flex-row items-center justify-center gap-4 w-full mt-auto mb-8 relative z-20 min-h-[60px]">
            {/* Yes Button */}
            <motion.button
              onClick={onYes}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale + 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200/50 flex items-center gap-2 z-20 relative overflow-hidden group select-none"
              style={{ touchAction: 'manipulation' }}
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Heart className="w-5 h-5 fill-white/90 animate-pulse" />
              <span className="relative text-lg whitespace-nowrap">{getYesText()}</span>
            </motion.button>

            {/* Placeholder for No Button to prevent layout shift */}
            {noCount > 0 && <div className="w-[120px] h-[48px]" />}

            {/* Static No Button (Initial State) */}
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
          
          {/* Persistent Nagging Message */}
          <AnimatePresence>
            {noCount > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 text-center w-full px-4"
              >
                <p className="text-sm md:text-base font-medium text-pink-500 animate-pulse">
                   {noCount > 5 ? "Say yes already! 🥺" : "Why are you doing this? 😭"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

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
            className="fixed top-0 left-0 z-[9999] bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 px-6 rounded-full shadow-xl border border-gray-200 whitespace-nowrap select-none"
            style={{ touchAction: 'manipulation' }}
        >
             {getNoText()}
             <span className="ml-2">{noCount > 5 ? "🏃‍♂️" : "😢"}</span>
        </motion.button>,
        document.body
      )}

    </div>
  );
};

export default ProposalCard;
