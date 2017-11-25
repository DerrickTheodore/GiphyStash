import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Favorites from './Favorites.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';



const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/signup' component={ SignUp }/>
      <Route exact path='/login' component={ Login }/>
      <Route exact path='/' component={ () => <Home props={props} /> }/>
      <Route exact path='/favorites' component={ () => <Favorites props={props} /> }/>
      <Route exact path='/*' component={ NotFound }/>
    </Switch> 
  </main>
)

export default Main;