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

    return (
        <div className="pad">
            <svg width="438" height="612" viewBox="0 0 438 612" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_524_48)">
                    <rect x="10" y="6" width="418" height="592" rx="50" fill="white" />
                </g>
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
                        <button className="my-button" onClick={onOpenPopup} disabled={!isPhoneNumberValid}>확인</button>
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
