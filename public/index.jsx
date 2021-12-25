const React = require('react');
const ReactDOM = require('react-dom');
const { io } = require("socket.io-client");
const socket = io(window.location.origin);

// page components
import css from './style.css';
import Homepage from './components/home.jsx';
import Invitepage from './components/invite.jsx';


// utility methods
// switch to a different page by re-rendering
const switchPage = (page) => {
  ReactDOM.render(page, document.getElementById('root'));
}

// send formatted post request
const request = (data, url) => {
  return new Promise((resolve, reject) => {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    fetch(url, params)
      .then(response => {
        if(response.ok) {
          resolve(response.json());
        }
        else
          reject('Error on POST Request');
      });
  });
}



// UI controllers
// homepage
const init = () => {
  // entry point dom node for react
  const entry = document.createElement("div");
  entry.id = 'root';
  document.body.appendChild(entry);

  // give socketIO time to connect before rendering anything
  socket.on('connect', router);
};

// switch entry point component based on query properties rather than path
const router = () => {
  const query = new URLSearchParams(window.location.search);

  // check property is valid by checking for null
  if(query.get('match') != null) {
    joinMatch();
  }
  else {
    switchPage(<Homepage onNewMatch={newMatch} />);
  }
}

// create a new match
const newMatch = () => {
  // match ID is reverse of socket.id
  const query = new URLSearchParams(window.location.search);
  query.set('match', `${socket.id}`.split('').reverse().join(''));
  history.replaceState(null, null, 'join'+'?'+query.toString());

  // attempt to join match
  joinMatch();
}

// attempt to join match ID in query
const joinMatch = () => {
  request({player: socket.id}, window.location.href)
    .then(data => {
      switch(data.status) {
        case 'host':
          switchPage(<Invitepage status = 'host'/>);
          break;
        case 'opponent':
          switchPage(<Invitepage status = 'opponent'/>);
          break;
        case 'error':
          switchPage(<Invitepage status = 'error'/>);
          break;
      }
    });
}

init();
