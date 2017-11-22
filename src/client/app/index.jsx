import React from 'react';
import {render} from 'react-dom'; //Using destructing here to grab this method off react-dom object
import axios from 'axios'
import GiphyTable from './GiphyTable.jsx';

const API_KEY = require('../API_KEYs')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedGiphy: [],
      searchInput: ''
    }
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
      this.setState({searchedGiphy: result.data.data});
    })
    .catch(err => console.error(err));  
  }

  render() {
    return (
      <div>
          Giphy Search:<br/>
          <input type="text" name="query" onChange={this.handleSearchChange.bind(this)}/>
          <button  type="submit" onClick={this.handleGiphySearch.bind(this)}>Search</button>
        <GiphyTable giphyCollection={this.state.searchedGiphy}/>
      </div>  
    )
  }
}

render(<App />, document.getElementById('app'));