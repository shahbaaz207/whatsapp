import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import StateProvider from './components/StateProvider';
import reducer, { initailState } from './components/Reducer';



ReactDOM.render(
    <StateProvider initialState={initailState}
        reducer={reducer}
        >
        <App/>
    </StateProvider>
, document.getElementById('root'));

