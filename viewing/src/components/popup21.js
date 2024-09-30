import React, { useState } from 'react';
import Popup4 from './popup4'; // Popup6 import

const Popup21 = ({ onClose }) => {
  const [showPopup4, setShowPopup4] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 상태

  const handleAnswerClick = (answer) => {
    if (answer === '종이') {
      setIsCorrect(true);
      setShowPopup4(true); // 정답 맞추면 Popup6으로 전환
    } else {
      setIsCorrect(false);
      // 정답이 아닐 경우 별도의 동작 없음
    }
  };

  const handleClosePopup4 = () => {
    setShowPopup4(false);
    onClose(); // 부모 컴포넌트의 onClose 호출
  };

  if (showPopup4) {
    return <Popup4 onClose={handleClosePopup4} />; // Popup6로 전환
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '5px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div style={{ fontWeight: 'normal', fontSize: '20px', textAlign: 'center' }}>
          <p>택배상자는 어디에 버려야 할까요?</p>
          <div>
            {['종이', '일반쓰레기', '플라스틱', '비닐', '캔'].map((answer) => (
              <button
                key={answer}
                style={buttonStyle}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
          {isCorrect === false && <p style={{ color: 'red' }}>틀렸습니다. 다시 시도해주세요!</p>}
        </div>
      </div>
    </div>
  );
};

export default Popup21;
