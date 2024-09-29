import React, { useState } from 'react';
import './trash.css'; // CSS 파일을 import 합니다.
import Popup22 from './popup22'; // 로딩 팝업 컴포넌트
import Popup5 from './popup5'; // 맞다는 팝업 컴포넌트
import Popup4 from './popup4';
import plastic from './plastic.png';
import vinyl from './vinyl.png';
import can from './can.png';
import trash from './trash.png'; // 일반쓰레기 이미지


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
    const [selectedOption, setSelectedOption] = useState(null);
    const [showPopup22, setShowPopup22] = useState(false); // 로딩팝업
    const [showPopup5, setShowPopup5] = useState(false);   // 정답팝업
    const [showPopup4, setShowPopup4] = useState(false);   // 오답팝업
    const [compareResult, setCompareResult] = useState(null); // 서버로 받은 결과 상태
    const [prevScore, setPrevScore] = useState(0); // 이전 점수

    // 버튼 클릭 시 호출되는 핸들러
    const handleClick = async (type) => {
        setSelectedOption(type); // 선택된 버튼 업데이트
        setShowPopup22(true); 
        console.log(`${type} 버튼 클릭됨`);

        const result = await trashDivision(type); 

        
        setTimeout(() => {
            setShowPopup22(false);

            // 서버 결과가 이전 점수보다 클 경우
            if (result && result.score > prevScore) {
                setCompareResult(result);
                setShowPopup5(true); 
                setPrevScore(result.score); // 이전 점수 업데이트
            }
            //이전 점수보다 작을 경우
            else if (result && (result.score < prevScore)) {
                setCompareResult(result);
                setShowPopup4(true); 
                setPrevScore(result.score);
            }
            
        }, 2000); // 2초 동안 로딩 팝업 유지
    };

    const handleClosePopup5 = () => {
        setShowPopup5(false); // 맞다는 팝업 닫기
    };
    const handleClosePopup4 = () => {
        setShowPopup4(false);
    }

    return (
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
                            className={`button ${selectedOption === item.label ? 'selected' : ''}`} // 선택된 버튼 강조
                            onClick={() => handleClick(item.label)}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <img 
                                src={item.image} 
                                alt={item.label} 
                                style={{ 
                                    width: item.label === '일반쓰레기' ? '100px' : '100px', // 일반쓰레기만 크기 다르게 설정
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

            {showPopup22 && <Popup22 />} {/* 로딩 팝업 표시 */}
            {showPopup5 && <Popup5 onClose={handleClosePopup5} />} {/* 정답 팝업 표시 */}
            {showPopup4 && <Popup4 onClose={handleClosePopup4} />} {/* 오답 팝업 표시 */}
        </div>
    );
};

export default Trash;
