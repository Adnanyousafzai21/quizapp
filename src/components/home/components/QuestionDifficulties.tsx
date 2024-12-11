import React from 'react';

type QuestionDifficultiesProps = {
  difficulty: 'easy' | 'medium' | 'hard';
}

type starImagesProps = {
  easy: string[];
  medium: string[];
  hard: string[];
}

const starImages: starImagesProps = {
  easy: ["/images/star.png", "/images/outlined star.png", "/images/outlined star.png"],
  medium: ["/images/star.png", "/images/star.png", "/images/outlined star.png"],
  hard: ["/images/star.png", "/images/star.png", "/images/star.png"]
};

const QuestionDifficulties = ({ difficulty }: QuestionDifficultiesProps) => {

  const stars = starImages[difficulty];

  return (
    stars ? (
      <div className="flex gap-2 items-center justify-center">
        {stars.map((src: string, index: number) => (
          <img key={index} src={src} alt={`star ${index}`} className="w-[15px] h-[15px]" />
        ))}
      </div>
    ) : null
  );
};

export default QuestionDifficulties;

