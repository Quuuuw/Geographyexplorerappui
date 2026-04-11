import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Star, Lock, CheckCircle, Circle } from "lucide-react";
import { mockRegions } from "../data/mockData";
import { Card } from "../components/ui/card";

export function LevelMap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl mb-2 text-[#4A90E2]">🎯 闯关答题</h1>
          <p className="text-gray-600">跟城小探一起，开启学习之旅</p>
        </motion.div>

        {/* Level Path */}
        <div className="relative">
          {/* Curved Path Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ height: `${mockRegions.length * 180}px` }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#50C878" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d={`M 50 0 Q 80 ${mockRegions.length * 90} 50 ${mockRegions.length * 180}`}
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>

          {/* Level Nodes */}
          <div className="relative space-y-8 pb-8">
            {mockRegions.map((region, index) => {
              const isLeft = index % 2 === 0;
              const stars = Math.floor((region.completion / 100) * 3);

              return (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <Card
                    className={`w-72 p-4 bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                      !region.isUnlocked ? "opacity-60" : ""
                    }`}
                    onClick={() => {
                      if (region.isUnlocked) {
                        navigate(`/quiz/${region.id}`);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Node Circle */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                          region.isUnlocked
                            ? region.completion === 100
                              ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                              : "bg-gradient-to-br from-[#4A90E2] to-[#50C878]"
                            : "bg-gray-300"
                        }`}
                      >
                        {region.isUnlocked ? (
                          region.completion === 100 ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : (
                            <Circle className="w-8 h-8 text-white" />
                          )
                        ) : (
                          <Lock className="w-8 h-8 text-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg">{region.name}</h3>
                          {region.isUnlocked && region.completion > 0 && (
                            <div className="flex items-center gap-1">
                              {[1, 2, 3].map((i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i <= stars
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{region.description}</p>

                        {/* Progress */}
                        {region.isUnlocked && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>
                                {region.correctAnswers}/{region.totalQuestions} 题
                              </span>
                              <span>{region.completion}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${region.completion}%` }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-[#4A90E2] to-[#50C878]"
                              />
                            </div>
                          </div>
                        )}

                        {!region.isUnlocked && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            完成前面的关卡解锁
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <Card className="p-4 bg-white text-center">
            <div className="text-2xl font-bold text-[#4A90E2]">
              {mockRegions.filter((r) => r.isUnlocked).length}
            </div>
            <div className="text-sm text-gray-600">已解锁</div>
          </Card>
          <Card className="p-4 bg-white text-center">
            <div className="text-2xl font-bold text-[#50C878]">
              {mockRegions.filter((r) => r.completion === 100).length}
            </div>
            <div className="text-sm text-gray-600">已完成</div>
          </Card>
          <Card className="p-4 bg-white text-center">
            <div className="text-2xl font-bold text-[#F5A623]">
              {Math.round(
                mockRegions.reduce((sum, r) => sum + r.completion, 0) / mockRegions.length
              )}
              %
            </div>
            <div className="text-sm text-gray-600">总进度</div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
