import React, { useEffect } from 'react';

const Explain = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `/trash`;
    }, 7500); // 15초 후에 페이지 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', // 수평 방향으로 중앙 정렬
      alignItems: 'center', // 수직 방향으로 중앙 정렬
      height: '100vh',
      padding: '20px' // 페이지 가장자리와 겹치지 않도록 패딩 추가
    }}>
      <div style={{ 
        textAlign: 'left', // 텍스트를 왼쪽 정렬
        width: '100%', // 컨테이너의 폭을 100%로 설정
        maxWidth: '800px', // 콘텐츠가 너무 넓어지지 않도록 최대 폭 설정
        margin: '20px auto 0 auto', // 수평 중앙 정렬 및 상단 여백 추가
        marginLeft: '100px' // 왼쪽 여백 추가
      }}>
        <h1 style={{ margin: '20px 0', fontSize: '45px' }}>
          AI분리수거 쓰레기통 사용법
        </h1>
        <p style={{ fontSize: '23px', lineHeight: '1.6', marginTop: '20px', whiteSpace: 'nowrap', marginLeft: '30px' }}>
          쓰레기통 입구가 열리고 나서 쓰레기를 하나씩 천천히 넣어주세요. <br/>
          음식물이 묻어 있는 쓰레기는 분리수거가 되지 않으니 깨끗히 씻어 넣어주세요. <br /><br />
          <b>· 자동 선택 시</b> 쓰레기는 자동으로 분류 됩니다 <br /><br />
          <b>· 수동 선택 시</b> 자신이 버리고 싶은 쓰레기를 직접 선택하여 버릴 수 있으며, <br/><br/>
          자신이 선택한 쓰레기를 올바르게 분리 했을 경우 추가적인 마일리지가 지급됩니다 <br/><br/><br/><br/>
        </p>
        <p style={{ 
          color: 'blue', 
          fontSize: '23px', 
          marginTop: '20px',
          marginLeft: '250px',
          whiteSpace: 'nowrap' // 줄바꿈 방지
        }}>
          (※ 종이를 넣을 시 일반쓰레기로 분류, 페트를 넣을 시 플라스틱으로 분류 됩니다.)
        </p>
      </div>
    </div>
  );
};

export default Explain;
