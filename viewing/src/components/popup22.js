import React, { useState, useEffect } from 'react';
import './popup2.css';
import { BarLoader } from 'react-spinners';
import Popup5 from './popup5'; // Ensure Popup5 is correctly imported

const Popup22 = ({ onClose }) => {
  const [showPopup5, setShowPopup5] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup5(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup5 = () => {
    setShowPopup5(false);
    onClose();
  };

  if (showPopup5) {
    return <Popup5 onClose={handleClosePopup5} />;
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

export default Popup22;
