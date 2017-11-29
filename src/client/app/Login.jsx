import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '' 
    }
  }

  handleUsernamefieldChange(e){
    this.setState({username: e.target.value})
  }

  handlePasswordfieldChange(e){
    this.setState({password: e.target.value})    
  }

  handleSubmit(){
    axios.post(`/login/username/${this.state.username}/password/${this.state.password}`);
  }

  render(){
    return(
      <div>
        <h2>Login:</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }
        }>
        <h4>Username:</h4>
        <input onChange={this.handleUsernamefieldChange.bind(this)} type="text" name="username" value={this.state.username}/>
        <br/>
        <h4>password:</h4>
        <input onChange={this.handlePasswordfieldChange.bind(this)} type="text" name="password" value={this.state.password}/>
        <input type="submit" value="login"/>
        </form>
      </div>
    )
  }
} 

export default Login;