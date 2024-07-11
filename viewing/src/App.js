import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pad from './components/pad';
import Text from './components/text';
import Popup from './components/popup';
import Explain from './components/explain';
import Explain2 from './components/explain2';
import TrashSelect from './components/trashselect';

const AppContent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <Pad onOpenPopup={togglePopup} />
      <Text />
      {isPopupOpen && <Popup onClose={togglePopup} />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/explain2" element={<Explain2 />} />
        <Route path="/trashselect" element={<TrashSelect />} />
      </Routes>
    </Router>
  );
}

export default App;
