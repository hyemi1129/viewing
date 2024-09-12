import React, { useState, useEffect } from 'react';
import './popup2.css';
import { BarLoader } from 'react-spinners';
import Popup4 from './popup4';

const Popup21 = ({ onClose }) => {
  const [showPopup3, setShowPopup4] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup4(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClosePopup4 = () => {
    setShowPopup4(false);
    onClose();
  };

  if (showPopup3) {
    return <Popup4 onClose={handleClosePopup4} />;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="loader-wrapper">
          <BarLoader
            width={200}
            height={20}
            color="#007BFF"
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

export default Popup21;
