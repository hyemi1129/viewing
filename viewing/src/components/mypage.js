import React, { useEffect, useState } from 'react';
import './mypage.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import dollar from './dollar.png';

const Mypage = ({ nickname }) => {
  const [trashCounts, setTrashCounts] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchTrashCounts = async () => {
      try {
        const response = await fetch('/get-trash-counts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrashCounts([
          { trash_type: '플라스틱', count: data.plastic_count },
          { trash_type: '비닐', count: data.vinyl_count },
          { trash_type: '캔', count: data.can_count },
          { trash_type: '일반쓰레기', count: data.general_count },
        ]);
      } catch (error) {
        console.error('Error fetching trash counts:', error);
      }
    };

    const fetchScore = async () => {
      try {
        const response = await fetch('/get-latest-score');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScore(data.score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    const fetchRankings = async () => {
      try {
        const response = await fetch('/rankings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchTrashCounts();
    fetchScore();
    fetchRankings();
    setLoading(false);
  }, [nickname]);

  const labels = ['플라스틱', '비닐', '캔', '일반쓰레기'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: '쓰레기 종류별 배출량',
        data: labels.map(label => {
          const count = trashCounts.find(item => item.trash_type === label);
          return count ? count.count : 0;
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div style={{ marginLeft: '470px', marginTop: '60px' }}>
        <h1 style={{ fontSize: '60px', position: 'relative' }}>{nickname}</h1>
      </div>

      <div style={{ marginLeft: '250px', marginTop: '60px', position: 'relative' }}>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '100px' }}>
          <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50px',
            padding: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '150px',
          }}>
            <div style={{ width: '100%', height: '100%' }}>
              <Bar data={data} options={options} />
            </div>
            <div style={{
              position: 'absolute',
              top: '80px',
              left: '315px',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '50px',
              backgroundColor: 'white',
              borderRadius: '50px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '10px',
            }}>
              <img src={dollar} alt="Dollar" style={{ width: '17px', height: '17px', marginLeft: '5px' }} />
              <span style={{ fontSize: '20px', marginLeft: '100px' }}>{score} 점</span>
            </div>
          </div>

          <div style={{
            marginLeft: '20px',
            width: '400px',
            height: '600px',
            backgroundColor: 'white',
            borderRadius: '50px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            <div style={{
              marginTop: '20px',
              fontSize: '20px',
              color: 'black',
              textAlign: 'center',
            }}>
              이번 달 등수는
            </div>
            {rankings.map((rank, index) => (
              <div key={index} style={{
                marginTop: '20px',
                fontSize: '18px',
                color: '#007BFF',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '50px',
                padding: '20px',
                width: '80%',
                height: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}>
                <span>{rank.rank}위 {rank.nickname}</span>
                <span>{rank.score} 점</span> {/* 점수 추가 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
