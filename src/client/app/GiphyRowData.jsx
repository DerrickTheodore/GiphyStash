import React from 'react';
import axios from 'axios';
import { clearInterval } from 'timers';

class GiphyRowData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseOver: false
    } 
    this.clicked = []
  }

  handleFavClick() {
    let url = this.props.giphy.images.fixed_height_small.url;
    this.clicked.push(setTimeout(() => {
        axios.post('/addFaves', {url: url})
        .then( () => {
          this.props.handleFaveSelect()
        })
      }, 300)
    )
    if(this.clicked.length === 2) {
      this.clicked.forEach(click => clearTimeout(click))
      this.clicked = [];
    }
  }

  handleImageHover() {
    this.setState({mouseOver: !this.state.mouseOver});
  }

  render() {
    return (
        <td>
        <img src={this.props.giphy.images.fixed_height_small.url} alt={`no image ${this.props.giphy.images.fixed_height_small.id}`}
          style={this.state.mouseOver ? {border: "5px solid black"} : {border: "none"}} 
          onClick={this.handleFavClick.bind(this)}
          onMouseOver={this.handleImageHover.bind(this)}
          onMouseLeave={this.handleImageHover.bind(this)}
          onDoubleClick={ (e) => { this.props.handleGiphyViewSelected(this.props.giphy.images.fixed_height_small.url, e)} }                        
          
        />
        </td>
    )
  }
}

export default GiphyRowData;

