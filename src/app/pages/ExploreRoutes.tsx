import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MapPin, Clock, Star, ChevronRight, Navigation } from 'lucide-react';
import { exploreRoutes, mockRegions } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { GuideIntro } from '../components/GuideIntro';
import { useState } from 'react';

export function ExploreRoutes() {
  const navigate = useNavigate();
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  const getRouteProgress = (routeId: string) => {
    const route = exploreRoutes.find(r => r.id === routeId);
    if (!route) return 0;
    
    const regions = mockRegions.filter(r => route.regions.includes(r.id));
    const totalCompletion = regions.reduce((sum, r) => sum + r.completion, 0);
    return Math.round(totalCompletion / regions.length);
  };

  const getDifficultyLabel = (level: number) => {
    switch(level) {
      case 1: return { text: '轻松', color: '#50C878' };
      case 2: return { text: '适中', color: '#4A90E2' };
      case 3: return { text: '挑战', color: '#F5A623' };
      default: return { text: '适中', color: '#4A90E2' };
    }
  };

  const startRoute = (routeId: string) => {
    const route = exploreRoutes.find(r => r.id === routeId);
    if (!route) return;
    
    // 导航到路线的第一个区域
    const firstRegionId = route.regions[0];
    const firstRegion = mockRegions.find(r => r.id === firstRegionId);
    if (firstRegion?.isUnlocked) {
      navigate(`/quiz/${firstRegionId}`);
    }
  };

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
            🗺️ 精选探索路线
          </h1>
          <p className="text-gray-600">
            跟城小探一起，系统性地探索各个城市的历史文化与现代魅力
          </p>
        </motion.div>

        {/* Routes List */}
        <div className="space-y-6">
          {exploreRoutes.map((route, index) => {
            const progress = getRouteProgress(route.id);
            const difficultyInfo = getDifficultyLabel(route.difficulty);
            const regions = mockRegions.filter(r => route.regions.includes(r.id));
            const allUnlocked = regions.every(r => r.isUnlocked);

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden bg-white shadow-xl">
                  {/* 城小探介绍 */}
                  <AnimatePresence>
                    {expandedRouteId === route.id && route.guideIntro && (
                      <div className="p-6 pb-0">
                        <GuideIntro
                          message={route.guideIntro}
                          onClose={() => setExpandedRouteId(null)}
                          autoClose={false}
                        />
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Route Header */}
                  <div
                    className="p-6 bg-gradient-to-r"
                    style={{
                      background: `linear-gradient(135deg, ${route.color}15 0%, ${route.color}30 100%)`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                          style={{ backgroundColor: `${route.color}20` }}
                        >
                          {route.icon}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl mb-2">{route.name}</h2>
                          <p className="text-gray-600 text-sm mb-3">
                            {route.description}
                          </p>
                          
                          {/* Route Meta */}
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{route.duration}</span>
                            </div>
                            <div
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${difficultyInfo.color}20`,
                                color: difficultyInfo.color,
                              }}
                            >
                              难度：{difficultyInfo.text}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{route.regions.length} 个站点</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">路线完成度</span>
                        <span className="font-medium" style={{ color: route.color }}>
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#F5A623]" />
                      路线亮点
                    </h3>
                    <div className="space-y-2">
                      {route.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + 0.4 + idx * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${route.color}20` }}
                          >
                            <span className="text-xs font-medium" style={{ color: route.color }}>
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 flex-1">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stations */}
                  <div className="p-6">
                    <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-[#4A90E2]" />
                      探索站点
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {regions.map((region, idx) => (
                        <motion.div
                          key={region.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.6 + idx * 0.1 }}
                        >
                          <Card
                            className={`p-3 cursor-pointer transition-all ${
                              region.isUnlocked
                                ? 'hover:shadow-md hover:border-[#4A90E2]/50'
                                : 'opacity-60'
                            }`}
                            onClick={() => {
                              if (region.isUnlocked) {
                                navigate(`/quiz/${region.id}`);
                              }
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  region.isUnlocked
                                    ? region.completion === 100
                                      ? 'bg-[#50C878]'
                                      : 'bg-[#4A90E2]'
                                    : 'bg-gray-300'
                                }`}
                              >
                                {region.isUnlocked ? (
                                  region.completion === 100 ? (
                                    <span className="text-white">✓</span>
                                  ) : (
                                    <MapPin className="w-4 h-4 text-white" />
                                  )
                                ) : (
                                  <span className="text-white">🔒</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {region.name}
                                </div>
                                {region.isUnlocked && (
                                  <div className="text-xs text-gray-500">
                                    {region.completion}% 完成
                                  </div>
                                )}
                              </div>
                            </div>
                            {region.landmark && (
                              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <span>🏛️</span>
                                <span className="truncate">{region.landmark}</span>
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 pt-0 space-y-3">
                    {/* 查看城小探介绍按钮 */}
                    {route.guideIntro && expandedRouteId !== route.id && (
                      <Button
                        variant="outline"
                        className="w-full h-12 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2]/10"
                        onClick={() => setExpandedRouteId(route.id)}
                      >
                        👋 听城小探介绍这条路线
                      </Button>
                    )}

                    {/* 开始探索按钮 */}
                    <Button
                      className="w-full h-12"
                      style={{
                        backgroundColor: route.color,
                      }}
                      onClick={() => startRoute(route.id)}
                      disabled={!allUnlocked}
                    >
                      {progress === 100 ? (
                        <>
                          <Star className="w-5 h-5 mr-2" />
                          重新探索此路线
                        </>
                      ) : progress > 0 ? (
                        <>
                          <Navigation className="w-5 h-5 mr-2" />
                          继续探索路线
                        </>
                      ) : (
                        <>
                          <ChevronRight className="w-5 h-5 mr-2" />
                          开始探索路线
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-1">探索小贴士</h3>
                <p className="text-xs text-gray-600">
                  建议按照路线顺序依次完成各个站点的学习，这样能更系统地了解城市的历史文化。
                  完成整条路线后，你将获得相应的成就徽章！城小探会一直陪伴你哦~
                </p>
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
            onClick={() => navigate('/')}
          >
            返回地图
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
