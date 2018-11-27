import React from 'react';

class ChatBar extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={currentUser}
          name="username"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="message"
        />
      </footer>
    );
  }
}

export default ChatBar;
