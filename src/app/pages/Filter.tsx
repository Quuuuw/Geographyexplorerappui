import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { FilterOptions, DIFFICULTY_LABELS, SCHOOL_STAGE_LABELS, SchoolStage, AgeRange, DifficultyLevel } from '../types';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Slider } from '../components/ui/slider';

export default function Filter() {
  const [filters, setFilters] = useState<FilterOptions>({
    mapType: 'china',
    regions: [],
    schoolStage: [],
    ageRange: [],
    difficulty: 2,
  });

  const chinaRegions = ['北京', '上海', '广东', '四川', '新疆', '黑龙江', '西藏', '云南'];
  const worldRegions = ['美国', '英国', '法国', '日本', '澳大利亚', '巴西'];

  const schoolStages: SchoolStage[] = ['primary', 'middle', 'high', 'general'];
  const ageRanges: AgeRange[] = ['6-9', '10-12', '13-15', '16+'];

  const handleReset = () => {
    setFilters({
      mapType: 'china',
      regions: [],
      schoolStage: [],
      ageRange: [],
      difficulty: 2,
    });
  };

  const handleApply = () => {
    // In a real app, this would update global state or context
    alert('筛选条件已应用！');
  };

  const toggleRegion = (region: string) => {
    setFilters(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region],
    }));
  };

  const toggleSchoolStage = (stage: SchoolStage) => {
    setFilters(prev => ({
      ...prev,
      schoolStage: prev.schoolStage.includes(stage)
        ? prev.schoolStage.filter(s => s !== stage)
        : [...prev.schoolStage, stage],
    }));
  };

  const toggleAgeRange = (range: AgeRange) => {
    setFilters(prev => ({
      ...prev,
      ageRange: prev.ageRange.includes(range)
        ? prev.ageRange.filter(r => r !== range)
        : [...prev.ageRange, range],
    }));
  };

  const currentRegions = filters.mapType === 'china' ? chinaRegions : worldRegions;

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <h1>⚙️ 筛选条件</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-500"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            重置
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Map Type */}
        <Card className="p-4 space-y-3">
          <h3 className="text-sm">🗺️ 地图类型</h3>
          <div className="flex gap-2">
            <Button
              variant={filters.mapType === 'china' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setFilters(prev => ({ ...prev, mapType: 'china', regions: [] }))}
            >
              中国
            </Button>
            <Button
              variant={filters.mapType === 'world' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setFilters(prev => ({ ...prev, mapType: 'world', regions: [] }))}
            >
              世界
            </Button>
          </div>
        </Card>

        {/* Region Selection */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">📍 地区选择</h3>
            <span className="text-xs text-gray-500">
              已选 {filters.regions.length} 个
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentRegions.map(region => (
              <motion.button
                key={region}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleRegion(region)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filters.regions.includes(region)
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region}
                {filters.regions.includes(region) && (
                  <X className="inline w-3 h-3 ml-1" />
                )}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* School Stage */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">🎓 学校阶段</h3>
            <span className="text-xs text-gray-500">
              已选 {filters.schoolStage.length} 个
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {schoolStages.map(stage => (
              <motion.button
                key={stage}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSchoolStage(stage)}
                className={`px-4 py-3 rounded-lg text-sm transition-all ${
                  filters.schoolStage.includes(stage)
                    ? 'bg-[#50C878] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#50C878]'
                }`}
              >
                {SCHOOL_STAGE_LABELS[stage]}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Age Range */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">👶 年龄范围</h3>
            <span className="text-xs text-gray-500">
              已选 {filters.ageRange.length} 个
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ageRanges.map(range => (
              <motion.button
                key={range}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleAgeRange(range)}
                className={`px-4 py-3 rounded-lg text-sm transition-all ${
                  filters.ageRange.includes(range)
                    ? 'bg-[#F5A623] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#F5A623]'
                }`}
              >
                {range} 岁
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Difficulty Level */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">⭐ 难度等级</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">当前难度:</span>
              <span className="px-2 py-1 rounded-full bg-[#4A90E2] text-white text-xs font-medium">
                {DIFFICULTY_LABELS[filters.difficulty as DifficultyLevel]}
              </span>
            </div>
          </div>

          {/* Difficulty Slider */}
          <div className="space-y-4">
            <Slider
              value={[filters.difficulty]}
              onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value[0] as DifficultyLevel }))}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            
            {/* Difficulty Labels */}
            <div className="flex justify-between text-xs text-gray-500">
              {([1, 2, 3, 4, 5] as DifficultyLevel[]).map(level => (
                <div
                  key={level}
                  className={`flex flex-col items-center transition-all ${
                    filters.difficulty === level ? 'text-[#4A90E2] font-medium scale-110' : ''
                  }`}
                >
                  <div className="mb-1">
                    {level === 1 && '🌱'}
                    {level === 2 && '📚'}
                    {level === 3 && '🎯'}
                    {level === 4 && '🚀'}
                    {level === 5 && '👑'}
                  </div>
                  <span>{DIFFICULTY_LABELS[level]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Description */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              {filters.difficulty === 1 && '适合初学者，题目简单易懂'}
              {filters.difficulty === 2 && '基础知识，适合小学生'}
              {filters.difficulty === 3 && '进阶内容，适合初中生'}
              {filters.difficulty === 4 && '具有挑战性，适合高中生'}
              {filters.difficulty === 5 && '专家级难度，需要深厚的地理知识'}
            </p>
          </div>
        </Card>

        {/* Preview Summary */}
        <Card className="p-4 space-y-2 bg-gradient-to-br from-[#E3F2FD] to-[#F5F7FA] border-[#4A90E2]">
          <h3 className="text-sm">📋 当前筛选</h3>
          <div className="space-y-1 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">地图:</span>
              <span className="font-medium">{filters.mapType === 'china' ? '中国' : '世界'}</span>
            </div>
            {filters.regions.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">地区:</span>
                <span className="font-medium">{filters.regions.join(', ')}</span>
              </div>
            )}
            {filters.schoolStage.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">阶段:</span>
                <span className="font-medium">
                  {filters.schoolStage.map(s => SCHOOL_STAGE_LABELS[s]).join(', ')}
                </span>
              </div>
            )}
            {filters.ageRange.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">年龄:</span>
                <span className="font-medium">{filters.ageRange.join(', ')} 岁</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-gray-500">难度:</span>
              <span className="font-medium">{DIFFICULTY_LABELS[filters.difficulty as DifficultyLevel]}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t px-4 py-4 space-y-2">
        <Button
          className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]"
          onClick={handleApply}
        >
          确认应用
        </Button>
      </div>
    </div>
  );
}
