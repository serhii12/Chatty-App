import React from 'react';
import PropTypes from 'prop-types';

export default class ChatBar extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      message: '',
      username: this.props.currentUser,
    };
  }

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event;
    const inputValue = name === 'username' ? value : value;
    this.setState({
      [name]: inputValue,
    });
    if (name === 'username' && value !== '') {
      const { setCurrentUser } = this.props;
      setCurrentUser(value);
    }
  };

  handleKeyUp = event => {
    const { addMessage } = this.props;
    const {
      keyCode,
      target: { value },
    } = event;
    if (keyCode === 13) {
      addMessage(value);
      event.target.value = '';
      return false;
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={currentUser}
          onChange={this.handleInputChange}
          name="username"
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
