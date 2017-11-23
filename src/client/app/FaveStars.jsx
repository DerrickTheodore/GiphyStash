import React from 'react';
import axios from 'axios';
import { clearInterval } from 'timers';

class FaveStars extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        timeOutId: []
      }
    }

    handleRatingDblClick() {
      /**
       * This was tricky...
       */
      let imageId = this.props.giphyInfo.id;

      let imageCurrentRating = this.props.giphyInfo.rating < 5 ? (this.props.giphyInfo.rating + 1) : this.props.giphyInfo.rating;

      //Here we've triggered a doubleClick event aka two back to back clicks, I'm not sure of the set time interval.
      //Anyways, we're going to iterate through our state obj for those setimeout timeoutid from before and clear them
      this.state.timeOutId.forEach((id) => {clearTimeout(id)});

      axios.put(`/updateRating/${imageId}-${imageCurrentRating}`)
      .then( () => {
        this.props.handleFaveUpdate();
      });
      
      //Now since we cleared our timeoutid, we can reset our state object back to an empty array so we can be ready for the next set of similar events
      this.setState({timeOutId: []})
    }

    handleRatingClick() {
      let imageId = this.props.giphyInfo.id;

      let imageCurrentRating = this.props.giphyInfo.rating > 1 ? (this.props.giphyInfo.rating - 1) : this.props.giphyInfo.rating;
      
      //Here setTimeout returns a timeoutId for the function passed in, which I've wrapped in a function, 
      //so my axios call happens when timer is up; instead of immediately.
      //each time a click happens we're going to store id variable and push it into an array in this components state object
      //Now.. to DblClick()
      let id = setTimeout(() => {
        axios.put(`/updateRating/${imageId}-${imageCurrentRating}`)
        .then( () => {
          this.props.handleFaveUpdate();
      })}, 300);

      this.state.timeOutId.push(id)
    }

    render() { 
      return (
      <div><img onClick={this.handleRatingClick.bind(this)} onDoubleClick={this.handleRatingDblClick.bind(this)}height="25" width="25" src="http://www.clker.com/cliparts/s/v/7/G/S/D/star-md.png"/></div>
      )
    }
}

export default FaveStars;