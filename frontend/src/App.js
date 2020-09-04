import React, { useState, useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

import './App.css';

import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props)=> {
        return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
        }}/>
}

function App() {
  //set state values
  let [currentUser, setCurrentUser] = useState('');
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      setIsAuthenticated(true)
    }
  }, []);

  let nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...')
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  let handleLogout = () => {
    if(localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser('');
      setIsAuthenticated(false);
    }
  };

  console.log('Current User', currentUser);
  console.log('Authenticated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route 
            path = "/login" 
            render = { (props) =>  <Login {...props} setCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> }
          />
          <Route path="/about" component={ About}/>
          <PrivateRoute path='/profile' component={Profile} user={currentUser} />
          <Route exact path="/" component={Welcome}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
