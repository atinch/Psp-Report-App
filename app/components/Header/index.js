import React from 'react';

import Banner from './banner.png';
import './index.css';

function Header() {
  return (
    <div className='image'>
      <a href="https://www.financialhouse.io/">
        <img src={Banner} alt="https://www.financialhouse.io/" />
      </a>
    </div>
  );
}

export default Header;
