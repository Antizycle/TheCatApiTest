import React from 'react'
import thecat from '../img/thecat.png';

export const Header = () => {
  return (
    <header className='header'>
      <nav>
        <img src={thecat} alt="The Cat Api Test Application" className='header__logo'/>
        <h2>The Cat Api Test Application</h2>
      </nav>
    </header>
  );
}