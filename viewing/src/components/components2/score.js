import React from 'react';

const Score = ({ nickname }) => {
  return (
    <div style={{ 
      width: '200px', 
      height: '100px', 
      backgroundColor: 'lightgray', 
      borderRadius: '10px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontSize: '18px', 
      fontWeight: 'bold'
    }}>
      {nickname ? `${nickname}님` : '닉네임이 없습니다.'}
    </div>
  );
};

export default Score;
