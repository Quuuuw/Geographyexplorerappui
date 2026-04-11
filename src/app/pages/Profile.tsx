import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { mockUserProfile, cities } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronRight, Trophy, Target, Flame, Clock, Settings, MapPin, Calendar } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const user = mockUserProfile;

  const stats = [
    { icon: Target, label: '总答题数', value: user.totalQuestions, color: '#4A90E2' },
    { icon: Trophy, label: '正确率', value: `${user.accuracy}%`, color: '#50C878' },
    { icon: Flame, label: '连续天数', value: `${user.consecutiveDays}天`, color: '#F5A623' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4A90E2] to-[#3A7BC8] text-white px-4 pt-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">个人中心</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg"
          >
            {user.avatar}
          </motion.div>
          <div className="flex-1">
            <h2 className="text-white mb-1">{user.nickname}</h2>
            <p className="text-white/80 text-sm">继续加油，跟城小探探索更多城市！</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-12 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center shadow-lg">
                <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3>🏆 成就徽章</h3>
            <span className="text-xs text-gray-500">
              {user.achievements.filter(a => a.unlocked).length}/{user.achievements.length}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {user.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-3 rounded-lg text-center transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]'
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium line-clamp-1">{achievement.name}</div>
                
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* 城市足迹 */}
      <div className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3>🗺️ 我的城市足迹</h3>
            <span className="text-xs text-gray-500">
              {user.cityFootprints.length}/{cities.length}个城市
            </span>
          </div>

          {user.cityFootprints.length > 0 ? (
            <div className="space-y-3">
              {user.cityFootprints.map((footprint, index) => {
                const city = cities.find(c => c.id === footprint.cityId);
                if (!city) return null;

                return (
                  <motion.div
                    key={footprint.cityId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      {/* 城市图标 */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
                        style={{ backgroundColor: `${city.color}20` }}
                      >
                        {city.icon}
                      </div>

                      {/* 城市信息 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{footprint.cityName}</h4>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${city.color}20`,
                              color: city.color,
                            }}
                          >
                            {footprint.completionRate}%
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(footprint.visitedAt).toLocaleDateString('zh-CN')}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {footprint.regionCount}/{footprint.totalRegions}个区域
                          </div>
                        </div>

                        {/* 进度条 */}
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${footprint.completionRate}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: city.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🧭</div>
              <p className="text-gray-500 text-sm mb-4">还没有城市足迹</p>
              <Button
                size="sm"
                onClick={() => navigate('/')}
                className="bg-[#4A90E2]"
              >
                开始探索
              </Button>
            </div>
          )}

          {/* 城市预览 */}
          {user.cityFootprints.length > 0 && user.cityFootprints.length < cities.length && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">待探索的城市</p>
              <div className="flex flex-wrap gap-2">
                {cities
                  .filter(city => !user.cityFootprints.some(f => f.cityId === city.id))
                  .slice(0, 6)
                  .map((city, index) => (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-xs"
                    >
                      <span>{city.icon}</span>
                      <span className="text-gray-600">{city.name}</span>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3>📚 最近学习</h3>
            <button className="text-xs text-[#4A90E2]">查看全部</button>
          </div>
          
          <div className="space-y-3">
            {[
              { region: '北京', date: '今天 14:30', score: 95, stars: 3 },
              { region: '上海', date: '昨天 16:20', score: 87, stars: 2 },
              { region: '广东', date: '2天前', score: 92, stars: 3 },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium mb-1">{activity.region}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {activity.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#4A90E2] mb-1">{activity.score}分</div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => (
                      <span key={i} className="text-xs">
                        {i <= activity.stars ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 pb-6">
        <Card className="divide-y">
          {[
            { icon: '📊', label: '学习统计', badge: null, action: null },
            { icon: '🎯', label: '每日挑战', badge: 'NEW', action: () => navigate('/daily-challenge') },
            { icon: '📖', label: '知识卡片', badge: null, action: null },
            { icon: '👥', label: '排行榜', badge: null, action: null },
            { icon: '⚙️', label: '设置', badge: null, action: null },
          ].map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={item.action || (() => {})}
              className="flex items-center gap-3 p-4 w-full hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-[#F5A623] text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          ))}
        </Card>
      </div>
    </div>
  );
}