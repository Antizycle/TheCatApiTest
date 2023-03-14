import React from 'react';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { TestComp } from './components/TestComp';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='content'>
        <Header />
        <TestComp />
      </div>
    </Provider>
  );
}