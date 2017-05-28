import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loading } from 'react-simple-chatbot';

import GifList from './GifList';


class GifBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const { steps } = this.props;
    const query = steps.searchGif.value;
    
    const performSearch = (query = 'cats') => {
      axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
        .then(responseData => {
          this.setState({ 
            result: responseData.data.data,
            loading: false
          });
        })
        .catch(error => {
          console.log("Error fetching data", error);
        });
    };
    performSearch(query);
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, result, trigger } = this.state;

    return (
      <div className="gifs">
        { loading ? <Loading /> : <GifList results={result} /> }
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

GifBlock.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

GifBlock.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default GifBlock;