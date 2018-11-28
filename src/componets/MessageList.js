import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import Notification from './Notification';

class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <main className="messages">
        {(messages || []).map(msg => {
          if (msg.type === 'incomingMessage') {
            return (
              <Message
                key={msg.id}
                username={msg.username}
                content={msg.content}
              />
            );
          }
          return <Notification key={msg.id} content={msg.content} />;
        })}
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default MessageList;
