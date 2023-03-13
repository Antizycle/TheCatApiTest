import ReactDOM from 'react-dom/client';
import React from 'react';
import './css/index.scss';
import { App } from "./app";

const root = document.getElementById('root') as HTMLElement;

if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
