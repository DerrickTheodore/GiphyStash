import React from 'react';
import axios from 'axios';

class GiphyRowData extends React.Component {
  constructor(props) {
    super(props) 
  }

  handleFavClick() {
    let url = this.props.giphy.images.fixed_height_small.url;
    axios.post('/addFaves', {url: url})
    .then( () => {
      this.props.handleFaveSelect()
    })
  }


  render() {
    return (
        <td><img src={this.props.giphy.images.fixed_height_small.url} onClick={
          this.handleFavClick.bind(this)
        }/>
        </td>
    )
  }
}

export default GiphyRowData;