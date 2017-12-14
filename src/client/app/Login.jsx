import React from 'react';
import { Route } from 'react-router-dom';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usernameLogin: '',
      passwordLogin: '',
      usernameSignUp: '',
      passwordSignUp: ''  
    }
  }

  handleUsernameLoginfieldChange(e){
    this.setState({usernameLogin: e.target.value})
  }

  handleUsernameSignUpfieldChange(e){
    this.setState({usernameSignUp: e.target.value})
  }

  handlePasswordLoginfieldChange(e){
    this.setState({passwordLogin: e.target.value})    
  }

  handlePasswordSignUpfieldChange(e){
    this.setState({passwordSignUp: e.target.value})    
  }

  render(){
    return(
      <div>
        <h2>Login:</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            let userInfo = { usernameId: this.state.usernameLogin, passwordId: this.state.passwordLogin }
            this.props.handleLoginSubmit(userInfo);
          }
        }>
        <h4>Username:</h4>
        <input onChange={this.handleUsernameLoginfieldChange.bind(this)} type="text" name="username" value={this.state.usernameLogin}/>
        <br/>
        <h4>password:</h4>
        <input onChange={this.handlePasswordLoginfieldChange.bind(this)} type="text" name="password" value={this.state.passwordLogin}/>
        <input type="submit" value="login"/>
        </form>
        <h2>SignUp:</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            let userInfo = { usernameId: this.state.usernameSignUp, passwordId: this.state.passwordSignUp }            
            this.props.handleSignUpSubmit(userInfo);
            this.setState({usernameSignUp: ''})
            this.setState({passwordSignUp: ''})
            
          }
        }>
        <h4>Username:</h4>
        <input onChange={this.handleUsernameSignUpfieldChange.bind(this)} type="text" name="username" value={this.state.usernameSignUp}/>
        <br/>
        <h4>password:</h4>
        <input onChange={this.handlePasswordSignUpfieldChange.bind(this)} type="text" name="password" value={this.state.passwordSignUp}/>
        <input type="submit" value="sign up"/>
        </form>
      </div>
    )
  }
} 

export default Login;