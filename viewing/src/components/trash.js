import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './trash.css';
import Popup4 from './popup4';
import Popup6 from './popup6';
import plastic from './plastic.png';
import vinyl from './vinyl.png';
import can from './can.png';
import trash from './trash.png';

const trashDivision = async (trashType) => {
    try {
        const response = await fetch('http://10.150.150.181:8080/label', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trash: trashType })
        });
        const result = await response.json();
        return result; // 서버에서 반환되는 데이터가 포함된 result 객체를 반환
    } catch (error) {
        console.error('Error:', error);
    }
};

const Trash = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);

    const handleClick = async (type) => {
        const typeMapping = {
            '플라스틱': 'plastic',
            '비닐': 'vinyl',
            '캔': 'can',
            '일반쓰레기': 'general'
        };
        const trashType = typeMapping[type];
    
        // 함수형 업데이트로 현재 값을 바로 반영
        setSelectedOption(type);
        await trashDivision(type); // 상태가 변경된 이후 작업
    
        console.log(`Button clicked: ${type}, Sending trash type: ${trashType}`);
    
        try {
            const result = await trashDivision(type);
    
            console.log('Server Response:', result);
    
            if (result) {
                if (result.result === 'Right') {
                    setShowPopup6(true);
                } else if (result.result === 'Wrong') {
                    setShowPopup4(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    const handleClosePopup4 = () => {
        setShowPopup4(false);
    };

    const handleClosePopup6 = () => {
        setShowPopup6(false);
    };

    return (
        <div>
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
                                className={`button ${selectedOption === item.label ? 'selected' : ''}`}
                                onClick={() => handleClick(item.label)}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    style={{
                                        width: '100px',
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

                {showPopup6 && <Popup6 onClose={handleClosePopup6} />}
                {showPopup4 && <Popup4 onClose={handleClosePopup4} />}
            </div>
        </div>
    );
};

export default Trash;
