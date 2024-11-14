import React, { useState } from 'react';
import Quiz from './quzi'; // Popup22 import

const ParentComponent = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenQuiz}>퀴즈 열기</button>
      {isQuizOpen && <Quiz onClose={handleCloseQuiz} />}
    </div>
  );
};

export default ParentComponent;
