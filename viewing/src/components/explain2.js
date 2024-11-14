import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back2 from './back2.png'; // back2.png 이미지 경로

const Explain2 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/quiz'); // 7.5초 후에 Quiz 페이지로 이동
    }, 7500); // 7.5초 (7500 밀리초)

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  const handleBackClick = () => {
    navigate('/trash'); // 클릭 시 trash.js로 이동
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', // 수평 중앙 정렬
      alignItems: 'center', // 수직 중앙 정렬
      height: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {/* 오른쪽 상단에 back2.png 이미지 배치 */}
      <img 
        src={back2} 
        alt="Back" 
        onClick={handleBackClick} 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          cursor: 'pointer'
        }} 
      />

      <div style={{ 
        textAlign: 'left', // 텍스트 왼쪽 정렬
        width: '100%',
        maxWidth: '800px',
        margin: '20px auto 0 auto'
      }}>
        <h1 style={{ margin: '20px 0', fontSize: '45px' }}>
          AI분리수거 쓰레기통 사용법
        </h1>
        <p style={{ fontSize: '23px', lineHeight: '1.6', marginTop: '20px' }}>
          쓰레기통 입구가 열리고 나서 쓰레기를 하나씩 천천히 넣어주세요. <br/>
          음식물이 묻어 있는 쓰레기는 분리수거가 되지 않으니 깨끗히 씻어 넣어주세요. <br /><br />
          <b>· 자동 선택 시</b> 쓰레기는 자동으로 분류 됩니다 <br /><br />  
          자신이 선택한 쓰레기를 올바르게 분리 했을 경우 추가적인 마일리지가 지급됩니다 <br/><br/><br/><br/>
        </p>
        <p style={{ 
          color: 'blue', 
          fontSize: '23px', 
          marginTop: '20px',
          whiteSpace: 'nowrap'
        }}>
          (※ 종이를 넣을 시 일반쓰레기로 분류, 페트를 넣을 시 플라스틱으로 분류 됩니다.)
        </p>
      </div>
    </div>
  );
};

export default Explain2;
