const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Matchpage from '../components/match.jsx';



let socketSession = null;
let piece = null;

export const startMatch = (setSocket, isFirstPlay) => {
  socketSession = setSocket;
  routes.setSocketSession(socketSession);
  piece = (isFirstPlay) ? 'x' : 'o';

  utils.switchPage(<Matchpage yourTurn={isFirstPlay} board={[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']} onPlay={play} />);
  handleEvents();
}

const handleEvents = () => {
  socketSession.on('play', (data) => {
    if(data.player != socketSession.id)
      updateBoard(data.status.board, data.status.turn);
  });
}

const play = (spot) => {
  utils.request({player: socketSession.id, spot: spot}, window.location.origin + '/match')
    .then(data => {
      if(!data.error)
        updateBoard(data.board, data.turn);
    });
}

const updateBoard = (boardArr, turn) => {
  utils.switchPage(<Matchpage yourTurn={(turn == piece) ? true : false} board={boardArr} />);
}
