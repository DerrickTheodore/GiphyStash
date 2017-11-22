import React from 'react';
import {render} from 'react-dom'; //Using destructing here to grab this method off react-dom object

class App extends React.Component {
  render() {
    return <p>Testing testing...</p>;
  }
}

render(<App />, document.getElementById('app'));