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
    console.log(`[handleSelectChange] = ${e.target.value}`)
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
          />
          {/* Giphy Search:<br/>
          <input type="text" name="query" onChange={this.handleSearchChange.bind(this)}/>
          <button  type="submit" onClick={this.handleGiphySearch.bind(this)}>Search</button>
          <div>
            Giphy Search by Rating:<br/>
            <select onChange={this.handleSelectChange.bind(this)} value={this.state.selectValue}>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </select>
          </div>
        <GiphyTable handleFaveUpdate={this.handleFaveUpdate.bind(this)} faveGiphyCollection={this.state.favGiphys} giphyCollection={this.state.searchedGiphys}/> */}
      </div>  
    )
  }
}

render((
<BrowserRouter>  
  <App />
</BrowserRouter>
), document.getElementById('app'));
