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
                color={msg.color}
                content={msg.content}
              />
            );
          }
          if (msg.type === 'incomingNotification') {
            return <Notification key={msg.id} content={msg.content} />;
          }
        })}
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default MessageList;
