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
      onlineUsers: 0,
    };
  }

  componentDidMount() {
    SOCKET.onmessage = msg => {
      const { messages } = this.state;
      const messageToDisplay = JSON.parse(msg.data);
      const { type, id, content, username } = messageToDisplay;
      const newMessage = {
        type,
        id,
        username,
        content,
      };
      const newNotification = {
        id,
        type,
        content,
      };
      switch (type) {
        case 'incomingMessage': {
          const newMessages = [...messages, newMessage];
          this.setState({ messages: newMessages });
          break;
        }
        case 'incomingNotification': {
          const newNotifications = [...messages, newNotification];
          this.setState({ messages: newNotifications });
          break;
        }
        case 'newUser': {
          this.setState({ onlineUsers: messageToDisplay.counter });
          break;
        }
        default:
          // show an error in the console if the message type is unknown
          throw new Error(`Unknown event type ${type}`);
      }
    };
  }

  addMessage = msg => {
    const {
      currentUser: { name },
    } = this.state;
    const newMessage = {
      type: 'postMessage',
      username: name,
      content: msg,
    };
    SOCKET.send(JSON.stringify(newMessage));
  };

  setCurrentUser = user => {
    const {
      currentUser: { name },
    } = this.state;
    if (user === name) {
      return;
    }
    const newNotification = {
      type: 'postNotification',
      content: `${name} has changed their name to ${user}`,
    };
    SOCKET.send(JSON.stringify(newNotification));
    this.setState({ currentUser: { name: user, hasName: true } });
  };

  render() {
    const {
      messages,
      onlineUsers,
      currentUser: { name, hasName },
    } = this.state;
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <p>Users Online: {onlineUsers}</p>
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
