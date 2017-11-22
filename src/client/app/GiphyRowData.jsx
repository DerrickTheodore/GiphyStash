import React from 'react';

class GiphyRowData extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <td><img src={this.props.giphy.images.fixed_height_small.url}/></td>
    )
  }
}

export default GiphyRowData;