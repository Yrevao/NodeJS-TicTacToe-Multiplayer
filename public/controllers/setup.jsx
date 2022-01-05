const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Setuppage from '../components/setup.jsx';
import Invitepage from '../components/invite.jsx';

let socketSession = null;

export const startSetup = (host, setSocket) => {
  socketSession = setSocket;

  utils.switchPage(<Setuppage host={host} onReady={ready} onGoFirst={toggleFirst} ready={false} goFirst={host} opponentReady={false} opponentFirst={false}/>);
  handleEvents();
}

const handleEvents = () => {
  socketSession.on('leave', () => {
    routes.inviteNoJoin();
  });
  socketSession.on('setup', (data) => {
    switch(data.type) {
      case 'ready':
        opponentReady(data);
        break;
      case 'switch':
        opponentFirst(data);
        break;
    }
  });
}

// toggle server ready state for player then update UI to show current ready state
const ready = () => {
  utils.request({player: socketSession.id, type: 'ready'}, window.location.origin + '/setup')
    .then(data => {
      utils.switchPage(<Setuppage ready={(data.status == 'ready') ? true : false} />);
    });
}

// host can toggle who plays first
const toggleFirst = () => {
  utils.request({player: socketSession.id, type: 'switch'}, window.location.origin + '/setup')
    .then(data => {
      utils.switchPage(<Setuppage goFirst={(data.status == 'x') ? true : false} />);
    })
}

// for when opponent is ready
const opponentReady = (status) => {
  if(status.player == socketSession.id) return;

  utils.switchPage(<Setuppage opponentReady={(status.status == 'ready') ? true : false} />);
}

// shows the opponent when the host switches who plays first
const opponentFirst = (status) => {
  if(status.player == socketSession.id) return;

  utils.switchPage(<Setuppage goFirst={(status.status == 'x') ? false : true} />);
}
