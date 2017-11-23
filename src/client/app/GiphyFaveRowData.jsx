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
    
    const starArr = new Array(this.props.rating)
   
    return (
        <td><img src={this.props.giphy.url} onClick={this.handleDeleteClick.bind(this)}/>
          {starArr.map( (_, index) => {
            return <FaveStars key={index}/>
          })}
        </td>
    )
  }
}

export default GiphyFaveRowData;