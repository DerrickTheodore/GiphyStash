import React from 'react';
import {render} from 'react-dom'; //Using destructing here to grab this method off react-dom object
import axios from 'axios'
import GiphyTable from './GiphyTable.jsx';

const API_KEY = require('../API_KEYs')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedGiphys: [],
      favGiphys: [],
      searchInput: ''
    }
  }

  componentDidMount() {
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data})
    })
  }

  handleSearchChange(e) {
    console.log(`[handleSearchChange]: e.tar.val=> ${e.target.value}`)
    this.setState({searchInput: e.target.value})
  }
    
  handleGiphySearch(e) {
    e.preventDefault();
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.searchInput.replace(/\s+/g,'+')}&api_key=${API_KEY.giphy}&rating=g&limit=10`)
    .then( (result) => {
      console.log(`result.data: ${JSON.stringify(result.data)}`)
      this.setState({searchedGiphys: result.data.data});
    })
    .catch(err => console.error(err));  
  }

  handleFaveUpdate() {
    axios.get('/allFav')
    .then( (result) => {
      console.log(`[axios.get('/allFav')] => ${JSON.stringify(result)}`)
      this.setState({favGiphys: result.data})
    })
  }

  render() {
    return (
      <div>
          Giphy Search:<br/>
          <input type="text" name="query" onChange={this.handleSearchChange.bind(this)}/>
          <button  type="submit" onClick={this.handleGiphySearch.bind(this)}>Search</button>
        <GiphyTable handleFaveUpdate={this.handleFaveUpdate.bind(this)} faveGiphyCollection={this.state.favGiphys} giphyCollection={this.state.searchedGiphys}/>
      </div>  
    )
  }
}

render(<App />, document.getElementById('app'));