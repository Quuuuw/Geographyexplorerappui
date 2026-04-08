import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { Trophy, Target, Clock, Star, Home, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { getRegionById } from '../data/mockData';
import { QuizAnswer } from '../types';

export function QuizResult() {
  const navigate = useNavigate();
  const { regionId } = useParams();
  const location = useLocation();
  const { answers, totalTime } = location.state as { answers: QuizAnswer[]; totalTime: number };

  const region = regionId ? getRegionById(regionId) : null;
  const correctCount = answers.filter(a => a.correct).length;
  const totalQuestions = answers.length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const score = correctCount * 10;

  // Calculate stars (1-5)
  const stars = accuracy >= 90 ? 5 : accuracy >= 80 ? 4 : accuracy >= 70 ? 3 : accuracy >= 60 ? 2 : 1;

  // Motivational message based on performance
  const getMessage = () => {
    if (accuracy >= 90) return { text: '太棒了！你是地理大师！', emoji: '🎉' };
    if (accuracy >= 80) return { text: '优秀！继续保持！', emoji: '🌟' };
    if (accuracy >= 70) return { text: '不错！再接再厉！', emoji: '👍' };
    if (accuracy >= 60) return { text: '及格了！继续加油！', emoji: '💪' };
    return { text: '需要再努力哦！', emoji: '📚' };
  };

  const message = getMessage();

  // Fire confetti for good performance
  useEffect(() => {
    if (accuracy >= 80) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4A90E2', '#50C878', '#F5A623'],
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4A90E2', '#50C878', '#F5A623'],
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [accuracy]);

  if (!region) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA]">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA] p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header with Trophy */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 mb-4 shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl mb-2"
          >
            挑战完成！
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600"
          >
            {region.name} - {message.text} {message.emoji}
          </motion.p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-8 mb-6 bg-gradient-to-br from-white to-blue-50 shadow-xl">
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                >
                  <Star
                    className={`w-10 h-10 ${
                      i <= stars
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Main Score */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="text-6xl font-bold text-[#4A90E2] mb-2"
              >
                {score}
              </motion.div>
              <p className="text-gray-600">总得分</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
              >
                <Target className="w-6 h-6 mx-auto mb-2 text-[#4A90E2]" />
                <div className="text-2xl font-bold text-[#4A90E2] mb-1">
                  {correctCount}/{totalQuestions}
                </div>
                <div className="text-xs text-gray-600">答对题目</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
              >
                <Trophy className="w-6 h-6 mx-auto mb-2 text-[#50C878]" />
                <div className="text-2xl font-bold text-[#50C878] mb-1">{accuracy}%</div>
                <div className="text-xs text-gray-600">正确率</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
              >
                <Clock className="w-6 h-6 mx-auto mb-2 text-[#F5A623]" />
                <div className="text-2xl font-bold text-[#F5A623] mb-1">
                  {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-600">用时</div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Card className="p-6 mb-6">
            <h3 className="mb-4 flex items-center gap-2">
              <span>📊</span>
              答题详情
            </h3>
            <div className="space-y-3">
              {answers.map((answer, index) => (
                <motion.div
                  key={answer.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        answer.correct
                          ? 'bg-[#50C878] text-white'
                          : 'bg-[#EF4444] text-white'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm">
                      {answer.correct ? '回答正确' : '回答错误'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {answer.timeTaken}s
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="space-y-3"
        >
          <Button
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#50C878] hover:opacity-90 h-12"
            onClick={() => navigate(`/quiz/${regionId}`)}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            再来一局
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5 mr-2" />
              返回地图
            </Button>
            <Button
              variant="outline"
              className="h-12"
              onClick={() => {
                // Share functionality
                alert('分享功能开发中...');
              }}
            >
              <Share2 className="w-5 h-5 mr-2" />
              分享成绩
            </Button>
          </div>
        </motion.div>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            {accuracy >= 80
              ? '太棒了！继续挑战其他地区吧！'
              : '多练习几次，你一定能做得更好！'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
