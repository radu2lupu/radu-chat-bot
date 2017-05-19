import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import Job from './resume/Job';
import AboutMe from './resume/AboutMe';

import StoredResponse from './StoredResponse';

import raduLupu from '../img/RaduLupu.jpg';
import userAvatar from '../img/UserAvatar.png';
import { jobs, summary, keyPoints } from '../data/resume';

const Resume = (props) => {
  let jobs = jobs.map((job) => {
    return <Job jobTitle={job.jobTitle}
             employer={job.employer}
             key={job.id}
            />
  }); 
  return (
    <div className="resume">
      <ul>
        {jobs}
      </ul>
    </div>
  );
}

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
      )
  }
}

GeneralData.propTypes = {
    steps: PropTypes.object,
};

GeneralData.defaultProps = {
    steps: undefined,
}

class RaduChatBot extends Component {
  
  render() {
    function isNumberValidator(value) {
      if (isNaN(value)) {
        return 'The value should be a number!';
      }
      else if (value === undefined) {
        return 'Please type somthing in!';
      } 
      else if (value.match(/^\s*$/) !== null) {
        return 'No white spaces please!'
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
        return 'No white spaces please!'
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
                  message: 'Whom might you be?',
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
                    { value: 2, label: 'I want to know what the weather\'s like', trigger: 'weather' },
                    { value: 3, label: 'I don\'t want to be here anymore! Bye!', trigger: 'conversation-end' },
                  ],
                },
                {
                  id: 'me-options-1',
                  options: [
                    { value: 1, label: 'What do you do?', trigger: 'aboutMe' },
                    { value: 3, label: 'How can I contact you?', trigger: 'contact-me' },
                    { value: 4, label: 'I\'d like to go back', trigger: 'general-options-1' },
                    { value: 5, label: 'Nothing, thanks bye!', trigger: 'conversation-end' },
                  ],
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
                  id: 'aboutMe',
                  component: <StoredResponse response={summary.occupation} />,
                  asMessage: true,
                  trigger: 'me-options-2'
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
                  asMessage: false,
                  trigger: 'me-options-2'
                },
                {
                  id: 'conversation-end',
                  message: 'Great meeting you! See you around',
                  end: true
                },
        ]}
        hideHeader={true}
        hideUserAvatar={false}
        botAvatar={raduLupu}
        userAvatar={userAvatar}
      />
    );
  }
}

export default RaduChatBot;