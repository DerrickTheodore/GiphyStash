import React from 'react';
import { Route } from 'react-router-dom';
import GiphyFaveTable from './GiphyFaveTable.jsx';


class Favorites extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <GiphyFaveTable faveGiphyCollection={this.props.props.faveGiphyCollection}/>
    )
  }
}

export default Favorites;
