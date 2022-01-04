const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx';
import Invitepage from '../components/invite.jsx';



// create a new match
export const newMatch = (socketSession) => {
  routes.setSocketSession(socketSession);

  // match ID is reverse of socketSession.id
  const query = new URLSearchParams(window.location.search);
  query.set('match', `${socketSession.id}`.split('').reverse().join(''));
  history.replaceState(null, null, 'join'+'?'+query.toString());

  // attempt to join match
  routes.join();
}

// attempt to join match ID in query on /join route
export const joinMatch = (socketSession) => {
  routes.setSocketSession(socketSession);

  // request to add player to match in server state
  utils.request({player: socketSession.id}, window.location.href)
    .then(data => {
      if(!data.status.error) {
        // socketIO event for adding player's socket to socketIO room
        socketSession.emit('joinRoom');

        // switch page based on if the player is the host or the opponent
        switch(data.status) {
          case 'host':
            handleHostEvents(socketSession);
            utils.switchPage(<Invitepage/>);
            break;
          case 'opponent':
            routes.opponentSetup();
            break;
        }
        return;
      }
      // error in joining match
      // routes.joinError();
    });
}

// set a player who is already in the server state as host to the host on the client side
export const playAsHost = (socketSession) => {
  handleHostEvents(socketSession);
  utils.switchPage(<Invitepage/>);
}

// handle socketIO events
const handleHostEvents = (socketSession) => {
    socketSession.on('full', () => {
      routes.hostSetup();
    });
}
