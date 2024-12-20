import React from 'react'
import StatCard from './StatCard';

type ResultProps = {
  minScore: number;
  maxScore: number;
  scoreRatio: number;
  correctAnswer: number;
  percentage: number;
  lengthOfQuestion: number;
};

const Result = ({ correctAnswer, percentage, lengthOfQuestion }: ResultProps) => {
  const Restart = () => {
    window.location.reload()
  };
  return (
    <div className="lg:w-[50%] md:w-[80%] w-[90%] h-[300px] gap-5 flex justify-between items-center flex-col">
      <h2 className='my-5 text-[20px] md:text-[25px] font-[600px]'> QUIZ   HAS   BEEN COMPLETED ! </h2>

      <StatCard label='Correct Answer' value={correctAnswer} />
      <StatCard label="Wrong Answer" value={lengthOfQuestion - correctAnswer} />
      <StatCard label="Score" value={percentage} />
      <button onClick={Restart} className="bg-gray-700 hover:bg-gray-600 text-white px-9 py-1 rounded-md">
        Restart
      </button>
    </div>

  )
}

export default Result