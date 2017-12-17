import React from 'react';
import axios from 'axios';
import FaveStars from './FaveStars.jsx'; 

class GiphyFaveRowData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseOver: false
    } 
  }

  handleDeleteClick() {
    let clickedImageId = this.props.giphy.id;

    axios.delete(`/image/${clickedImageId}`)
    .then( () => {
      this.props.handleFaveUpdate();
    })
  }

  handleImageHover() {
    this.setState({mouseOver: !this.state.mouseOver});
  }

  render() {
  
    const starArr = [];
    for(let i = 0; i < this.props.giphy.rating; i++) {
      starArr.push(<FaveStars giphyInfo={this.props.giphy} handleFaveUpdate={this.props.handleFaveUpdate} key={i}/>);
    }
   
    return (
        <td><img 
          src={this.props.giphy.url}
          alt={`no image ${this.props.giphy.id}`}
          style={this.state.mouseOver ? {border: "5px solid black"} : {border: "none"}}  
          onClick={this.handleDeleteClick.bind(this)}
          onMouseOver={this.handleImageHover.bind(this)}
          onMouseLeave={this.handleImageHover.bind(this)}  
          />
          {starArr}
        </td>
    )
  }
}

export default GiphyFaveRowData;