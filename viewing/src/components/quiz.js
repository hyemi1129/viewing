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
    const randomQuestionNum = Math.floor(Math.random() * 4) + 1;
    setQuestionNum(randomQuestionNum);

    const questions = {
      1: { text: '택배 상자는 깨끗한 상태라면 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      2: { text: '음식물 얼룩이 있는 피자 박스는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      3: { text: '플라스틱 물병은 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] },
      4: { text: '과자 봉지는 어디에 버려야 할까요?', options: ['일반쓰레기', '종이', '플라스틱', '비닐'] }
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

  const renderSolution = (solution) => {
    const keywords = ['일반쓰레기', '종이', '비닐', '플라스틱'];
    let result = [];
    let tempString = "";
    
    for (let i = 0; i < solution.length; i++) {
      tempString += solution[i];
      
      // 20글자마다 줄바꿈
      if (tempString.length >= 20) {
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
