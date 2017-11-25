import React from 'react';
import { Route } from 'react-router-dom';
import GiphyTable from './GiphyTable.jsx';

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchInput: ''
    }
  }

  handleSearchChange(e) {
    this.setState({searchInput: e.target.value})
  }

  render() {
    return (  
      <div>
        <h2>Homepage:</h2>
        Giphy Search:<br/>
              <input type="text" name="query" onChange={this.handleSearchChange.bind(this)}/>
              <button  type="submit" onClick={(e) => this.props.props.handleGiphySearch(e, this.state.searchInput)}>Search</button>
            <GiphyTable handleFaveSelect={this.props.props.handleFaveUpdate} giphyCollection={this.props.props.giphyCollection}/>
      </div>
    )
  }
}

export default Home;
