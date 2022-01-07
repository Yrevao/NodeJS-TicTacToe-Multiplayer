  // methods for switching between controllers
// controller imports
import * as c_home from './controllers/home.jsx';
import * as c_invite from './controllers/invite.jsx';
import * as c_setup from './controllers/setup.jsx';
import * as c_match from './controllers/match.jsx';



// cross-method socket session
let socketSession = null;

// set socketIO session to avoid un-needed reconnection attempts; also sets events
export const setSocketSession = (setSocket) => {
  socketSession = setSocket;
}

// home page with new match button
export const home = () => {
  c_home.set(socketSession);
}

// invite page with copy link button
export const invite = () => {
  c_invite.newMatch(socketSession);
}

// invite page without join attempt; for returning to invite page on player disconnect
export const inviteNoJoin = () => {
  c_invite.playAsHost(socketSession);
}

// used to attempt to join a match that already exists; match may be full
export const join = () => {
  c_invite.joinMatch(socketSession);
}

// match setup with opponent controls; opponent cannot switch first play
export const opponentSetup = () => {
  c_setup.startSetup(false, socketSession);
}

// match setup with go first button included
export const hostSetup = () => {
  c_setup.startSetup(true, socketSession);
}

export const startMatch = (isFirstPlay) => {
  c_match.startMatch(socketSession, isFirstPlay);
}
