import React from 'react';
import axios from 'axios';
import FaveStars from './FaveStars.jsx'; 

class GiphyFaveRowData extends React.Component {
  constructor(props) {
    super(props) 
  }

  handleDeleteClick() {
    let clickedImageId = this.props.giphy.id;

    axios.delete(`/image/${clickedImageId}`)
    .then( () => {
      this.props.handleFaveUpdate();
    })
  }

  render() {
    
    // starArr.map( (asterick, index) => {
    //   return <FaveStars giphyInfo={this.props.giphy} handleFaveUpdate={this.props.handleFaveUpdate} key={index}/>
    // })
    const starArr = [];
    for(let i = 0; i < this.props.giphy.rating; i++) {
      starArr.push(<FaveStars giphyInfo={this.props.giphy} handleFaveUpdate={this.props.handleFaveUpdate} key={i}/>);
    }
   
    return (
        <td><img src={this.props.giphy.url} onClick={this.handleDeleteClick.bind(this)}/>
          {starArr}
        </td>
    )
  }
}

export default GiphyFaveRowData;