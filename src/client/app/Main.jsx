import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Favorites from './Favorites.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';



const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/' component={() => <Home props={props} />}/>
      <Route exact path='/favorites' component={() => <Favorites props={props} />}/>
    </Switch> 
  </main>
)

export default Main;