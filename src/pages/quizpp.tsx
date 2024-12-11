import React from 'react';
import Progressbar from '@/components/Progressbar';
import ResultComponent from '@/components/ResultComponent';
import QuestionDefficulties from '@/components/QuestionDefficulties';
import useQuiz from '@/components/Usequiz';

const QuizApp = () => {
  const {
    shuffledQuestions,
    currentQuestion,
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
  } = useQuiz();
console.log("shufulled question",shuffledQuestions.length)
console.log("currentquestion ",currentQuestionIndex)
  return (
    <div>
      <div className="w-full flex justify-center flex-col lg:h-screen min-h-screen items-center py-10">
        {currentQuestion && !showResult && (
          <div key={currentQuestionIndex} className="lg:w-[50%] md:w-[80%] w-[90%] h-screen flex justify-evenly items-start flex-col">
            <div className="flex justify-evenly items-start flex-col w-[100%] gap-5">
              <div className="flex justify-start gap-1 flex-col items-start">
                <h2 className="text-[25px] font-[700]">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</h2>
                <p className="text-[14px] font-[300] text-[#333333]">Entertainment : Board Games</p>
                <div className="text-[16px] font-[400] text-[#333333]">
                  <QuestionDefficulties difficulty={currentQuestion.difficulty} />
                </div>
              </div>
              <h3 className="w-full font-bold text-[15px] md:text-[20px] break-words">{currentQuestion.question}</h3>
              <div className="w-full flex justify-center mt-4 flex-col items-center gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`rounded-md bg-gray-200 px-2 py-1 border-2 w-[200px] break-words duration-600 ${selectedAnswer === option ? 'bg-gray-700 text-white' : ''} ${disabled ? 'cursor-not-allowed hover:bg-none' : ' hover:bg-slate-700 hover:text-white'}`}
                      disabled={disabled}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col h-[100px]">
                  {answer && (
                    <div className="flex flex-col items-center justify-center gap-5">
                      <h2>{answer}</h2>
                      <button
                        onClick={handleNext}
                        className="rounded-md bg-gray-400 text-white px-4 py-2 hover:bg-slate-700 hover:text-white duration-600"
                      >
                        {(currentQuestionIndex==shuffledQuestions.length-1)?"Finish":" Next Question"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Progressbar minScore={minScore} maxScore={maxScore} scoreRatio={scoreRatio} />
          </div>
        )}

        {showResult && (
          <ResultComponent
            minScore={minScore}
            maxScore={maxScore}
            scoreRatio={scoreRatio}
            correctAnswer={correctAnswer}
            percentage={minScore}
            lengthOfQuestion={shuffledQuestions.length}
          />
        )}
      </div>
    </div>
  );
};

export default QuizApp;
