import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mypage.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import dollar from './dollar.png';
import home from './home.png';
import dollar2 from './dollar2.png';

const Mypage = ({ nickname }) => {
  const [trashCounts, setTrashCounts] = useState([]);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(null);
  const [userNickname, setUserNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrashCounts = async () => {
      try {
        const response = await fetch('/get-trash-counts');
        if (!response.ok) throw new Error('Network response was not ok');
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

    const fetchScoreAndRank = async () => {
      try {
        const response = await fetch('/get-user-score');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setScore(data.score);
        setUserNickname(data.nickname);

        const rankingsResponse = await fetch('/rankings');
        if (!rankingsResponse.ok) throw new Error('Network response was not ok');
        const rankingsData = await rankingsResponse.json();
        setRankings(rankingsData);

        const userRank = rankingsData.findIndex(rank => rank.nickname === data.nickname) + 1;
        setRank(userRank);
      } catch (error) {
        console.error('Error fetching score or rank:', error);
      }
    };

    fetchTrashCounts();
    fetchScoreAndRank();
    setLoading(false);
  }, [nickname]);

  const handleHomeClick = () => {
    navigate('/');
  };

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
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderRadius: 10,
        borderWidth: 1,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        font: { size: 16 },
        anchor: 'center',
        align: 'top',
        offset: 5,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 8,
        ticks: { stepSize: 1 },
        grid: { display: false },
      },
    },
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {/* 고정된 파란색 네모 박스 */}
      <div
        style={{
          width: '309px',
          height: '70px',
          backgroundColor: '#0079FF',
          borderTopLeftRadius: '35px',
          borderTopRightRadius: '35px',
          position: 'fixed',
          top: '610px',
          left: '828px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          padding: '0 20px',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
          {rank}위&nbsp;&nbsp;&nbsp;{userNickname}
        </span>
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
          <img
            src={dollar2}
            alt="dollar2"
            style={{
              width: '20px',
              height: '20px',
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          {score}점
        </span>
      </div>

      <img
        src={home}
        alt="Home"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
        onClick={handleHomeClick}
      />

      <div style={{ marginLeft: '470px', marginTop: '60px' }}>
        <h1 style={{ fontSize: '60px', position: 'relative' }}>{nickname}</h1>
      </div>

      <div style={{ marginLeft: '250px', marginTop: '60px', position: 'relative' }}>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '100px' }}>
          <div
            style={{
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
            }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <Bar data={data} options={options} />
            </div>
          </div>

          <div
            style={{
              marginLeft: '20px',
              width: '420px',
              height: '600px',
              backgroundColor: 'white',
              borderRadius: '40px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                marginTop: '30px',
                fontSize: '20px',
                color: 'black',
                textAlign: 'center',
              }}
            >
              <b>이번 달 등수는</b>
            </div>
            {rankings.map((rank, index) => (
              <div
                key={index}
                style={{
                  marginTop: '20px',
                  fontSize: '18px',
                  color: '#007BFF',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: '50px',
                  padding: '20px',
                  width: '70%',
                  height: '23px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
              >
                <span>{rank.rank}위 {rank.nickname}</span>
                <span>
                  <img
                    src={dollar}
                    alt="dollar"
                    style={{
                      width: '18px',
                      height: '18px',
                      marginRight: '5px',
                      verticalAlign: 'middle',
                    }}
                  />
                  {rank.score} 점
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
