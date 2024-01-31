import React, { useState } from 'react';
import './header.css';

function MainHeader() {
  // 현재 선택된 메뉴 상태
  const [selectedMenu, setSelectedMenu] = useState('teamSchedule');

  return (
    <div className='header'>
      <div className='headerLogo'>대충 로고</div>
      <nav className='headerNav'>
        <div
          className={selectedMenu === 'mySchedule' ? 'selected' : ''}
          onClick={() => setSelectedMenu('mySchedule')}
        >
          나의일정
        </div>
        <div
          className={selectedMenu === 'teamSchedule' ? 'selected' : ''}
          onClick={() => setSelectedMenu('teamSchedule')}
        >
          팀일정
        </div>
        <div
          className={selectedMenu === 'personalSchedule' ? 'selected' : ''}
          onClick={() => setSelectedMenu('personalSchedule')}
        >
          개인일정
        </div>
        <div
          className={selectedMenu === 'myMenu' ? 'selected' : ''}
          onClick={() => setSelectedMenu('myMenu')}
        >
          마이메뉴
        </div>
      </nav>
    </div>
  );
}

export default MainHeader;
