import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';

import Job from './resume/Job';
import AboutMe from './resume/AboutMe';
import Contact from './resume/Contact';

import GifList from './gifs/GifList';
import NewsList from './news/NewsList';

import StoredResponse from './StoredResponse';
import Resume from './resume/Resume';

import raduLupu from '../img/RaduLupu.jpg';
import userAvatar from '../img/UserAvatar.png';
import { summary, keyPoints } from '../data/resume';

const getNewsSources = () => {
  const sources = (() => {
    axios.get(`https://newsapi.org/v1/sources?language=en&apiKey=698e5e8ae3de4b3b9d4ebad388d60d87`)
    .then(response => {
      this.sources = response.data.sources;
    })
    .catch(error => {
      console.log("Error fetching data", error);
    });
  })();
  let newsSources = [];
  console.log(sources);
  
  return newsSources;
};

const avatarStyle = {
  'borderRadius': '50%',
	'width': '4rem',
	'height': '4rem',
	'boxShadow': 'none'
};

const style = {
  'fontFamily': '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
  'fontWeight': '900',
  'marginTop': '5%',
	'width': '100%',
	'backgroundColor': '#010440',
	'boxShadow': 'none',
	'borderRadius': '0px',
	'fontSize': '1rem',
	'color': '#fff'
};


const contentStyle = {
	'height': '82vh',
	'overflowY': 'auto',
	'maxHeight': '1200px'
};

const bubbleStyle = {
  'backgroundColor': '#010440',
  'fontSize': '1rem',
  'boxShadow': 'none',
  'margin': '0'
};

const customStyle = {
  'backgroundColor': '#0410FF',
  'borderRadius': '0px'
};

const userFontColor = '#fff';

class NewsBlock extends Component {
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
    const self = this;
    const { steps } = this.props;
    const query = 'the-next-web';
    
