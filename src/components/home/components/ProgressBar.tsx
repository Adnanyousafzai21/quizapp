import React from 'react'

type ProgressBarProps = {
  minScore: number;
  maxScore: number;
  scoreRatio: number;
};

const ProgressBar = ({ minScore, maxScore, scoreRatio }: ProgressBarProps) => {


  return (
    <div className="w-full flex justify-center items-center">
      <div className='w-[80%]'>
        <div className="flex justify-between font-[700]">
          <h2 className="text font text"> Score : {minScore}%</h2>
          <h2 className='text font text'>Max Score : {maxScore}%</h2>
        </div>

        <div className={`rounded-md w-[100%] mx-auto border-2 h-[28px] overflow-hidden relative`} >
          <div className="bg-[#000000] absolute z-50  h-full" style={{ width: `${minScore}%` }}></div>
          <div className={`bg-[#717171] absolute z-40  h-full`} style={{ width: `${scoreRatio}%` }}></div>
          <div className={`bg-[#D2D2D2] absolute z-30 h-full`} style={{ width: `${maxScore}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
