import React from 'react';

import Banner from './banner.png';
import './index.css';

function Header() {
  return (
    <div className='image'>
      <a href="#">
        <img src={Banner} alt="" />
      </a>
    </div>
  );
}

export default Header;
