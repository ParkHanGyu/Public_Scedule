import React, { useState } from 'react';
import './week-schedule.css';

function WeekCard({ nowdate }: { nowdate: Date }) {
  const [startDate, setStartDate] = useState(() => {
    const initialStartDate = new Date(nowdate);
    initialStartDate.setDate(nowdate.getDate() - nowdate.getDay() + 1);
    return initialStartDate;
  });

  const moveToNextWeek = () => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(prevStartDate.getDate() + 7);
      return newStartDate;
    });
  };

  const moveToPreviousWeek = () => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(prevStartDate.getDate() - 7);
      return newStartDate;
    });
  };

  const weekdays = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    weekdays.push(
      <div key={i} className='dayBox'>
        {currentDate.toLocaleDateString(undefined, { day: 'numeric' })}
      </div>
    );
  }

  return (
    <div className='weekBox'>
      <h2 className='weekInfo'>{`${startDate.getFullYear()}년 ${startDate.toLocaleDateString(undefined, { month: 'long' })}`}</h2>
      <div className='dayBoxs'>
        <button className='arrow' onClick={moveToPreviousWeek}>{'<'}</button>
        {weekdays}
        <button className='arrow' onClick={moveToNextWeek}>{'>'}</button>
      </div>
    </div>
  );
}

export default WeekCard;
