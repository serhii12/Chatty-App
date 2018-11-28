import React from 'react';
import PropTypes from 'prop-types';

export default function Notifications({ content }) {
  return <div className="message system">{content}</div>;
}

Notifications.propTypes = {
  content: PropTypes.string.isRequired,
};
