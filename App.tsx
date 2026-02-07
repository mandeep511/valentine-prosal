import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingBackground from './components/FloatingBackground';
import ProposalCard from './components/ProposalCard';
import SuccessView from './components/SuccessView';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fff0f5] selection:bg-pink-200 selection:text-pink-900 overflow-hidden">
      
      {/* Dynamic Background */}
      <FloatingBackground />

      <main className="relative w-full max-w-4xl mx-auto px-4 z-10">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <ProposalCard onYes={() => setAccepted(true)} />
            </motion.div>
          ) : (
            <SuccessView key="success" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Credit (Optional aesthetic touch) */}
      <div className="fixed bottom-4 left-0 right-0 text-center pointer-events-none opacity-40 text-xs font-serif text-pink-900">
        Made with ❤️
      </div>
    </div>
  );
};

export default App;
