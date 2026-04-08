import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Compass, Map, Globe2 } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#4A90E2] via-[#50C878] to-[#F5A623] flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Globe Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
          className="relative inline-block mb-8"
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-32 h-32 border-4 border-white/30 rounded-full"
          />
          
          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 w-28 h-28 border-4 border-white/50 rounded-full"
          />

          {/* Center globe */}
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <Globe2 className="w-16 h-16 text-[#4A90E2]" />
          </div>

          {/* Floating icons */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              x: [-10, 10, -10],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
          >
            <Compass className="w-6 h-6 text-[#F5A623]" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              x: [10, -10, 10],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg"
          >
            <Map className="w-6 h-6 text-[#50C878]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-white mb-3"
        >
          地理探险家
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl text-white/90 mb-8"
        >
          探索世界，学习地理
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
