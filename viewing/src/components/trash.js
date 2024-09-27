import React, { useState } from 'react';
import './trash.css'; // CSS 파일을 import 합니다.
import Popup22 from './popup22'; // Popup2 컴포넌트를 import 합니다.

// 서버에 쓰레기 종류를 전송하는 함수
const trashDivision = async (trashType) => {
    try {
        const response = await fetch('https://1e0f-39-113-58-6.ngrok-free.app/label', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trash: trashType })
        });
        if (response.ok) {
            console.log('Trash type submitted successfully.');
        } else {
            console.error('Failed to submit trash type:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const Trash = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // 버튼 클릭 시 호출되는 핸들러
    const handleClick = async (type) => {
        setSelectedOption(type); // 선택된 버튼 업데이트
        console.log(`${type} 버튼 클릭됨`);
        await trashDivision(type); // 서버에 쓰레기 종류 제출
        setShowPopup(true); // 팝업 열기
    };

    
    const handleClosePopup = () => {
        setShowPopup(false); // 팝업 닫기
    };

    return (
        <div style={{ paddingLeft: '150px', marginTop: '40px' }}>
            <h1 style={{ fontSize: '60px' }}>
                분리수거 할 <span className='blue'>쓰레기의 종류</span>를<br /> 선택해주세요
            </h1>
            
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap', 
                gap: '60px', 
                marginTop: '40px' 
            }}>
                {['플라스틱', '비닐', '캔', '일반쓰레기'].map((label, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <button 
                            className={`button ${selectedOption === label ? 'selected' : ''}`} // 선택된 버튼 강조
                            onClick={() => handleClick(label)}
                        >
                            {label}
                        </button>
                        <div style={{ 
                            marginTop: '30px', 
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color: 'black' 
                        }}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && <Popup22 onClose={handleClosePopup} />}
        </div>
    );
};

export default Trash;
