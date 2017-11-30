import React from 'react';
import { Route } from 'react-router-dom';
import GiphyFaveTable from './GiphyFaveTable.jsx';


class Favorites extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    let eVal;

    return (
      <div>
        Giphy Search by Rating:
        <br/>
        <br/>
        <select onChange={(e) => {
          this.props.handleSelectChange(e);
        }
        } value={this.props.selectValue}>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </select>
        <GiphyFaveTable handleFaveUpdate={this.props.handleFaveUpdate} faveGiphyCollection={this.props.faveGiphyCollection}/>
      </div>
    )
  }
}

export default Favorites;
