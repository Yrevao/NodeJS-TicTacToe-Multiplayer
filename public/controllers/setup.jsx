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

  utils.request({player: socketSession.id}, window.location.href)
    .then(data => {
      if(!data.status.error) {
        // socketIO event for associating socket with state
        socketSession.emit('new');
        // switch page based on if the player is the host or the opponent
        switch(data.status) {
          case 'host':
            utils.switchPage(<Invitepage/>);
            break;
          case 'opponent':
            utils.switchPage(<Setuppage/>);
            break;
        }
        return;
      }
      // error in joining match
      //switchPage(<Errorpage/>);
    });
}
