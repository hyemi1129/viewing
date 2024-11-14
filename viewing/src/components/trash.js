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
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

const Trash = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);
    const [prevScore, setPrevScore] = useState(0);

    const handleClick = async (type) => {
        setSelectedOption(type);

        const result = await trashDivision(type);

        setTimeout(() => {
            if (result && result.score > prevScore) {
                setPrevScore(result.score);
                setShowPopup6(true);  // 정답일 경우 Popup6 표시
            } else if (result && result.score <= prevScore) {
                setPrevScore(result.score);
                setShowPopup4(true);  // 오답일 경우 Popup4 표시
            }
        });
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
