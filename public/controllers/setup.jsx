const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Setuppage from '../components/setup.jsx';
import Invitepage from '../components/invite.jsx';



let socketSession = null;
let isFirstPlay = null;

// entry point for the controller
export const startSetup = (gameStatus, host, setSocket) => {
  socketSession = setSocket;
  routes.setSocketSession(socketSession);
  isFirstPlay = host;

  utils.switchPage(<Setuppage status={gameStatus} host={host} onReady={ready} onGoFirst={toggleFirst} ready={false} goFirst={host} opponentReady={false} opponentFirst={false}/>);
  handleEvents(host);
}

// handle socketIO events for this controller
const handleEvents = (host) => {
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
      case 'start':
        routes.startMatch(isFirstPlay, host);
        break;
    }
  });
}

// toggle server ready state for player then update UI to show current ready state
const ready = () => {
  utils.request({player: socketSession.id, type: 'ready'}, window.location.origin + '/setup')
    .then(data => {
      if(data.status != 'start')
        utils.switchPage(<Setuppage ready={(data.status == 'ready')} />);
    });
}

// host can toggle who plays first
const toggleFirst = () => {
  utils.request({player: socketSession.id, type: 'switch'}, window.location.origin + '/setup')
    .then(data => {
      isFirstPlay = (data.status == 'x');
      utils.switchPage(<Setuppage goFirst={isFirstPlay} />);
    })
}

// for when opponent is ready
const opponentReady = (status) => {
  if(status.player == socketSession.id) return;
  utils.switchPage(<Setuppage opponentReady={(status.status == 'ready')} />);
}

// shows the opponent when the host switches who plays first
const opponentFirst = (status) => {
  if(status.player == socketSession.id) return;
  
  isFirstPlay = !(status.status == 'x');
  utils.switchPage(<Setuppage goFirst={isFirstPlay} />);
}