    const performSearch = (query = 'the-next-web') => {
      axios.get(`https://newsapi.org/v1/articles?source=${query}&sortBy=latest&apiKey=698e5e8ae3de4b3b9d4ebad388d60d87`)
        .then(responseData => {
          this.setState({ 
            result: responseData.data.articles,
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
      <div className="news">
        { loading ? <Loading /> : <NewsList data={result} /> }
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
                Go back
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
    const self = this;
    const { steps } = this.props;
    const query = steps.searchGif.value;
    
    const performSearch = (query = 'cats') => {
      axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
        .then(responseData => {
          console.log(responseData)
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
                Go back
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

GifList.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

GifList.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

class GeneralData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };
  }
  componentWillMount() {
    const { steps } = this.props;
    const { userName } = steps;

    this.setState({ userName });
  }
  render () {
      const { userName } = this.state;
      return (
          <p>What would you like to do {userName.value}?</p>
      );
  }
}

GeneralData.propTypes = {
    steps: PropTypes.object,
};

GeneralData.defaultProps = {
    steps: undefined,
};

class RaduChatBot extends Component {
  render() {
    const newsSources = getNewsSources();
    console.log(newsSources);
    function isNumberValidator(value) {
      if (isNaN(value)) {
        return 'The value should be a number!';
      }
      else if (value === undefined) {
        return 'Please type somthing in!';
      } 
      else if (value.match(/^\s*$/) !== null) {
        return 'No white spaces please!';
      } else if (value < 0) {
        return 'The value should be positive!';
      }
      return true;
    }

    function isNotEmpty(value) {
      if (value === undefined) {
        return 'Please type somthing in!';
      } 
      else if (value.match(/^\s*$/) !== null) {
        return 'No white spaces please!';
      }
      return true;
    }

    return (
      <ChatBot
        steps={[
                {
                  id: 'introduction-1',
                  message: 'Hi there!',
                  trigger: 'introduction-2',
                },
                {
                  id: 'introduction-2',
                  message: 'As you\'ve probably already guessed I\'m Radu.',
                  trigger: 'introduction-3',
                },
                {
                  id: 'introduction-3',
                  message: 'What\'s your name?',
                  trigger: 'userName',
                },
                {
                  id: 'userName',
                  user: true,
                  trigger: 'introduction-4',
                  validator: isNotEmpty
                },
                {
                  id: 'introduction-4',
                  message: 'Nice to meet you {previousValue}.',
                  trigger: 'question-1'
                },
                {
                  id: 'question-1',
                  component: <GeneralData />,
                  asMessage: true,
                  trigger: 'general-options-1'
                },
                {
                  id: 'general-options-1',
                  options: [
                    { value: 1, label: 'I\'d like to know more about you.', trigger: 'me-options-1' },
                    { value: 3, label: 'I want to search for a gif', trigger: 'searchPrompt' },
                    { value: 5, label: 'I want some tech news', trigger: 'newsResult' },
                    { value: 4, label: 'I don\'t want to be here anymore! Bye!', trigger: 'conversation-end' },
                  ],
                },
                {
                  id: 'newsOptions',
                  options: newsSources
                },
                {
                  id: 'searchPrompt',
                  message: 'Type in what you\'d like to search:',
                  trigger: 'searchGif'
                },
                {
                  id: 'newsResult',
                  component: <NewsBlock />,
                  waitAction: true,
                  trigger: 'general-options-1'
                },
                {
                  id: 'searchGif',
                  user: true,
                  trigger: 'gifResults',
                  validator: isNotEmpty
                },
                {
                  id: 'gifResults',
                  component: <GifBlock />,
                  waitAction: true,
                  trigger: 'general-options-1'
                },
                {
                  id: 'me-options-1',
                  options: [
                    { value: 1, label: 'What do you do?', trigger: 'aboutMe' },
                    { value: 3, label: 'How can I contact you?', trigger: 'contactMe' },
                    { value: 4, label: 'I\'d like to go back', trigger: 'general-options-1' },
                    { value: 5, label: 'Nothing, thanks bye!', trigger: 'conversation-end' },
                  ],
                },
                {
                  id: 'contactMe',
                  component: <Contact />,
                  asMessage: true,
                  trigger: 'me-options-1'
                },
                {
                  id: 'aboutMe',
                  component: <StoredResponse response={summary.occupation} />,
                  asMessage: true,
                  trigger: 'me-options-2'
                },
                {
                  id: 'me-options-2',
                  options: [
                    { value: 1, label: 'What are currently doing?', trigger: 'currentJob' },
                    { value: 2, label: 'What areas are you specialised in?', trigger: 'keyPoints' },
                    { value: 3, label: 'What do you enjoy doing the most?', trigger: 'passion' },
                    { value: 4, label: 'I\'d like to go back', trigger: 'me-options-1' },
                    { value: 5, label: 'Nothing, thanks bye!', trigger: 'conversation-end' },
                  ],
                },
                {
                  id: 'currentJob',
                  component: <StoredResponse response={summary.current} />,
                  asMessage: true,
                  trigger: 'me-options-2'
                },
                {
                  id: 'passion',
                  component: <StoredResponse response={summary.passion} />,
                  asMessage: true,
                  trigger: 'me-options-2'
                },
                {
                  id: 'resume',
                  component: <Resume />,
                  asMessage: false,
                  trigger: 'me-options-2'
                },
                {
                  id: 'keyPoints',
                  component: <StoredResponse response={keyPoints} />,
                  asMessage: true,
                  trigger: 'me-options-2'
                },
                {
                  id: 'conversation-end',
                  message: 'Great meeting you! See you around',
                  end: true
                },
        ]}
        hideHeader={true}
        hideUserAvatar={true}
        style={style}
        contentStyle={contentStyle}
        avatarStyle={avatarStyle}
        bubbleStyle={bubbleStyle}
        inputStyle={bubbleStyle}
        customStyle={customStyle}
        botAvatar={raduLupu}
        userAvatar={userAvatar}
        userFontColor={userFontColor}
      />
    );
  }
}

export default RaduChatBot;