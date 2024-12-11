import { useState, useEffect } from 'react';
import questions from '../../../data/questions.json'

interface QuestionInterface {
  question: string;
  options: string[];
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  correct_answer: string;
  incorrect_answers: string[];
}

const useQuiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionInterface[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [scoreRatio, setScoreRatio] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [minScore, setMinScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);
    const shuffled: QuestionInterface[] = questions.map((item) => {
      const decodedQuestion = decodeURIComponent(item.question)
      const allOptions = [...item.incorrect_answers, item.correct_answer];
      const decodedOptions = allOptions.map(decodeURIComponent);
      const shuffledOptions = shuffleArray(decodedOptions);
      const difficulty = (
        item.difficulty === 'hard' ||
        item.difficulty === 'easy' ||
        item.difficulty === 'medium') ? item.difficulty : 'easy'
      return { ...item, question: decodedQuestion, options: shuffledOptions, difficulty };
    });
    setShuffledQuestions(shuffled);
  }, []);

  const handleNext = () => {
    setAnswer('')
    setDisabled(false);
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < shuffledQuestions.length - 1) {
        return prevIndex + 1;
      } else {
        setShowResult(true);
        return prevIndex;
      }
    })
    const remainingQuestions = shuffledQuestions.length - currentQuestionIndex - 1;
    setScoreRatio(Math.round((correctAnswer / (currentQuestionIndex + 1)) * 100));
    setMaxScore(Math.round(((correctAnswer + remainingQuestions) / shuffledQuestions.length) * 100));
    setMinScore(Math.round((correctAnswer / shuffledQuestions.length) * 100));
  }

  const handleAnswer = (option: string) => {
    setDisabled(true);
    setSelectedAnswer(option);
    const correctAnswerDecoded = decodeURIComponent(shuffledQuestions[currentQuestionIndex].correct_answer);
    if (correctAnswerDecoded === option) {
      setAnswer('correct');
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setAnswer('Sorry!');
    }

  };

  return {
    shuffledQuestions,
    currentQuestion: shuffledQuestions[currentQuestionIndex],
    currentQuestionIndex,
    handleNext,
    handleAnswer,
    answer,
    disabled,
    selectedAnswer,
    showResult,
    correctAnswer,
    minScore,
    maxScore,
    scoreRatio,
  };
};

export default useQuiz;
