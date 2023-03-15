import React from 'react'
import thecat from '../img/thecat.png';
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { decrement, increment, incrementByAmount, selectCount } from '../redux/catSlice';


export const Header = () => {
  // const [ amount, setAmount ] = useState('13');
  // const value  = useAppSelector(selectCount);
  // const dispatch = useAppDispatch();

  // const incrValue = Number(amount) || 0;

  return (
    <header className='header'>
      <div className='acknowledgement'>
        API and Data Provided by <a href="https://thecatapi.com" target='_blank' rel='noreferrer' className='--clr-accent'>The Cat Api</a>
      </div>
      <nav>
        <img src={thecat} alt="The Cat Api Test Application" className='header__logo'/>
        <h2>The Cat Api Test Application</h2>
      </nav>
    </header>
  );
}