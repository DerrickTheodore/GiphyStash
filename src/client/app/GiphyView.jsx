import React from 'react';

const GiphyView = (props) => {
  return(
    <div>
      <img src={props.currentGiphyView ? props.currentGiphyView : 'Loading...'} alt="" />
    </div>
  )
}

export default GiphyView;