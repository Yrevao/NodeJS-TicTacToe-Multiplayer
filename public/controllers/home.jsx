const React = require('react');
const ReactDOM = require('react-dom');

import * as utils from './utils.jsx';
import * as routes from '../routes.jsx';
import Homepage from '../components/home.jsx';



// switch entry point component based on query properties rather than path
export const set = (socketSession) => {
  routes.setSocketSession(socketSession);

  // check property is valid by checking for null
  if(utils.getQueryMatch() != null) {
    routes.join();
  }
  else {
    utils.switchPage(<Homepage onNewMatch={routes.invite} />);
  }
}
