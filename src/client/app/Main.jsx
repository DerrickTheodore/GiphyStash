import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './Home.jsx';
import Favorites from './Favorites.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
//moving theses to index.js for userHandling
// import SignUp from './SignUp.jsx';
// import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const API_KEY = require('../API_KEYs')

class Main extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        searchedGiphys: [],
        favGiphys: [],
        selectValue: ''
      }
  }

  handleGiphySearch(e, searchInput) {
    e.preventDefault();
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchInput.replace(/\s+/g,'+')}&api_key=${API_KEY.giphy}&limit=25`)
    .then( (result) => {
      this.setState({searchedGiphys: result.data.data});
    })
    .catch(err => console.error(err));  
  }

  handleFaveUpdate() {
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data});
    })
  }

  handleSelectChange(e) {
    this.setState({selectValue: e.target.value})
    axios.get(`/rating/${e.target.value}`)
    .then( (result) => {
      this.setState({favGiphys: result.data});
    })
  }

  componentDidMount() {
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data})
    })
  }

  render() {
    return(
      <main>
        <Header />
        <Switch>
          <Route exact path='/login' component={ () => <Login 
            handleSignUpSubmit={this.props.handleSignUpSubmit.bind(this)}
            handleLoginSubmit={this.props.handleLoginSubmit.bind(this)}
          />}/>
          <Route exact path='/' component={ () => <Home 
            handleGiphySearch={this.handleGiphySearch.bind(this)}
            handleFaveUpdate={this.handleFaveUpdate.bind(this)}
            giphyCollection={this.state.searchedGiphys}
           /> }/>
          <Route exact path='/favorites' component={ () => <Favorites
            selectValue={this.state.selectValue}
            handleSelectChange={this.handleSelectChange.bind(this)}
            handleFaveUpdate={this.handleFaveUpdate.bind(this)}
            faveGiphyCollection={this.state.favGiphys}
            /> }/>
          <Route exact path='/*' component={ NotFound }/>
        </Switch> 
      </main>
    );
  }
}

export default Main;