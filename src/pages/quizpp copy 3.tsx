
import React, { useEffect, useState } from 'react';
import questions from './../components/questions.json';  // Your JSON file with questions
import Progressbar from '@/components/Progressbar';  // Assuming you have this component
import ResultComponent from '@/components/ResultComponent';
import QuestionDefficulties from '@/components/QuestionDefficulties';

interface QuestionInterface { 
  question: string; 
  options: string[]; 
  category: string; 
  type: string; 
  difficulty: "easy" | "medium" | "hard"; 
  correct_answer: string; 
  incorrect_answers: string[]; 
}
const QuizApp = () => {
  
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionInterface[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [minScore, setMinScore] = useState<number>(0);
  const [scoreRatio, setScoreRatio] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")

  useEffect(() => {
    const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);
    const shuffled:QuestionInterface[] = questions.slice(0, 5).map((item) => {
      const decodedQuestion = decodeURIComponent(item.question);
      const allOptions = [...item.incorrect_answers, item.correct_answer];
      const decodedOptions = allOptions.map((option) => decodeURIComponent(option));
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
    setAnswer("");
    setDisabled(false);
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < shuffledQuestions.length - 1) {
        return prevIndex + 1;
      } else {
        setShowResult(true) // RESULT WILL BE SHOWEN WHEN IT BECOME TRUE
        return prevIndex;
      }
    })
    const remainingQuestions = shuffledQuestions.length - currentQuestionIndex - 1;
    setScoreRatio(Math.round((correctAnswer / (currentQuestionIndex + 1)) * 100));  // Score ratio 
    setMaxScore(Math.round(((correctAnswer + remainingQuestions) / shuffledQuestions.length) * 100));
    setMinScore(Math.round((correctAnswer / shuffledQuestions.length) * 100));
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const handleAnswer = (option: string) => {
    setDisabled(true);
    setSelectedAnswer(option)    
    if (decodeURIComponent(currentQuestion.correct_answer) === option) {
      setAnswer("correct");
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setAnswer("Sorry!");
    }
    
  };

  return (
    <div>
      <div className="w-full flex justify-center flex-col lg:h-screen min-h-screen items-center py-10">
        {(currentQuestion && !showResult) && (
          <div key={currentQuestionIndex} className="lg:w-[50%] md:w-[80%] w-[90%] h-screen flex justify-evenly items-start flex-col">
            <div className="flex justify-evenly items-start flex-col w-[100%] gap-5 ">
              <div className="flex justify-start gap-1 flex-col items-start">
                <h2 className="text-[25px] font-[700]">
                  Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
                </h2>
                <p className="text-[14px] font-[300] text-[#333333]">
                  Entertainment : Board Games
                </p>
                <div className="text-[16px] font-[400] text-[#333333]">
                  <QuestionDefficulties difficulty={currentQuestion.difficulty} />
                </div>
              </div>
              <h3 className="w-full font-bold text-[15px] md:text-[20px] break-words">{currentQuestion.question}</h3>
              <div className="w-full flex justify-center mt-4 flex-col items-center gap-5 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentQuestion.options?.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`rounded-md bg-gray-200 px-2 py-1 border-2 w-[200px] break-words hover:bg-slate-700 hover:text-white duration-600 ${selectedAnswer === option ? "bg-gray-700 text-white" : ""} ${disabled ? "cursor-not-allowed" : ""}`}
                      disabled={disabled}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-fol h-[100px]">
                  {answer && (
                    <div className="flex flex-col items-center justify-center gap-5">
                      <h2>{answer}</h2>

                      <button
                        onClick={handleNext}
                        className="rounded-md bg-gray-400 text-white px-4 py-2 hover:bg-slate-700 hover:text-white duration-600"
                      >
                        Next  Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Progressbar
              minScore={minScore} maxScore={maxScore} scoreRatio={scoreRatio}
            />
          </div>
        )}

        { showResult && <ResultComponent
            minScore={minScore} maxScore={maxScore} scoreRatio={scoreRatio} correctAnswer={correctAnswer} percentage={minScore} lengthOfQuestion={shuffledQuestions.length} />}
      </div>
    </div>
  );
};

export default QuizApp;
