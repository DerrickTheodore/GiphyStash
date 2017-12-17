import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './Home.jsx';
import Favorites from './Favorites.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
//moving theses to index.js for userHandling
// import SignUp from './SignUp.jsx';
// import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const API_KEY = require('../API_KEYs')

const ExampleImageData = [
  {
    images: {
      fixed_height_small: {
        url: "https://media2.giphy.com/media/26n79t82lmj989iAE/100.gif",
        id: 0
      }
    }

  },
  {
    images: {
      fixed_height_small: {
        url: "https://media2.giphy.com/media/26n79t82lmj989iAE/101.gif",
        id: 1
      }
    }

  },
  {
    images: {
      fixed_height_small: {
        url: "https://media2.giphy.com/media/26n79t82lmj989iAE/102.gif",
        id: 2
      }
    }

  },
  {
    images: {
      fixed_height_small: {
        url: "https://media2.giphy.com/media/26n79t82lmj989iAE/103.gif",
        id: 3
      }
    }

  },
  {
    images: {
      fixed_height_small: {
        url: "https://media2.giphy.com/media/26n79t82lmj989iAE/104.gif",
        id: 4
      }
    }

  }
]

class Main extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        searchedGiphys: [],
        favGiphys: [],
        selectValue: '',
        currentGiphyView: null
      }
  }

  handleGiphySearch(e, searchInput) {
    e.preventDefault();
    const randomNumberBetweenZeroWithLimit = (number, limit) => {
      let maxCountLimit = number > limit ? limit : number;
	    let randomInDec = Math.random() * maxCountLimit	
      return Math.random() * maxCountLimit < 0 ? 0 : Math.floor(randomInDec);
    }
    
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchInput.replace(/\s+/g,'+')}&api_key=${API_KEY.giphy}&limit=25`)
    .then( (result) => {
      let queryTotalResults = result.data.pagination.total_count;
      let randomOffset = randomNumberBetweenZeroWithLimit(queryTotalResults, 5000); 
      axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchInput.replace(/\s+/g,'+')}&api_key=${API_KEY.giphy}&limit=25&offset=${randomOffset}`)
      .then( (result) => {
        this.setState({searchedGiphys: result.data.data});
      })
      .catch(err => console.error(err));  
    })
    .catch(err => console.error(err)); 
  }

  handleFaveUpdate() {
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data});
    })
  }

  handleSelectChange(e) {
    this.setState({selectValue: e.target.value})
    axios.get(`/rating/${e.target.value}`)
    .then( (result) => {
      this.setState({favGiphys: result.data});
    })
  }

  handleGiphyViewSelected(giphy, evt) {  
    this.setState({currentGiphyView: giphy})
  }

  componentDidMount() {
    // this.setState({searchedGiphys: ExampleImageData})
    axios.get('/allFav')
    .then( (result) => {
      this.setState({favGiphys: result.data})
    })
  }

  render() {
    return(
      <main>
        <Header />
        <Switch>
          <Route exact path='/login' component={ () => <Login 
            handleSignUpSubmit={this.props.handleSignUpSubmit.bind(this)}
            handleLoginSubmit={this.props.handleLoginSubmit.bind(this)}
          />}/>
          <Route exact path='/' component={ () => <Home
            currentGiphyView={this.state.currentGiphyView}
            handleGiphyViewSelected={this.handleGiphyViewSelected.bind(this)}  
            handleGiphySearch={this.handleGiphySearch.bind(this)}
            handleFaveUpdate={this.handleFaveUpdate.bind(this)}
            giphyCollection={this.state.searchedGiphys}
           /> }/>
          <Route exact path='/favorites' component={ () => <Favorites
            selectValue={this.state.selectValue}
            handleSelectChange={this.handleSelectChange.bind(this)}
            handleFaveUpdate={this.handleFaveUpdate.bind(this)}
            faveGiphyCollection={this.state.favGiphys}
            /> }/>
          <Route exact path='/*' component={ NotFound }/>
        </Switch> 
      </main>
    );
  }
}

export default Main;

