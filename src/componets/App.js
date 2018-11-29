import React from 'react';
import MessageList from './MessageList';
import ChatBar from './ChatBar';

const SOCKET = new WebSocket('ws://localhost:8081');

class App extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      messages: [],
      currentUser: { name: 'Anonymous', hasName: false, color: null },
      onlineUsers: null,
    };
  }

  componentDidMount() {
    SOCKET.onmessage = msg => {
      const { messages, currentUser } = this.state;
      const dataFromServerMSG = JSON.parse(msg.data);
      const { type, id, content, username, color } = dataFromServerMSG;
      const newMessage = {
        type,
        id,
        username,
        content,
        color,
      };
      const newNotification = {
        id,
        type,
        content,
      };
      switch (type) {
        case 'incomingMessage': {
          this.setState({ messages: [...messages, newMessage] });
          break;
        }
        case 'incomingNotification': {
          this.setState({ messages: [...messages, newNotification] });
          break;
        }
        case 'onlineUsers': {
          this.setState({
            onlineUsers: dataFromServerMSG.counter,
          });
          break;
        }
        case 'newUserColor': {
          this.setState({
            currentUser: {
              ...currentUser,
              color: dataFromServerMSG.randomColor,
            },
          });
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
      currentUser: { name, color },
    } = this.state;
    const newMessage = {
      color,
      type: 'postMessage',
      username: name,
      content: msg,
    };
    SOCKET.send(JSON.stringify(newMessage));
  };

  setCurrentUser = user => {
    const {
      currentUser: { name, color },
    } = this.state;
    if (user === name) {
      return;
    }
    const newNotification = {
      type: 'postNotification',
      content: `${name} has changed their name to ${user}`,
    };
    SOCKET.send(JSON.stringify(newNotification));
    this.setState({ currentUser: { name: user, hasName: true, color } });
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
