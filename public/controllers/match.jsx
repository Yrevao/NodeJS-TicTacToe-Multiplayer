const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Matchpage from '../components/match.jsx';



let socketSession = null;
let host = null;
let piece = null;

export const startMatch = (setSocket, isFirstPlay, setHost) => {
  socketSession = setSocket;
  routes.setSocketSession(socketSession);
  host = setHost;
  piece = (isFirstPlay) ? 'x' : 'o';

  utils.switchPage(<Matchpage yourTurn={isFirstPlay} piece={piece} board={[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']} onPlay={play} />);
  handleEvents();
}

const handleEvents = () => {
  socketSession.on('leave', (data) => {
    routes.inviteNoJoin();
  });
  socketSession.on('play', (data) => {
    // check for valid play before component update
    updateView(data.status);
  });
}

// request server to make a play in a spot, update board with result
const play = (spot) => {
  utils.request({player: socketSession.id, spot: spot}, window.location.origin + '/match')
    .then(data => {
      // only update board on a valid play
      if(!data.error)
        updateView(data);
    });
}

// update graphical board and handle wins
const updateView = (status) => {
  // return to setup on win
  if(status.winState != -1) {
    if(host) routes.hostSetup(status);
    else routes.opponentSetup(status);
  }
  // otherwise update board
  else
    utils.switchPage(<Matchpage yourTurn={(status.turn == piece)} board={status.board} />);
}
