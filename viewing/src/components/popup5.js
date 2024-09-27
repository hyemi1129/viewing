import React from 'react';
import { useNavigate } from 'react-router-dom';
import './popup3.css';
import check from './check.png';

const Popup5 = ({ onClose }) => {
  const navigate = useNavigate();

  // 돌아가기 버튼 클릭 시 홈 페이지로 이동
  const handleGoBack = () => {
    navigate('/'); // 홈 페이지로 이동
  };

  // 다음으로 버튼 클릭 시 MyPage 페이지로 이동
  const handleNext = () => {
    navigate('/mypage'); // MyPage 페이지로 이동
  };

  // 팝업 외부 클릭 시 팝업 닫기
  const handleOverlayClick = (e) => {
    if (e.target.className === 'popup-overlay') {
      onClose(); // 팝업 닫기
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <div className="text-content">
        <img src={check} alt="check" style={{ margin: '19px auto', display: 'block', width: '70px', height: 'auto' }} />

          정답입니다
          <p style={{ fontSize: '15px', fontWeight: 'normal', color: 'gray' }}>
            +200캐시<br />캐시를 획득했어요
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

export default Popup5;
