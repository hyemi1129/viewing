import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import './popup3.css'; // 스타일시트 import
import coin from './coin.png';

const Popup3 = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 돌아가기 버튼 클릭 시 Pad 페이지로 이동
  const handleGoBack = () => {
    navigate('/'); // Pad 페이지로 이동
  };

  // 다음으로 버튼 클릭 시 MyPage 페이지로 이동
  const handleNext = () => {
    navigate('/mypage'); // MyPage 페이지로 이동
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="text-content">
        <img src={coin} alt="coin" style={{ margin: '19px auto', display: 'block', width: '70px', height: 'auto' }} />
          캐시 획득
          <p style={{ fontSize: '15px', fontWeight: 'normal', color: 'gray' }}>
            +100캐시<br />분리수거로 캐시를 획득했어요
          </p>
        </div>
        <div className="button-container">
          <button className="popup-button" onClick={handleGoBack}>돌아가기</button>
          <button className="popup-button" onClick={handleNext}>다음으로</button>
        </div>
      </div>
    </div>
  );
};

export default Popup3;
