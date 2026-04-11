import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { cities } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, MapPin, TrendingUp } from 'lucide-react';

export function CitySelector() {
  const navigate = useNavigate();

  const handleCitySelect = (cityId: string) => {
    // 可以在这里保存选中的城市到状态管理或localStorage
    localStorage.setItem('selectedCity', cityId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回
          </Button>

          <h1 className="text-3xl mb-2 text-[#4A90E2] flex items-center gap-2">
            🌏 选择探索城市
          </h1>
          <p className="text-gray-600">
            每座城市都有独特的故事，跟城小探一起开启探索之旅吧！
          </p>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:scale-105"
                onClick={() => handleCitySelect(city.id)}
              >
                {/* City Header */}
                <div
                  className="p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${city.color}20 0%, ${city.color}40 100%)`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-6xl mb-3"
                  >
                    {city.icon}
                  </motion.div>
                  <h2
                    className="text-2xl mb-2"
                    style={{ color: city.color }}
                  >
                    {city.name}
                  </h2>
                  <p className="text-sm text-gray-600">{city.description}</p>
                </div>

                {/* City Stats */}
                <div className="p-6 bg-white">
                  <div className="space-y-3">
                    {/* 区域数量 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        探索区域
                      </div>
                      <span className="font-medium">{city.regionCount}个</span>
                    </div>

                    {/* 完成度 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          完成进度
                        </div>
                        <span
                          className="font-medium"
                          style={{ color: city.color }}
                        >
                          {city.completionRate}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${city.completionRate}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: city.color }}
                        />
                      </div>
                    </div>

                    {/* 访问状态 */}
                    <div className="pt-3">
                      {city.visited ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <span>✓</span>
                          <span>已探索</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>🎯</span>
                          <span>待探索</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 bg-gray-50 border-t">
                  <Button
                    className="w-full"
                    style={{ backgroundColor: city.color }}
                  >
                    {city.visited ? '继续探索' : '开始探索'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">城小探温馨提示</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  每座城市都有丰富的历史文化和独特魅力！建议从感兴趣的城市开始，
                  系统地完成各个区域的探索。不同城市之间可以随时切换，
                  你的学习进度都会被完整保存。探索越多，收获越多哦~ ✨
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
