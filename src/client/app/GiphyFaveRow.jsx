import React from 'react';
import GiphyFaveRowData from './GiphyFaveRowData.jsx';

class GiphyFaveRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        {this.props.giphyRow.map( (giphy, index) => {
          return <GiphyFaveRowData handleFaveUpdate={this.props.handleFaveUpdate} giphy={giphy} key={index} />
        })}
      </tr>
    )
  }
}

export default GiphyFaveRow;