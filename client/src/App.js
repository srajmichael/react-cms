import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';

import store from './store/store';

import LoginPage from './pages/login/login';

import RegistrationForm from './pages/register/register';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RegistrationForm/>
      </div> 
    </Provider>

  );
}

export default App;
