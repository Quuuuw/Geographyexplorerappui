import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Lock, TrendingUp, Info, Route } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { mockRegions, exploreRoutes } from "../data/mockData";
import { Region } from "../types";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function MapExplore() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const filteredRegions = mockRegions.filter((region) =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegionClick = (region: Region) => {
    if (region.isUnlocked) {
      setSelectedRegion(region);
    }
  };

  const handleStartQuiz = () => {
    if (selectedRegion) {
      navigate(`/quiz/${selectedRegion.id}`);
      setSelectedRegion(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-4">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-[#4A90E2] flex items-center gap-2">
                🗺️ 上海城市探索
              </h1>
              <p className="text-sm text-gray-600 mt-1">发现魔都的历史与现代之美</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-full p-3 shadow-md cursor-pointer"
            >
              <Info className="w-5 h-5 text-[#4A90E2]" />
            </motion.div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索地区..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-md border-none focus:ring-2 focus:ring-[#4A90E2] outline-none"
            />
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6 relative overflow-hidden"
          style={{ minHeight: "500px" }}
        >
          {/* Map Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50" />
            {/* Grid pattern */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A90E2" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* China Map Illustration */}
          <div className="relative h-[450px]">
            {/* Animated background waves */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-96 h-96 bg-gradient-to-br from-[#4A90E2]/20 to-[#50C878]/20 rounded-full blur-3xl" />
            </motion.div>

            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
              {/* Simplified China map outline with more detail */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8F4F8" />
                  <stop offset="100%" stopColor="#C8E6F5" />
                </linearGradient>
                <filter id="dropShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
                  <feOffset dx="0" dy="1" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main China outline */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 15,38 L 18,32 L 22,28 L 28,25 L 35,22 L 42,20 L 50,19 L 58,20 L 65,21 L 70,24 L 75,28 L 78,33 L 80,38 L 81,43 L 80,48 L 78,53 L 75,58 L 72,63 L 68,68 L 63,72 L 58,75 L 52,77 L 45,78 L 38,77 L 32,75 L 27,72 L 23,68 L 20,63 L 18,58 L 16,52 L 15,45 Z"
                fill="url(#mapGradient)"
                stroke="#4A90E2"
                strokeWidth="0.8"
                filter="url(#dropShadow)"
              />

              {/* Decorative coastal lines */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.5 }}
                d="M 68,68 Q 75,65 78,60"
                stroke="#4A90E2"
                strokeWidth="0.3"
                fill="none"
                strokeDasharray="2,1"
              />
            </svg>

            {/* Region Markers */}
            <AnimatePresence>
              {filteredRegions.map((region, index) => {
                const isHovered = hoveredRegion === region.id;
                
                return (
                  <motion.div
                    key={region.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ scale: region.isUnlocked ? 1.15 : 1 }}
                    whileTap={{ scale: region.isUnlocked ? 0.95 : 1 }}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handleRegionClick(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <div
                      className={`relative flex flex-col items-center transition-all duration-300 ${
                        region.isUnlocked ? "" : "opacity-50"
                      }`}
                    >
                      {/* Pulse animation for unlocked regions */}
                      {region.isUnlocked && !isHovered && (
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                          className="absolute inset-0 w-12 h-12 rounded-full"
                          style={{
                            background: region.completion >= 80
                              ? 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0) 70%)'
                              : region.completion >= 50
                              ? 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(34,197,94,0) 70%)'
                              : 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)',
                          }}
                        />
                      )}

                      {/* Marker */}
                      <motion.div
                        animate={isHovered ? { y: -5 } : { y: 0 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 ${
                          region.isUnlocked
                            ? region.completion >= 80
                              ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                              : region.completion >= 50
                              ? "bg-gradient-to-br from-green-400 to-blue-400"
                              : "bg-gradient-to-br from-blue-400 to-purple-400"
                            : "bg-gray-300"
                        }`}
                      >
                        {region.isUnlocked ? (
                          <MapPin className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-white" />
                        )}
                      </motion.div>

                      {/* Region Name */}
                      <AnimatePresence>
                        {(isHovered || searchQuery) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs whitespace-nowrap font-medium"
                          >
                            {region.name}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Completion Badge */}
                      {region.isUnlocked && region.completion > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg z-20"
                        >
                          {region.completion}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-white">
            <div className="text-2xl font-bold text-[#4A90E2] mb-1">
              {mockRegions.filter(r => r.isUnlocked).length}
            </div>
            <div className="text-xs text-gray-600">已解锁地区</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-white">
            <div className="text-2xl font-bold text-[#50C878] mb-1">
              {mockRegions.filter(r => r.completion === 100).length}
            </div>
            <div className="text-xs text-gray-600">已完成地区</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-white">
            <div className="text-2xl font-bold text-[#F5A623] mb-1">
              {Math.round(
                mockRegions.reduce((sum, r) => sum + r.completion, 0) / mockRegions.length
              )}%
            </div>
            <div className="text-xs text-gray-600">总体进度</div>
          </Card>
        </motion.div>

        {/* Recommended Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl mb-3 flex items-center gap-2 text-gray-700">
            <TrendingUp className="w-5 h-5 text-[#F5A623]" />
            推荐任务
          </h2>
          <div className="grid gap-3">
            {mockRegions
              .filter((r) => r.isUnlocked && r.completion < 100)
              .slice(0, 3)
              .map((region, index) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card
                    className="p-4 bg-white hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-[#4A90E2]/30"
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{region.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{region.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${region.completion}%` }}
                              transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#50C878]"
                            />
                          </div>
                          <span className="text-sm text-gray-600 font-medium min-w-[3rem] text-right">
                            {region.completion}%
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/quiz/${region.id}`);
                        }}
                        className="bg-[#4A90E2] hover:bg-[#3A7BC8] ml-4"
                      >
                        继续学习
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Explore Routes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <h2 className="text-xl mb-3 flex items-center gap-2 text-gray-700">
            <Route className="w-5 h-5 text-[#4A90E2]" />
            探索路线
          </h2>
          <div className="grid gap-3">
            {exploreRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Card
                  className="p-4 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-[#4A90E2]/50"
                  onClick={() => navigate('/explore-routes')}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
                      style={{ backgroundColor: `${route.color}20` }}
                    >
                      {route.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{route.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{route.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {route.regions.length} 个站点
                        </span>
                        <span>•</span>
                        <span>{route.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/explore-routes');
                      }}
                    >
                      查看详情
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Region Detail Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#50C878] flex items-center justify-center shadow-xl"
                >
                  <MapPin className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-2xl mb-2">{selectedRegion.name}</h2>
                <p className="text-gray-600 mb-4">{selectedRegion.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-50 rounded-xl p-3"
                  >
                    <div className="text-2xl font-bold text-[#4A90E2]">
                      {selectedRegion.completion}%
                    </div>
                    <div className="text-sm text-gray-600">完成度</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-50 rounded-xl p-3"
                  >
                    <div className="text-2xl font-bold text-[#50C878]">
                      {selectedRegion.correctAnswers}/{selectedRegion.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600">答对题目</div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setSelectedRegion(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleStartQuiz}
                    className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#50C878] hover:opacity-90"
                  >
                    开始挑战
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}