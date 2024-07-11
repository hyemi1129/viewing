import React from 'react';

const Explain2 = () => {

  const handleSvgClick = () => {
    window.location.href = `/trashselect`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginRight: '150px' }}>
        <h1 style={{ paddingLeft: '150px', marginTop: '20px', fontSize: '45px' }}>AI분리수거 쓰레기통 사용법</h1>
        <p style={{ paddingLeft: '190px', fontSize: '23px' }}>
          <br/>쓰레기통 입구가 열리고 나서 쓰레기를 하나씩 천천히 넣어주세요. <br/>
          음식물이 묻어 있는 쓰레기는 분리수거가 되지 않으니 깨끗히 씻어 넣어주세요. <br /><br />
          <b>· 자동 선택 시</b> 쓰레기는 자동으로 분류 됩니다 <br /><br />
          <b>· 수동 선택 시</b> 자신이 버리고 싶은 쓰레기를 직접 선택하여 버릴 수 있으며, <br/><br/>
          자신이 선택한 쓰레기를 올바르게 분리 했을 경우 추가적인 마일리지가 지급됩니다 <br/><br/><br/><br/>
        </p>
        <p style={{ color: 'blue', paddingLeft: '190px', fontSize: '23px' }}> (※ 종이를 넣을 시 일반쓰레기로 분류, 페트를 넣을 시 플라스틱으로 분류 됩니다.)
        </p>
      </div>
      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 'auto', marginRight: '150px', marginTop: 'auto', marginBottom: 'auto', cursor: 'pointer' }} onClick={handleSvgClick}>
        <g filter="url(#filter0_d_849_101)">
          <circle cx="42" cy="38" r="38" fill="white"/> 
        </g>
        <path fillRule="evenodd" clipRule="evenodd" d="M35.8214 50.8451C35.1705 50.1943 35.1705 49.139 35.8214 48.4881L46.3096 38L35.8214 27.5118C35.1705 26.8609 35.1705 25.8057 35.8214 25.1548C36.4723 24.5039 37.5276 24.5039 38.1784 25.1548L49.8451 36.8215C50.496 37.4723 50.496 38.5276 49.8451 39.1785L38.1784 50.8451C37.5276 51.496 36.4723 51.496 35.8214 50.8451Z" fill="black"/>
        <defs>
          <filter id="filter0_d_849_101" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_849_101"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_849_101" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Explain2;