import React from 'react';
import GiphyRow from './GiphyRow.jsx';

class GiphyTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let set = []
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
      {console.log(`this.props.giphyCollection: ${Array.isArray(this.props.giphyCollection)}`)}
      <h3>Giphy Search Results:</h3>
      <table>
        <thead>
          
        </thead>
        <tbody>
          {
            rows.map((row, index) => {
              return <GiphyRow giphyRow={row} key={index}/>
            })
          }
          {/* {this.props.faveGiphyCollection.map( (giphy, index) => {
            return <GiphyRow giphy={giphy} key={index}/>
          })} */}
        </tbody>
      </table>
    </div>
    )
  }
}

export default GiphyTable;