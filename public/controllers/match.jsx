const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Matchpage from '../components/match.jsx';



let socketSession = null;
let piece = null;

export const startMatch = (setSocket, isFirstPlay, host) => {
  socketSession = setSocket;
  routes.setSocketSession(socketSession);
  piece = (isFirstPlay) ? 'x' : 'o';

  utils.switchPage(<Matchpage yourTurn={isFirstPlay} piece={piece} board={[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']} onPlay={play} />);
  handleEvents(host);
}

const handleEvents = (host) => {
  socketSession.on('leave', (data) => {
    routes.inviteNoJoin();
  });
  socketSession.on('play', (data) => {
    if(data.status.winState != -1) {
      if(host) routes.hostSetup(data.status);
      else routes.opponentSetup(data.status);
      return;
    }
    if(data.player != socketSession.id)
      updateBoard(data.status.board, data.status.turn);
  });
}

// request server to make a play in a spot, update board with result
const play = (spot) => {
  utils.request({player: socketSession.id, spot: spot}, window.location.origin + '/match')
    .then(data => {
      if(!data.error && data.winState == -1)
        updateBoard(data.board, data.turn);
    });
}

// update graphical board
const updateBoard = (boardArr, turn) => {
  utils.switchPage(<Matchpage yourTurn={(turn == piece)} board={boardArr} />);
}
