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
      console.log(`[this.props.handleFaveSelect()]`)
      this.props.handleFaveSelect()
    })
  }


  render() {
    console.log(`this.props: ${JSON.stringify(this.props)}`)
    return (
        <td><img src={this.props.giphy.images.fixed_height_small.url} onClick={
          this.handleFavClick.bind(this)
        }/>
        </td>
    )
  }
}

export default GiphyRowData;