import React from 'react';
import { render } from 'react-dom'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Header from './Header.jsx';
import Main from './Main.jsx';

const API_KEY = require('../API_KEYs')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedGiphys: [],
      favGiphys: [],
      selectValue: ''
    }
  }

  componentDidMount() {
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data})
    })
  }
    
  handleGiphySearch(e, searchInput) {
    e.preventDefault();
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchInput.replace(/\s+/g,'+')}&api_key=${API_KEY.giphy}&rating=g&limit=25`)
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
  
  render() {
    return (
      <div>
          <Header />
          <Main 
            handleGiphySearch={this.handleGiphySearch.bind(this)}
            handleFaveUpdate={this.handleFaveUpdate.bind(this)}
            handleSelectChange={this.handleSelectChange.bind(this)}
            faveGiphyCollection={this.state.favGiphys} 
            giphyCollection={this.state.searchedGiphys}
            selectValue={this.state.selectValue}
          />
      </div>  
    )
  }
}

render((
<BrowserRouter>  
  <App />
</BrowserRouter>
), document.getElementById('app'));
