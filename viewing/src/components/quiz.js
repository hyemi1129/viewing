import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './quiz.css';

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [questionNum, setQuestionNum] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [solution, setSolution] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    loadRandomQuestion();
  }, []);

  const loadRandomQuestion = () => {
    const randomQuestionNum = Math.floor(Math.random() * 50) + 1;
    setQuestionNum(randomQuestionNum);

    const questions = {
      1: { text: '택배 상자는 깨끗한 상태라면 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      2: { text: '음식물 얼룩이 있는 피자 박스는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      3: { text: '플라스틱 물병은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      4: { text: '과자 봉지는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      6: { text: '일회용 종이컵은 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      7: { text: '빵을 포장하는 랩은 어디에 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      8: { text: '신문지는 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      9: { text: '우유 팩은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      11: { text: '플라스틱 칫솔은 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      12: { text: '테이크아웃 커피컵 뚜껑은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      13: { text: '감자칩 통 (프링글스)는 어떻게 처리해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      14: { text: '플라스틱 장난감은 어디에 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      15: { text: '쓰레기봉투는 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      17: { text: '플라스틱 옷걸이는 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      18: { text: '종이영수증은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      19: { text: '이물질이 묻은 비닐 장갑은 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      20: { text: '종이컵 홀더는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      21: { text: '종이로 된 시리얼 박스는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      22: { text: '햄버거 포장용 비닐은 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      25: { text: '커피 찌꺼기 담은 종이 봉투는 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      26: { text: '소금과 후추를 담은 비닐 봉지는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      28: { text: '플라스틱 클립은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      29: { text: '비닐 식품 포장지는 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      30: { text: '종이로 된 타올은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      31: { text: '일회용 수저는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      32: { text: '기름종이는 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      33: { text: '포장용 비닐은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      34: { text: '종이 가방은 어떻게 처리할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      35: { text: '페트병의 라벨은 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      36: { text: '식용유 통은 어떻게 분류해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      37: { text: '미사용 세제 용기는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      38: { text: '우편봉투는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      39: { text: '종이 타올 심지는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      40: { text: '리사이클이 가능한 플라스틱 컵은 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      42: { text: '식품 포장용 폼은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      43: { text: '음식물이 남아있는 플라스틱 용기는 어떻게 처리해야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      46: { text: '재활용이 불가능한 스티로폼은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      48: { text: '종이로 된 주방 타올은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      49: { text: '냉동식품 포장지는 어떻게 분류할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      50: { text: '일회용 커피컵 뚜껑은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
    };
    setQuestion(questions[randomQuestionNum]);
  };

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      navigate('/quiz2');
    }
  };

  const handleAnswerClick = async (answer) => {
    setUserAnswer(answer);
    const result = await sendAnswerToBackend(answer);
    setMessageType(result.messageType);
    setSolution(result.solution);  
  };

  const sendAnswerToBackend = async (answer) => {
    try {
      const response = await axios.post('/compare', {
        questionnum: questionNum,
        useranswer: answer,
        user_id: "exampleUserId"  
      });
      return {
        result: response.data.result,
        messageType: response.data.result === 'Right' ? 'correct' : 'incorrect',
        solution: response.data.solution,
      };
    } catch (error) {
      console.error('Error sending answer:', error);
      return { messageType: 'incorrect' };
    }
  };

  const handleNextButtonClick = () => {
    if (quizCompleted) {
      navigate('/mypage'); 
    } else {
      setQuizCompleted(true); 
      loadRandomQuestion(); 
      setMessageType(null); 
    }
  };

  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const renderSolution = (solution) => {
    const keywords = ['일반쓰레기', '종이', '비닐', '플라스틱'];
    let result = [];
    let tempString = "";
    
    for (let i = 0; i < solution.length; i++) {
      tempString += solution[i];
      
      // 20글자마다 줄바꿈
      if (tempString.length >= 17) {
        result.push(
          <span key={i}>
            {highlightKeywords(tempString)}<br />
          </span>
        );
        tempString = "";
      }
    }

    if (tempString.length > 0) {
      result.push(<span key={solution.length}>{highlightKeywords(tempString)}</span>);
    }
    return result;
  };

  const highlightKeywords = (text) => {
    const keywords = ['일반쓰레기', '종이류', '비닐류', '플라스틱류'];
    let updatedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(keyword, 'g');
      updatedText = updatedText.replace(regex, `<span style="color: #007bff;">${keyword}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: updatedText }} />;
  };

  return (
    <div className="quiz-overlay" onClick={handleOverlayClick}>
      <div className="quiz-content">
        <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>
          {question ? question.text : '문제를 불러오는 중입니다...'}
        </h3>

        {question && (
          <div className="answer-options">
            {question.options.map((option, index) => (
              <Button
                key={index}
                style={buttonStyle}
                onClick={() => handleAnswerClick(index + 1)}
              >
                <span className="blue-text" style={{ fontWeight: 'bold' }}>{option}</span> 
              </Button>
            ))}
          </div>
        )}

        {messageType && (
          <div style={messageStyle}>
            <span style={{ fontSize: '60px', fontWeight: 'bold', color: messageType === 'correct' ? 'white' : 'red' }}>
              {messageType === 'correct' ? '맞췄어요' : '틀렸어요'}
            </span>
            <p style={{ fontSize: '17px', color: 'white', fontWeight: 'normal' }}>  
              {messageType === 'correct' ? '+20캐시' : ''}
            </p>
            {solution && (
              <p style={solutionStyle}>
                {renderSolution(solution)}
              </p>
            )}
            <Button style={nextButtonStyle} onClick={handleNextButtonClick}>
              {quizCompleted ? '다음으로' : '다음으로'}
            </Button>
          </div>
        )}

        {/* 새로고침 버튼 추가 */}
        <Button style={refreshButtonStyle} onClick={handleRefreshButtonClick}>
          새로고침
        </Button>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '20px',
  fontSize: '18px',
  backgroundColor: 'transparent',
  color: 'black',
  border: '2px solid #007bff',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  width: '100%',
};

const messageStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 1000,
};

const solutionStyle = {
  fontSize: '25px',   
  color: 'white',     
  marginTop: '10px',
  fontWeight: 'bold'  
};

const nextButtonStyle = {
  marginTop: '20px',
  padding: '15px 30px',
  fontSize: '20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const refreshButtonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const Button = ({ style, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...style,
        backgroundColor: isHovered ? '#007bff' : style.backgroundColor,
        color: isHovered ? 'white' : style.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Quiz;
