import { motion } from 'motion/react';
import guideImg1 from '../../imports/1.jpg';
import guideImg2 from '../../imports/2.jpg';
import guideImg3 from '../../imports/3.jpg';
import { useState, useEffect } from 'react';

interface GuideIntroProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
}

const guideImages = [guideImg1, guideImg2, guideImg3];

export function GuideIntro({ message, onClose, autoClose = true }: GuideIntroProps) {
  const [randomImage] = useState(() => guideImages[Math.floor(Math.random() * guideImages.length)]);

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-2xl shadow-2xl p-6 mb-6 overflow-hidden border-2 border-[#4A90E2]"
    >
      <div className="flex items-start gap-4">
        {/* 城小探头像 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#4A90E2] shadow-lg bg-white">
            <img
              src={randomImage}
              alt="城小探"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 名字标签 */}
          <div className="mt-2 text-center">
            <div className="inline-block bg-[#4A90E2] text-white px-3 py-1 rounded-full text-xs font-medium">
              城小探
            </div>
          </div>
        </motion.div>

        {/* 对话气泡 */}
        <div className="flex-1 relative">
          {/* 气泡尖角 */}
          <div className="absolute -left-3 top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#E3F2FD]" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#E3F2FD] rounded-2xl p-4 relative"
          >
            <p className="text-gray-800 leading-relaxed">
              {message}
            </p>

            {/* 可爱的装饰元素 */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              ✨
            </motion.div>
          </motion.div>

          {/* 关闭按钮 */}
          {onClose && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
            >
              ✕
            </motion.button>
          )}
        </div>
      </div>

      {/* 波浪装饰 */}
      <div className="mt-4 flex justify-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-[#4A90E2] rounded-full opacity-50"
          />
        ))}
      </div>
    </motion.div>
  );
}
