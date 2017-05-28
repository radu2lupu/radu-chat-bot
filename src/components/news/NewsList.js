import React from 'react';
import News from './News';

const NewsList = props => { 
  const results = props.results;
  let news;
  if (results.length > 0) {
    news = results.map(item => 
      <News 
        author={item.author} 
        title={item.title}
        description={item.description}
        url={item.url}
        urlToImage={item.urlToImage}
        publishedAt={item.publishedAt}
        key={item.title} 
       />
    );
  } else {
    news = "Sorry, no news today"
  }

  return(
    <div className="element-block">
        <ul className="element-list">
          { news }
        </ul>
        <a href="newsapi.org">Powered by NewsAPI</a>
    </div>
  );
}

export default NewsList;