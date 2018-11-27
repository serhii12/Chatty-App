import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ username, content }) {
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">{content}</span>
    </div>
  );
}

Message.propTypes = {
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
