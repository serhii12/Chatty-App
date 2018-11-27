import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <main className="messages">
        {messages.map(msg => (
          <Message
            key={msg.username}
            username={msg.username}
            content={msg.content}
          />
        ))}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;
