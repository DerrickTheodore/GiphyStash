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
              {/* <div>
                Giphy Search by Rating:<br/>
                <select onChange={(e) => {
                  this.setState({selectValue: e.target.value})
                  this.props.props.handleSelectChange(e);
                }
                } value={this.state.selectValue}>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                </select>
              </div> */}
            <GiphyTable handleFaveSelect={this.props.props.handleFaveUpdate} giphyCollection={this.props.props.giphyCollection}/>
      </div>
    )
  }
}

export default Home;

// handleFaveUpdate={this.handleFaveUpdate.bind(this)} faveGiphyCollection={this.state.favGiphys} 