import React from 'react';

const Gif = props => (
  <li className="element-wrap">
    <img className='gif-img' src={props.url} alt="" />
  </li>
);

export default Gif;