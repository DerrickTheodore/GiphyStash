import React from 'react';
import GiphyRow from './GiphyRow.jsx';

class GiphyTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div>  
      {console.log(`this.props.giphyCollection: ${Array.isArray(this.props.giphyCollection)}`)}
      <h3>Giphy Search Results:</h3>
      <table>
        <thead>
          
        </thead>
        <tbody>
          {this.props.giphyCollection.map( (giphy, index) => {
            return <GiphyRow giphy={giphy} key={index}/>
          })}
        </tbody>
      </table>
    </div>
    )
  }
}

export default GiphyTable;