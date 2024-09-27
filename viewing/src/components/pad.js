import React, { useState } from 'react';
import './pad.css';

function Pad({ onOpenPopup }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handleButtonClick = (value) => {
        if (phoneNumber.length === 3 || phoneNumber.length === 8) {
            setPhoneNumber(phoneNumber + '-' + value);
        } else if (phoneNumber.length < 13) {
            setPhoneNumber(phoneNumber + value);
        }
    };

    const handleDelete = () => {
        setPhoneNumber(phoneNumber.slice(0, -1));
    };

    const isPhoneNumberValid = phoneNumber.length === 13;

    const handleConfirm = async () => {
        if (isPhoneNumberValid) {
            try {
                const response = await fetch('https://1e0f-39-113-58-6.ngrok-free.app/submit-phone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phoneNumber }),
                });
                if (response.ok) {
                    const data = await response.json();
                    const lastFourDigits = phoneNumber.slice(-4); // 마지막 4자리 추출
                    console.log('Phone number submitted successfully', data.nickname);
                    onOpenPopup(data.nickname, lastFourDigits); // 닉네임과 마지막 4자리를 팝업에 전달
                } else {
                    const errorData = await response.json();
                    console.error('Failed to submit phone number', errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    

    const lineLength = 438 * 0.8; // 가로선의 길이 (80%)
    const lineYPosition = 160; // 가로선의 Y 위치 (원하는 위치로 설정)

    return (
        <div className="pad">
            <svg width="438" height="612" viewBox="0 0 438 612" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_524_48)">
                    <rect x="10" y="6" width="418" height="592" rx="50" fill="white" />
                </g>
                <line 
                    x1={(438 - lineLength) / 2} 
                    y1={lineYPosition} 
                    x2={(438 + lineLength) / 2} 
                    y2={lineYPosition} 
                    stroke="lightgray" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                />
                <foreignObject x="10" y="20" width="418" height="460">
                    <div className="phone-number-display">{phoneNumber}</div>
                    <div className="keypad">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '←'].map((key) => (
                            <button
                                key={key}
                                className="keypad-button"
                                onClick={() => key === '←' ? handleDelete() : key && handleButtonClick(key)}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </foreignObject>
                <foreignObject x="10" y="480" width="418" height="100">
                    <div className="button-container">
                        <button className="my-button" onClick={handleConfirm} disabled={!isPhoneNumberValid}>확인</button>
                    </div>
                </foreignObject>
                <defs>
                    <filter id="filter0_d_524_48" x="0" y="0" width="438" height="612" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_524_48" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_524_48" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

export default Pad;