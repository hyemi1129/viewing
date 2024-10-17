import React, { useRef, useEffect } from 'react';
import './popup.css';
import Select from './select';

const Popup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const sendOptionToBackend = async (option) => {
    try {
      const response = await fetch('/auto-signal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'auto-signal': option }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }
      console.log('Option sent successfully');
    } catch (error) {
      console.error('Error sending option:', error);
    }
  };

  const handleSelectClick = (option) => {
    sendOptionToBackend('manual'); // '수동'을 영어로 전송
    window.location.href = `/explain?option=${option}`;
  };

  const handleSelectClick2 = (option) => {
    sendOptionToBackend('automatic'); // '자동'을 영어로 전송
    window.location.href = `/explain2?option=${option}`;
  };

  return (
    <div className="popup-overlay">
      <div ref={popupRef} className="popup-content">
        <div className="popup-box">
          <div className="text-content">
            원하는 <span className="highlight">분리수거</span> 방법을 선택해주세요
          </div>
          <br />
          <div className="select-container">
            <div onClick={() => handleSelectClick('수동')}>
              <Select text="     수동" />
            </div>
            <div onClick={() => handleSelectClick2('자동')}>
              <Select text="     자동" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
