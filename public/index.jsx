const React = require('react');
const ReactDOM = require('react-dom');
const { io } = require("socket.io-client");
const socket = io();

// page components
import css from './style.css';
import Homepage from './components/home.jsx';
import Invitepage from './components/invite.jsx';


const init = () => {
  // entry point dom node for react
  const entry = document.createElement("div");
  entry.id = 'root';
  document.body.appendChild(entry);

  // render homepage
  switchPage(<Homepage onNewMatch={newMatch} />);
};

// switch to a different page by re-rendering
const switchPage = (page) => {
  ReactDOM.render(page, document.getElementById('root'));
}

// ui controllers
const newMatch = () => {
  switchPage(<Invitepage />)
}

init();
