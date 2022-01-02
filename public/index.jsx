const { io } = require("socket.io-client");
const socket = io(window.location.origin);
import * as routes from './routes.jsx';

// css
import staticStyle from './style/dynamic.css';
import dynamicStyle from './style/static.css';



const init = () => {
  // entry point dom node for react
  const entry = document.createElement("div");
  entry.id = 'root';
  document.body.appendChild(entry);

  // give socketIO time to connect before rendering anything
  socket.on('connect', () => {
    routes.setSocketSession(socket);
    routes.home();
  });
};

init();
