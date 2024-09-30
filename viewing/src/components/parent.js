import React, { useState } from 'react';
import Popup22 from './popup22'; // Popup22 import

const ParentComponent = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>팝업 열기</button>
      {isPopupVisible && <Popup22 onClose={handleClosePopup} />} {/* onClose prop 전달 */}
    </div>
  );
};

export default ParentComponent;
