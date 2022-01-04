const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx'
import Setuppage from '../components/setup.jsx';
import Invitepage from '../components/invite.jsx';

let socketSession = null;

export const startSetup = (host, setSocket) => {
  socketSession = setSocket;
  utils.switchPage(<Setuppage host={host} onReady={ready} onGoFirst={toggleFirst} />);

  handleEvents();
}

const handleEvents = () => {
  socketSession.on('leave', () => {
    routes.inviteNoJoin();
  });
}

const ready = () => {
  //utils.request()
  //  .then()
}

const toggleFirst = () => {

}
