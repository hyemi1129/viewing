import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './popup3.css';
import coin from './coin.png';

const Popup3 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 자동 점수 업데이트 요청 보내기
    const updateAutoScore = async () => {
      try {
        await axios.post('/auto-value', {
          autoValues: true // 요청 데이터
        });
      } catch (error) {
        console.error('자동 점수 업데이트 오류:', error);
      }
    };

    updateAutoScore();
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/mypage');
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
