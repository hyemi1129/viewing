import React, { useState } from 'react';
import './trash.css'; // CSS 파일을 import 합니다.
import Popup22 from './popup22'; // Popup22 컴포넌트를 import 합니다.
import plastic from './plastic.png';
import vinyl from './vinyl.png';
import can from './can.png';
import trash from './trash.png'; // 일반쓰레기 이미지

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
                {[
                    { label: '플라스틱', image: plastic },
                    { label: '비닐', image: vinyl },
                    { label: '캔', image: can },
                    { label: '일반쓰레기', image: trash }
                ].map((item, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <button 
                            className={`button ${selectedOption === item.label ? 'selected' : ''}`} // 선택된 버튼 강조
                            onClick={() => handleClick(item.label)}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <img 
                                src={item.image} 
                                alt={item.label} 
                                style={{ 
                                    width: item.label === '일반쓰레기' ? '100px' : '100px', // 일반쓰레기만 크기 다르게 설정
                                    height: item.label === '일반쓰레기' ? '120px' : '100px', 
                                    marginBottom: '10px' 
                                }}
                            />
                        </button>
                        <div style={{ 
                            marginTop: '10px', 
                            fontSize: '18px', 
                            color: 'black' 
                        }}>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && <Popup22 onClose={handleClosePopup} />}
        </div>
    );
};

export default Trash;
