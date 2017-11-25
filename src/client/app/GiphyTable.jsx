import React from 'react';
import GiphyRow from './GiphyRow.jsx';
// import GiphyFaveRow from './GiphyFaveRow.jsx';

class GiphyTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let set = [];
    let rows = [];
    for(let i = 0; i < this.props.giphyCollection.length; i++) {
      set.push(this.props.giphyCollection[i])
      if(set.length === 5) {
        rows.push(set);        
        set = [];
      }
    }
    return (
    <div>  
      <h3>Giphy Search Results:</h3>
      <table>
        <tbody>
          {
            rows.map((row, index) => {
              return <GiphyRow handleFaveSelect={this.props.handleFaveSelect} giphyRow={row} key={index}/>
            })
          }
        </tbody>
      </table>
    </div>
    )
  }
}

export default GiphyTable;