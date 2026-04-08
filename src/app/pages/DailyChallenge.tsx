import { motion } from 'motion/react';
import { Calendar, Trophy, Target, Star, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router';

export function DailyChallenge() {
  const navigate = useNavigate();

  const challenges = [
    {
      id: 1,
      title: '中国省会城市大考验',
      description: '测试你对中国各省省会的了解',
      difficulty: 2,
      reward: 50,
      completed: true,
      region: 'beijing',
    },
    {
      id: 2,
      title: '长江流域地理知识',
      description: '探索中国最长河流的奥秘',
      difficulty: 3,
      reward: 100,
      completed: false,
      region: 'shanghai',
    },
    {
      id: 3,
      title: '气候类型辨识',
      description: '学习不同地区的气候特征',
      difficulty: 4,
      reward: 150,
      completed: false,
      region: 'guangdong',
    },
  ];

  const weekProgress = [
    { day: '一', completed: true },
    { day: '二', completed: true },
    { day: '三', completed: true },
    { day: '四', completed: false },
    { day: '五', completed: false },
    { day: '六', completed: false },
    { day: '日', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl mb-2 text-[#4A90E2] flex items-center gap-2">
            🎯 每日挑战
          </h1>
          <p className="text-gray-600">每天完成挑战，获取丰厚奖励</p>
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6 bg-gradient-to-br from-white to-purple-50">
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4A90E2]" />
              本周进度
            </h3>
            <div className="flex justify-between gap-2">
              {weekProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex-1 text-center"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      day.completed
                        ? 'bg-gradient-to-br from-[#4A90E2] to-[#50C878]'
                        : 'bg-gray-200'
                    }`}
                  >
                    {day.completed ? (
                      <Star className="w-6 h-6 text-white fill-white" />
                    ) : (
                      <span className="text-gray-400 text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">{day.day}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">已完成 3/7 天</span>
              <span className="text-[#4A90E2] font-medium">连续 3 天 🔥</span>
            </div>
          </Card>
        </motion.div>

        {/* Today's Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl mb-3 flex items-center gap-2 text-gray-700">
            <Target className="w-5 h-5 text-[#F5A623]" />
            今日挑战
          </h2>
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`p-4 ${
                    challenge.completed
                      ? 'bg-gray-50 opacity-75'
                      : 'bg-white hover:shadow-lg transition-shadow cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!challenge.completed) {
                      navigate(`/quiz/${challenge.region}`);
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                        challenge.completed
                          ? 'bg-gray-300'
                          : 'bg-gradient-to-br from-[#4A90E2] to-[#50C878]'
                      }`}
                    >
                      {challenge.completed ? (
                        <Star className="w-7 h-7 text-white fill-white" />
                      ) : (
                        <Target className="w-7 h-7 text-white" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        {challenge.completed && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            已完成
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-[#E3F2FD] text-[#4A90E2]">
                          难度 {challenge.difficulty}
                        </span>
                        <span className="text-xs text-[#F5A623] font-medium flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {challenge.reward} 经验
                        </span>
                      </div>
                    </div>

                    {!challenge.completed && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <h3 className="mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F5A623]" />
              本周奖励预览
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-1">🎁</div>
                <div className="text-sm text-gray-600">完成3天</div>
                <div className="text-xs text-[#4A90E2] font-medium">+50经验</div>
              </div>
              <div className="text-center opacity-50">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-sm text-gray-600">完成5天</div>
                <div className="text-xs text-gray-500">+100经验</div>
              </div>
              <div className="text-center opacity-50">
                <div className="text-2xl mb-1">👑</div>
                <div className="text-sm text-gray-600">完成7天</div>
                <div className="text-xs text-gray-500">+200经验</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/profile')}
          >
            返回个人中心
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
