import React from 'react';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { CatComp } from './components/CatComp';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='content'>
        <Header />
        <CatComp />
        <footer className='footer'>
          2023 / by <a href='http://antizycle.online' target='_blank' rel='noreferrer'>Antizycle</a>
        </footer>
      </div>
    </Provider>
  );
}