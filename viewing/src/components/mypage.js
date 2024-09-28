import React, { useEffect, useState } from 'react';
import './mypage.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import dollar from './dollar.png'; // dollor 이미지 불러오기

const Mypage = ({ nickname }) => {
  const [trashCounts, setTrashCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrashCounts = async () => {
      try {
        const response = await fetch('/get-trash-counts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrashCounts(data);
      } catch (error) {
        console.error('Error fetching trash counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrashCounts();
  }, []);

  // 그래프 레이블 정의
  const labels = ['플라스틱', '비닐', '캔', '일반쓰레기'];

  // 그래프 데이터 준비
  const data = {
    labels: labels,
    datasets: [
      {
        label: '쓰레기 종류별 배출량',
        data: labels.map(label => {
          const count = trashCounts.find(item => item.trash_type === label);
          return count ? count.count : 0; // 해당 종류의 갯수를 가져오고, 없으면 0
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 그래프 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 8, // 최대값을 8로 설정
        ticks: {
          stepSize: 1, // y축의 단계 간격을 1로 설정
        },
      },
    },
  };

  if (loading) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 표시할 컴포넌트
  }

  return (
    <div>
      <div style={{ marginLeft: '470px', marginTop: '60px' }}>
        <h1 style={{ fontSize: '60px', position: 'relative' }}></h1>
      </div>

      <div style={{ marginLeft: '250px', marginTop: '60px', position: 'relative' }}>
        <div style={{ 
          display: 'flex',
          marginTop: '20px',
          marginLeft: '100px',
        }}>
          {/* 그래프를 담을 네모 상자 */}
          <div style={{ 
            width: '400px', 
            height: '400px', 
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50px',
            marginTop: '150px', // 그래프 상자만 아래로 내리기 위한 여백 추가
          }}>
            <div style={{ width: '100%', height: '100%' }}> {/* 그래프가 상자에 맞게 크기 조정 */ }
              <Bar data={data} options={options} />
            </div>
            {/* 그래프 상자 위에 작은 하얀 상자 추가 */}
            <div style={{
              position: 'absolute',
              top: '80px', // 그래프 상자 위쪽에 위치
              left: '315px',
              transform: 'translateX(-50%)',
              width: '200px', // 너비
              height: '50px', // 높이
              backgroundColor: 'white',
              borderRadius: '50px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'flex-start', // 왼쪽 정렬
              alignItems: 'center',
              paddingLeft: '10px', // 왼쪽 여백
            }}>
              <img src={dollar} alt="Dollar" style={{ width: '17px', height: '17px', marginLeft: '5px' }} /> {/* 이미지 추가 */}
              {/* 내용이 없는 하얀 상자 */}
            </div>
          </div>

          {/* 새로운 하얀 네모 상자 추가 */}
          <div style={{
            marginLeft: '20px',
            width: '400px',
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            marginTop: '20px', // 위쪽 여백 추가
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column', // 수직 정렬
            alignItems: 'center', // 가운데 정렬
            justifyContent: 'flex-start', // 위쪽 정렬
          }}>
            {/* 하얀 네모 상자 내용 */}
            <div style={{
              marginTop: '20px', // 상단 여백
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}>
              이번 달 등수는
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
