import React from 'react';
import './mypage.css'; // 스타일 시트 import

const Mypage = () => {
  return (
    <div>
      <div className="svg-container">
      <svg width="438" height="612" viewBox="0 0 438 612" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_524_48)">
        <rect x="10" y="6" width="418" height="592" rx="50" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_d_524_48" x="0" y="0" width="438" height="612" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_524_48"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_524_48" result="shape"/>
        </filter>
        </defs> 
        </svg>
      </div>

        

    </div>
  );
};

export default Mypage;
