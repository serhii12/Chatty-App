import React from 'react';
import MessageList from './MessageList';
import ChatBar from './ChatBar';

const SOCKET = new WebSocket('ws://localhost:8081');

class App extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      messages: [],
      currentUser: { name: 'Anonymous', hasName: false },
    };
  }

  componentDidMount() {
    SOCKET.onmessage = msg => {
      const { messages } = this.state;
      const messageToDisplay = JSON.parse(msg.data);
      const { id, content, username } = messageToDisplay;
      const newMessage = {
        id,
        username,
        content,
      };
      const newMessages = [...messages, newMessage];
      this.setState({ messages: newMessages });
    };
  }

  addMessage = msg => {
    const {
      messages,
      currentUser: { name },
    } = this.state;
    const newMessage = {
      username: name,
      content: msg,
    };
    SOCKET.send(JSON.stringify(newMessage));
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
