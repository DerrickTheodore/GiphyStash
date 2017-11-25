import React from 'react';
// import GiphyRow from './GiphyRow.jsx';
import GiphyFaveRow from './GiphyFaveRow.jsx';


class GiphyFaveTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let favSet = [];
    let favRows = [];
    for(let j = 0; j < this.props.faveGiphyCollection.length; j++) {
      favSet.push(this.props.faveGiphyCollection[j])
      if(favSet.length === 5) {
        favRows.push(favSet);        
        favSet = [];
      } else if(this.props.faveGiphyCollection.length === favSet.length) {
        favRows.push(favSet);        
        favSet = [];
      } else if(((this.props.faveGiphyCollection.length - j) % 5) && j === ((this.props.faveGiphyCollection.length - 1))) {
        favRows.push(favSet);
      }
    }
    return (
    <div>  
      <h3>My Favorite Giphies:</h3>
      <table>
        <tbody>
          {
            favRows.map((row, index) => {
              return <GiphyFaveRow giphyRow={row} handleFaveUpdate={this.props.handleFaveUpdate} key={index}/>
            })
          }
        </tbody>
      </table>
    </div>
    )
  }
}

export default GiphyFaveTable;