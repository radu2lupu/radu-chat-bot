import React from 'react';
import Gif from './Gif';

const GifList = props => { 
  
  const results = props.results;
  let gifs;
  if (results.length > 0) {
    gifs = results.map(gif => 
      <Gif 
        url={gif.images.fixed_height.url} 
        key={gif.id}
       />
    );
  } else {
    gifs = "Sorry, no gifs were found with that search term"
  }

  return(
    <div className="element-block">
        <ul className="element-list">
          { gifs }
        </ul> 
    </div>
  );
}

export default GifList;