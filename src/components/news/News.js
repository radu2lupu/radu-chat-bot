import React from 'react';

const News = props =>  {
    const css = {
          'background': `url(${props.urlToImage})`,
          'backgroundRepeat': 'no-repeat',
          'backgroundPosition': 'center',
          'backgroundSize': 'cover'
    }
    return(
      <li className="element-item" style={css}>
        <div className="news-snippet">
          <a href={props.url} target="_blank">
            <h3>{props.title}</h3>
          </a>
        </div>
      </li>
    );
};

export default News;