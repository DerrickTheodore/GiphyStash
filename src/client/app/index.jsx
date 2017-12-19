import React from 'react';
import axios from 'axios';
import { render } from 'react-dom'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
      userVerified: null,
      currentUser: null,
      responseMessage: ''
    }
  }
  
  componentWillMount() {
    let currentUserSessionId = this.state.currentUser.id;

    axios.get(`/checkSessionExist/sessionid/${currentUserSessionId}`)
    .then( (response) => {
      if(response.data.boolean) { 
        this.setState({userVerified: true, currentUser: response.data.userInfo })
       } 
    })
    .catch(err => console.log(err))
  }
  
  handleLoginSubmit(userInfo){
    axios.post(`/login/username/${userInfo.usernameId}/password/${userInfo.passwordId}`)
    .then( (response) => {
      response.data.boolean ? this.setState({userVerified: true, currentUser: response.data.userInfo }) : 
      this.setState({responseMessage: response.data.message})
    })
  }

  handleSignUpSubmit(userInfo){
    axios.post(`/signup/username/${userInfo.usernameId}/password/${userInfo.passwordId}`)
    .then( (response) => {
      if(!response.data.boolean) {  
        this.setState({responseMessage: response.data.message})
      }
    })
  }

  render() {
    return (
      <div>
          {
            this.state.currentUser ?
            <Main 
            currentUser={this.state.currentUser}
            handleSignUpSubmit={this.handleSignUpSubmit.bind(this)}
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
            />
            :
            this.state.responseMessage ? 
            <div>
            <h4 style={{color: "red", fontVariant: "smallCaps"}}>{this.state.responseMessage}</h4>
            <Login 
            handleSignUpSubmit={this.handleSignUpSubmit.bind(this)}
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
            />
            </div>
            :
            <Login 
            handleSignUpSubmit={this.handleSignUpSubmit.bind(this)}
            handleLoginSubmit={this.handleLoginSubmit.bind(this)}
            />
          }
      </div>  
    )
  }
}

render((
<BrowserRouter>  
  <App />
</BrowserRouter>
), document.getElementById('app'));
