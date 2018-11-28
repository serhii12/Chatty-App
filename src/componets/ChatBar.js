import React from 'react';
import PropTypes from 'prop-types';

const WAIT_INTERVAL = 1000;

export default class ChatBar extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      message: '',
      username: this.props.currentUser,
      typingTimeout: 0,
    };
  }

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event;
    const inputValue = name === 'username' ? value : value;
    if (name === 'username' && value.trim() !== '') {
      const { typingTimeout } = this.state;
      const { setCurrentUser } = this.props;
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      this.setState({
        [name]: inputValue,
        typingTimeout: setTimeout(() => {
          setCurrentUser(value.trim());
        }, 1000),
      });
    } else {
      this.setState({
        [name]: inputValue,
      });
    }
  };

  handleKeyUp = event => {
    const { addMessage } = this.props;
    const {
      keyCode,
      target: { value },
    } = event;
    if (keyCode === 13 && value !== '') {
      addMessage(value);
      event.target.value = '';
      return false;
    }
  };

  handleKeyDown = event => {
    const { setCurrentUser } = this.props;
    const {
      keyCode,
      target: { value },
    } = event;
    if (keyCode === 13 && value.trim() !== '') {
      setCurrentUser(value.trim());
      return false;
    }
  };

  render() {
    const { currentUser, hasName } = this.props;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={hasName ? currentUser : 'Your Name (Optional)'}
          onChange={this.handleInputChange}
          name="username"
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp}
          name="message"
        />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  currentUser: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};
