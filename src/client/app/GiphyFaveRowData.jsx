import React from 'react';
import FaveStars from './FaveStars.jsx'; 

class GiphyFaveRowData extends React.Component {
  constructor(props) {
    super(props) 
  }

  render() {
    
    const starArr = new Array(this.props.rating)
    let style = {
    }

    return (
        <td><img src={this.props.giphy.url} />
          <ul style={style}>{starArr.map( (_, index) => {
            return <FaveStars key={index}/>
          })}</ul>
        </td>
    )
  }
}

export default GiphyFaveRowData;