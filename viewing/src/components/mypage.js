import React from 'react';
import './mypage.css';
import minibox from './minibox.png';
import middlebox from './middlebox.png';

const Mypage = ({ nickname }) => {
  return (
    <div>
      <div style={{ marginLeft: '470px', marginTop: '75px' }}>
        <h1 style={{ fontSize: '60px', position:'relative' }}>
        </h1>

        <div className="svg-container">
          <svg width="438" height="612" viewBox="0 0 438 612" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_524_48)">
              <rect x="10" y="6" width="418" height="592" rx="50" fill="white" />
            </g>
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
      </div>
      <div style={{ marginLeft: '250px', marginTop: '100px', position: 'relative' }}>
        <img 
          src={minibox} 
          alt="minibox" 
          style={{ 
            width: '200px', 
            height: 'auto', 
            marginLeft: '215px', 
            position: 'absolute', 
            top: '-80px', 
            left: '0' 
          }} 
        />
        <img 
          src={middlebox} 
          alt="middlebox" 
          style={{ 
            width: '400px', 
            height: 'auto', 
            marginLeft: '110px' 
          }} 
        />
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%',
            left: '50%',
            transform: 'translate(90px, -330px)',
            color: 'black',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '5px',
            borderRadius: '5px'
          }} 
        >
          이번  달 등수는
        </div>
      </div>
    </div>
  );
};

export default Mypage;