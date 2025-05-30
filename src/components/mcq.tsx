"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { RadioGroup } from "@/components/ui/radio-group";
import { MCQOption } from "./mcq-option";

const questionsData = [
  {
    id: 1,
    question: "What is the normal pH range of human blood?",
    options: ["7.0-7.2", "7.35-7.45", "7.5-7.8", "8.0-8.5"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which organ produces insulin?",
    options: ["Liver", "Pancreas", "Kidney", "Stomach"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest bone in the human body?",
    options: ["Tibia", "Fibula", "Femur", "Humerus"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Which part of the brain controls balance and coordination?",
    options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is the normal resting heart rate for adults?",
    options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which blood cells are responsible for clotting?",
    options: [
      "Red blood cells",
      "White blood cells",
      "Platelets",
      "Plasma cells",
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "What is the functional unit of the kidney?",
    options: ["Nephron", "Glomerulus", "Tubule", "Capsule"],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "Which vitamin is essential for blood clotting?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correctAnswer: 3,
  },
  {
    id: 9,
    question: "What is the normal body temperature in Celsius?",
    options: ["35°C", "36°C", "37°C", "38°C"],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "Which muscle type is found in the heart?",
    options: [
      "Skeletal muscle",
      "Smooth muscle",
      "Cardiac muscle",
      "Voluntary muscle",
    ],
    correctAnswer: 2,
  },
];
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]; // to avoid mutating the original array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const MCQExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showRevealAnswer, setShowRevealAnswer] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(() =>
    shuffleArray([...questionsData])
  );

  const handleAnswerSelect = (answerIndex: number) => {
    // Prevent selection if answer is revealed
    if (revealedAnswer) return;
    // If correct answer was already selected, prevent switching
    if (showResult && isCorrectAnswer) return;

    // If this is a new selection or switching from wrong answer
    if (!showResult || selectedAnswer !== answerIndex) {
      // If switching from a correct answer to new selection, decrease score
      if (showResult && isCorrectAnswer) {
        setScore(score - 1);
      }

      setSelectedAnswer(answerIndex);
      setShowResult(true);

      const isCorrect =
        answerIndex === questions[currentQuestion].correctAnswer;

      // Add to score only if this is the first correct selection
      if (isCorrect && (!showResult || !isCorrectAnswer)) {
        setScore(score + 1);
      }

      if (!isCorrect) {
        setShowRevealAnswer(true);
      } else {
        setShowRevealAnswer(false);
        setRevealedAnswer(false);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowRevealAnswer(false);
      setRevealedAnswer(false);
    }
  };

  const handleRevealAnswer = () => {
    setRevealedAnswer(true);
    setRevealedAnswer(true);
  };

  const isCorrectAnswer =
    selectedAnswer === questions[currentQuestion].correctAnswer;
  const isNextDisabled = selectedAnswer === null;

  return (
    <div className="min-h-screen bg-slate-100 p-3 pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto">
        {/* Question Card */}
        <Card className="mb-6 shadow-none">
          <CardContent className="px-6 md:px-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Q. {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <RadioGroup className="space-y-2 mb-10">
              {questions[currentQuestion].options.map((option, index) => (
                <MCQOption
                  key={index}
                  id={`option-${currentQuestion}-${index}`}
                  option={option}
                  index={index}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={questions[currentQuestion].correctAnswer}
                  showResult={showResult}
                  revealedAnswer={revealedAnswer}
                  handleAnswerSelect={handleAnswerSelect}
                  isCorrectAnswer={isCorrectAnswer}
                />
              ))}
            </RadioGroup>

            {/* Result Message */}
            <div className="mb-6 min-h-10">
              {showResult && (
                <div>
                  {isCorrectAnswer ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        Correct answer! Keep it up...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <XCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        Wrong Answer. Try again...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={handleNextQuestion}
                disabled={
                  isNextDisabled || currentQuestion === questions.length - 1
                }
                className="flex items-center gap-2 rounded-full cursor-pointer"
                variant="outline"
              >
                Next Question
              </Button>
              {showRevealAnswer && !revealedAnswer && (
                <Button
                  variant="outline"
                  onClick={handleRevealAnswer}
                  className="flex items-center gap-2 rounded-full cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  Reveal Answer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completion Message */}
        {currentQuestion === questions.length - 1 && showResult && (
          <Card className="mt-6 shadow-sm border-green-200">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Quiz Completed!
                </h3>
                <p className="text-slate-600">
                  You scored {score} out of {questions.length} questions
                  correctly.
                </p>
                <p className="text-lg font-semibold text-slate-800 mt-2">
                  Accuracy: {Math.round((score / questions.length) * 100)}%
                </p>
              </div>
              {currentQuestion === questions.length - 1 && showResult && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setShowRevealAnswer(false);
                    setRevealedAnswer(false);
                    setScore(0);
                    setQuestions(() => shuffleArray([...questionsData]));
                  }}
                >
                  Restart Quiz
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MCQExam;
