# Ghatty

- Primarily a client-side SPA (single-page app) built with ReactJS
- Based on the HTML and CSS provided
- Contains a chat log displaying messages and notifications
- Contains an input field to change your name and an input field to send a message
- The client-side app communicates with a server via WebSockets for multi-user - real-time updates
- No persistent database is involved; the focus is on the client-side experience

## Getting Started

1. Install dependencies: `npm i`
2. Open server folder and install dependencies: `npm i`
3. Run the server: `node server.js`
4. Open the main folder and run `npm start`
5. Visit `http://localhost:8081/`
6. Enjoy!

## Dependencies

- react
- react-dom
- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader
- css-loader
- html-webpack-plugin
- style-loader
- webpack
- webpack-cli
- webpack-dev-server