import React from 'react';

class GiphyRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td><img src={this.props.giphy.images.fixed_height_small.url} /></td>
      </tr>
    )
  }
}

export default GiphyRow;