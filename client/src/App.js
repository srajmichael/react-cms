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
import HomePage from './pages/home/HomePage';

import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header/>
          <Switch>
            <Route path='/register' component={RegistrationForm}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/' exact component={HomePage}/>
          </Switch>
        </Router>
      </div> 
    </Provider>

  );
}

export default App;
