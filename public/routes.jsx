// methods for switching between controllers

// controller imports
import * as c_home from './controllers/home.jsx';
import * as c_setup from './controllers/setup.jsx';



// cross-method socket session
let socketSession = null;

// set socketIO session to avoid un-needed reconnection attempts; used since its easier to pass these methods to react components without needing arguments
export const setSocketSession = (setSocket) => {
  socketSession = setSocket;
}

// home page with new match button
export const home = () => {
  c_home.set(socketSession);
}

// invite page with copy link button
export const invite = () => {
  c_setup.newMatch(socketSession);
}

// used to attempt to join a match that already exists; match may be full
export const join = () => {
  c_setup.joinMatch(socketSession);
}
