import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pad from './components/pad';
import Text from './components/text';
import Popup from './components/popup'; // Popup import 추가
import Explain from './components/explain';
import Explain2 from './components/explain2';
import Trash from './components/trash';
import Popup2 from './components/popup2';
import Popup21 from './components/popup21';
import Popup22 from './components/popup22';
import Popup3 from './components/popup3';
import Mypage from './components/mypage';

const AppContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 상태 추가

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Pad onOpenPopup={openPopup} />
      <Text />
      {isPopupOpen && <Popup onClose={closePopup} />} {/* Popup 표시 */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="pad" element={<Pad />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/explain2" element={<Explain2 />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/popup2" element={<Popup2 />} />
        <Route path="/popup21" element={<Popup21 />} />
        <Route path="/popup22" element={<Popup22 />} />
        <Route path="/popup3" element={<Popup3 />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </Router>
  );
}

export default App;