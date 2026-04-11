import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { ChevronLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getQuestionsByRegion, getRegionById } from '../data/mockData';
import { Question, QuizAnswer } from '../types';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

export default function Quiz() {
  const navigate = useNavigate();
  const { regionId } = useParams();
  const [searchParams] = useSearchParams();
  const mapType = (searchParams.get('mapType') as 'china' | 'world') || 'china';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const region = regionId ? getRegionById(regionId, mapType) : null;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    if (regionId) {
      const regionQuestions = getQuestionsByRegion(regionId);
      setQuestions(regionQuestions);
    }
  }, [regionId]);

  const handleSelectAnswer = (answerId: string) => {
    if (!showResult) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      correct: isCorrect,
      timeTaken,
    };

    setAnswers(prev => [...prev, newAnswer]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to summary
      navigate(`/summary/${regionId}?mapType=${mapType}`, {
        state: { answers, totalTime: Math.floor((Date.now() - startTime) / 1000) },
      });
    } else {
      // Next question
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    }
  };

  if (!region || !currentQuestion) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
  const isCorrect = showResult && selectedAnswer === currentQuestion.correctAnswer;
  const isWrong = showResult && selectedAnswer !== currentQuestion.correctAnswer;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2>{region.name}</h2>
            <p className="text-sm text-gray-500">
              第 {currentIndex + 1}/{questions.length} 题
            </p>
          </div>
          {/* Timer */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{Math.floor((Date.now() - questionStartTime) / 1000)}s</span>
          </div>
        </div>

        {/* Progress */}
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Question */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center font-bold">
                  {currentIndex + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#E3F2FD] text-[#4A90E2]">
                      难度 {currentQuestion.difficulty}
                    </span>
                  </div>
                  <p className="text-lg">{currentQuestion.question}</p>
                </div>
              </div>

              {/* Question Image (if any) */}
              {currentQuestion.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={currentQuestion.image}
                    alt="题目图片"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrectOption = option.id === currentQuestion.correctAnswer;
                
                let optionStyle = 'bg-white border-2 border-gray-200 hover:border-[#4A90E2]';
                
                if (showResult) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-[#50C878] border-[#50C878] text-white';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'bg-[#EF4444] border-[#EF4444] text-white';
                  } else {
                    optionStyle = 'bg-gray-100 border-gray-200';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-[#E3F2FD] border-[#4A90E2]';
                }

                return (
                  <motion.button
                    key={option.id}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl transition-all ${optionStyle} ${
                      showResult ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showResult && isCorrectOption
                          ? 'bg-white text-[#50C878]'
                          : showResult && isSelected && !isCorrectOption
                          ? 'bg-white text-[#EF4444]'
                          : showResult
                          ? 'bg-gray-300 text-gray-600'
                          : isSelected
                          ? 'bg-[#4A90E2] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {option.id.toUpperCase()}
                      </div>
                      <span className="flex-1 text-left">{option.text}</span>
                      {showResult && isCorrectOption && (
                        <span className="text-2xl">✓</span>
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <span className="text-2xl">✗</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`rounded-2xl p-6 ${
                    isCorrect
                      ? 'bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]'
                      : 'bg-gradient-to-br from-[#FFEBEE] to-[#FFCDD2]'
                  }`}
                >
                  {/* Result Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`text-4xl ${isCorrect ? 'animate-bounce' : 'animate-pulse'}`}>
                      {isCorrect ? '🎉' : '💡'}
                    </div>
                    <div className="flex-1">
                      <h3 className={isCorrect ? 'text-[#2E7D32]' : 'text-[#C62828]'}>
                        {isCorrect ? '回答正确！' : '回答错误'}
                      </h3>
                      {isCorrect ? (
                        <p className="text-sm text-[#558B2F]">城小探为你点赞！继续加油~</p>
                      ) : (
                        <p className="text-sm text-[#C62828]">别灰心，城小探陪你一起学习！</p>
                      )}
                    </div>
                    {isCorrect && (
                      <div className="text-2xl">⭐+10</div>
                    )}
                  </div>

                  {/* Explanation */}
                  <div className="space-y-3">
                    <div className="bg-white/80 rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <span>📖</span>
                        <span>知识解析</span>
                      </h4>
                      <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
                    </div>

                    {/* Fun Fact */}
                    {currentQuestion.funFact && (
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <span>💡</span>
                          <span>趣味小知识</span>
                        </h4>
                        <p className="text-sm text-gray-700">{currentQuestion.funFact}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t px-4 py-4">
        {!showResult ? (
          <Button
            className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            提交答案
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowResult(false)}
            >
              再看一遍
            </Button>
            <Button
              className="flex-1 bg-[#4A90E2] hover:bg-[#3A7BC8]"
              onClick={handleNext}
            >
              {isLastQuestion ? '查看成绩' : '下一题'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
