import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pad from './components/pad';
import Text from './components/text';
import Popup from './components/popup';
import Explain from './components/explain';
import Explain2 from './components/explain2';
import Trash from './components/trash';
import Popup3 from './components/popup3';
import Popup6 from './components/popup6';
import Mypage from './components/mypage';
import Quiz from './components/quiz'; // Quiz 컴포넌트 추가

const AppContent = ({ nickname, onNicknameReceived }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Pad onOpenPopup={openPopup} onNicknameReceived={onNicknameReceived} />
      <Text />
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

function App() {
  const [nickname, setNickname] = useState(''); // nickname 상태 추가

  const handleNicknameReceived = (receivedNickname) => {
    setNickname(receivedNickname);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent nickname={nickname} onNicknameReceived={handleNicknameReceived} />} />
        <Route path="/pad" element={<Pad />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/explain2" element={<Explain2 />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/popup3" element={<Popup3 />} />
        <Route path="/mypage" element={<Mypage nickname={nickname} />} />
        <Route path="/popup6" element={<Popup6 />} />
        <Route path="/quiz" element={<Quiz />} /> {/* Quiz 컴포넌트 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
