import React from 'react';
import GiphyRowData from './GiphyRowData.jsx';

class GiphyRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        {this.props.giphyRow.map( (giphy, index) => {
          return <GiphyRowData handleFaveSelect={this.props.handleFaveSelect} giphy={giphy} key={index} />
        })}
      </tr>
    )
  }
}

export default GiphyRow;