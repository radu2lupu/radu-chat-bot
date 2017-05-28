import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loading } from 'react-simple-chatbot';

import NewsList from './NewsList';


class NewsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      results: '',
      trigger: false,
    };
    this.triggetNext = this.triggetNext.bind(this);
  }
  
  getAllStoriesFromSources(sources) {
    if(sources) {
      sources.map(source => console.log(source.id));
    } else {
      console.log("Sources is empty");
    }
  }

  componentWillMount() {
    const { steps } = this.props;
    console.log(steps);
    const category = steps.newsOptions.value;
    
    const getSourcesForCategory = (category) => {
      axios.get(`https://newsapi.org/v1/sources?language=en&category=${category}&apiKey=698e5e8ae3de4b3b9d4ebad388d60d87`)
        .then(responseData => {
          if(responseData.data.sources) {
            const sources = responseData.data.sources;
            const stories = [];
            console.log(sources);
            if(stories.length < 50) {
              for( let i = 0; i < sources.length; i ++ ) {
              const source = sources[i].id;
              axios.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=698e5e8ae3de4b3b9d4ebad388d60d87`)
                .then(responseData => {
                  const storyBySource = responseData.data.articles;
                  if(storyBySource) {
                    for( let i = 0; i < storyBySource.length; i ++ ) {
                      if(storyBySource[i].urlToImage && storyBySource[i].urlToImage.includes('https')) {
                        stories.push(storyBySource[i]);
                      }
                    }
                  }
                  this.setState({ 
                    results: stories,
                  });
                })
                .catch(error => {
                  console.log("Error fetching data", error);
                });
              }
            }
          }
          this.setState({ 
            loading: false,
          });
        })
        .catch(error => {
          console.log("Error fetching data", error);
        });
    };
    getSourcesForCategory(category);
  }

  

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, results, trigger } = this.state;
    return (
      <div className="news">
        { loading ? <Loading /> : <NewsList results={results} /> }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext()}
              >
                I want something else
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

NewsBlock.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

NewsBlock.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default NewsBlock;