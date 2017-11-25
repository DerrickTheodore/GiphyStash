import React from 'react';
// import GiphyRow from './GiphyRow.jsx';
import GiphyFaveRow from './GiphyFaveRow.jsx';


class GiphyFaveTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  //   let set = [];
  //   let rows = [];
  //   for(let i = 0; i < this.props.giphyCollection.length; i++) {
  //     set.push(this.props.giphyCollection[i])
  //     if(set.length === 5) {
  //       rows.push(set);        
  //       set = [];
  //     }
  //   }

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
      {/* <h3>Giphy Search Results:</h3>
      <table>
        <tbody>
          {
            rows.map((row, index) => {
              return <GiphyRow handleFaveSelect={this.props.handleFaveUpdate} giphyRow={row} key={index}/>
            })
          }
        </tbody>
      </table> */}
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