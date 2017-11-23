import React from 'react';
import axios from 'axios';

class FaveStars extends React.Component{
    constructor(props){
      super(props)
    }

    handleRatingDblClick() {
      let imageId = this.props.giphyInfo.id;
      let imageCurrentRating = this.props.giphyInfo.rating < 5 ? (this.props.giphyInfo.rating + 1) : this.props.giphyInfo.rating;
      axios.put(`/updateRating/${imageId}-${imageCurrentRating}`)
      .then( () => {
        this.props.handleFaveUpdate();
      });
    }

    handleRatingClick() {
      let imageId = this.props.giphyInfo.id;
      let imageCurrentRating = this.props.giphyInfo.rating > 1 ? (this.props.giphyInfo.rating - 1) : this.props.giphyInfo.rating;
      axios.put(`/updateRating/${imageId}-${imageCurrentRating}`)
      .then( () => {
        this.props.handleFaveUpdate();
      });
    }

    render() { 
      return (
      <div><img onClick={this.handleRatingClick.bind(this)} onDoubleClick={this.handleRatingDblClick.bind(this)}height="25" width="25" src="http://www.clker.com/cliparts/s/v/7/G/S/D/star-md.png"/></div>
      )
    }
}

export default FaveStars;