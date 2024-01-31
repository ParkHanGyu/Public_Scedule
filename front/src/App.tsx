import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeekCard from './components/week-schedule/week-schedule';
import MainHeader from './layouts/header/header';

function App() {
  let today = new Date();
  return (
    <div>
      <MainHeader></MainHeader>
      <WeekCard nowdate={today}></WeekCard>
    </div>
  );
}

export default App;