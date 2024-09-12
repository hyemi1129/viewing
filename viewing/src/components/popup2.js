import React, { useState, useEffect } from 'react';
import './popup2.css'; // 스타일시트 import
import { BarLoader } from 'react-spinners'; // BarLoader import
import Popup3 from './popup3'; // Popup3 컴포넌트 import

const Popup2 = ({ onClose }) => {
  const [showPopup3, setShowPopup3] = useState(false);

  useEffect(() => {
    // 5초 후에 Popup3으로 전환
    const timer = setTimeout(() => {
      setShowPopup3(true); // Popup3 표시
    }, 5000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, []);

  const handleClosePopup3 = () => {
    setShowPopup3(false);
    onClose(); // Popup2 닫기
  };

  if (showPopup3) {
    return <Popup3 onClose={handleClosePopup3} />;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="loader-wrapper">
          <BarLoader
            width={200} // 로더의 길이 조정
            height={20} // 로더의 두께 조정
            color="#007BFF" // 로더의 바 색상
          />
        </div>
        <div className="text-content">
          <div style={{ fontWeight: 'normal', fontSize: '20px' }}>
          분리수거중...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
