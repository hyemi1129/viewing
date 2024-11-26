import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz.css';

const Quiz2 = () => {
  const [messageType, setMessageType] = useState(null);
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target.className === 'quiz-overlay') {
      setMessageType(null); // 화면 클릭 시 메시지 숨기기
    }
  };

  const handleGeneralTrashClick = () => {
    setMessageType('correct');
  };

  const handleOtherTrashClick = () => {
    setMessageType('incorrect');
  };

  const handleRankingButtonClick = () => {
    navigate('/mypage'); // "랭킹으로" 버튼 클릭 시 Mypage.js로 이동
  };

  return (
    <div className="quiz-overlay" onClick={handleOverlayClick}>
      <div className="quiz-content">
        <h3 style={{ fontSize: '1.5rem' }}>
          다 먹은 과자 봉지!<br />
          어디에 버리는 게 좋을까?
        </h3>
        <p style={{ color: 'gray' }}>추가 마일리지 20점을 획득할 수 있어요</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button style={buttonStyle} onClick={handleGeneralTrashClick}>일반쓰레기</Button>
          <Button style={buttonStyle} onClick={handleOtherTrashClick}>비닐</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button style={buttonStyle} onClick={handleOtherTrashClick}>종이</Button>
          <Button style={buttonStyle} onClick={handleOtherTrashClick}>플라스틱</Button>
        </div>

        {messageType && (
          <div style={messageStyle}>
            <span style={{ fontSize: '50px', color: 'white', fontWeight: 'bold' }}>
              {messageType === 'correct' ? '맞췄어요!' : '틀렸어요!'}
            </span>
            <p style={{ fontSize: '20px', color: 'white' }}>
              {messageType === 'correct' ? '+20캐시' : '다시 시도해보세요!'}
            </p>
            <p style={{ fontSize: '25px', color: 'white', fontWeight: 'bold' }}>
              비닐 재질의 과자 봉지는<br />
              재활용이 불가능하므로<br />
              <span style={{ color: '#007bff' }}>일반쓰레기</span>로 배출해야 합니다.
            </p>
            <Button style={rankingButtonStyle} onClick={handleRankingButtonClick}>랭킹으로</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  flex: 1,
  margin: '0 10px',
  padding: '30px',
  fontSize: '18px',
  backgroundColor: 'transparent',
  color: 'black',
  border: '2px solid #007bff',
  borderRadius: '20px',
  cursor: 'pointer',
  minWidth: '250px',
  fontWeight: 'bold',
};

const messageStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 1000,
};

const rankingButtonStyle = {
  marginTop: '20px',
  padding: '15px 30px',
  fontSize: '20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const Button = ({ style, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...style,
        backgroundColor: isHovered ? '#007bff' : style.backgroundColor,
        color: isHovered ? 'white' : style.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Quiz2;
