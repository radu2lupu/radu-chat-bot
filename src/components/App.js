import React, { Component } from 'react';
import RaduChatBot from './RaduChatBot';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="app-title">
        </div>
        <div className="chat-window">
          <RaduChatBot
          />
        </div>
      </div>
    );
  }
}

export default App;
