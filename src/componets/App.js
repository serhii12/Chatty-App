import React from 'react';
import MessageList from './MessageList';
import ChatBar from './ChatBar';
import { generateRandomId } from '../helper';

const SOCKET = new WebSocket('ws://localhost:8080');

class App extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      messages: [
        {
          id: generateRandomId(),
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: generateRandomId(),
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
        },
      ],
      currentUser: { name: 'Anonymous', hasName: false },
    };
  }

  componentDidMount() {
    const { messages } = this.state;
    SOCKET.onopen = function(event) {
      SOCKET.send("Here's some text that the server is urgently awaiting!");
    };

    // setTimeout(() => {
    //   const newMessage = {
    //     id: generateRandomId(),
    //     username: 'Michelle',
    //     content: 'Hello there!',
    //   };
    //   const newMessages = [...messages, newMessage];
    //   this.setState({ messages: newMessages });
    // }, 3000);
  }

  addMessage = msg => {
    const {
      messages,
      currentUser: { name },
    } = this.state;
    const newMessage = {
      id: generateRandomId(),
      username: name,
      content: msg,
    };
    const newMessages = [...messages, newMessage];
    this.setState({ messages: newMessages });
  };

  setCurrentUser = user => {
    this.setState({ currentUser: { name: user, hasName: true } });
  };

  render() {
    const {
      messages,
      currentUser: { name, hasName },
    } = this.state;
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={messages} />
        <ChatBar
          currentUser={name}
          hasName={hasName}
          addMessage={this.addMessage}
          setCurrentUser={this.setCurrentUser}
        />
      </div>
    );
  }
}

export default App;
