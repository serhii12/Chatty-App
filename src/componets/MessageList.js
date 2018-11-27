import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { generateRandomId } from '../helper';

class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <main className="messages">
        {messages
          ? messages.map(msg => (
              <Message
                key={generateRandomId()}
                username={msg.username}
                content={msg.content}
              />
            ))
          : ''}
        <div className="message system">SYSTEM</div>
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default MessageList;
