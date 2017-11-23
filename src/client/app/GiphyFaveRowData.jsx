import React from 'react';
import FaveStars from './FaveStars.jsx'; 

class GiphyFaveRowData extends React.Component {
  constructor(props) {
    super(props) 
  }

  render() {
    
    const starArr = new Array(this.props.rating)
    let style = {
      listStyleImage: "http://www.clker.com/cliparts/s/v/7/G/S/D/star-md.png"
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