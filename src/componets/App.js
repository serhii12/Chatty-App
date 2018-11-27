import React from 'react';
import MessageList from './MessageList';
import ChatBar from './ChatBar';

class App extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        },
      ],
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
    };
  }

  render() {
    const {
      messages,
      currentUser: { name },
    } = this.state;
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={messages} />
        <ChatBar currentUser={name} />
      </div>
    );
  }
}

export default App;
