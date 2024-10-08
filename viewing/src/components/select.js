import React from 'react';
import './select.css';

const Select = ({ text }) => {
  return (
    <button className="select-button">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3335 20.5882H66.6668M33.3335 55.8824V34.7059M46.6668 55.8824V34.7059M53.3335 70H26.6668C22.9849 70 20.0002 66.8397 20.0002 62.9412V24.1176C20.0002 22.1684 21.4925 20.5882 23.3335 20.5882H56.6668C58.5078 20.5882 60.0002 22.1684 60.0002 24.1176V62.9412C60.0002 66.8397 57.0154 70 53.3335 70ZM33.3335 20.5882H46.6668C48.5078 20.5882 50.0002 19.0081 50.0002 17.0588V13.5294C50.0002 11.5802 48.5078 10 46.6668 10H33.3335C31.4925 10 30.0002 11.5802 30.0002 13.5294V17.0588C30.0002 19.0081 31.4925 20.5882 33.3335 20.5882Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
      {text}
    </button>
  );
};

export default Select;