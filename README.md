# NodeJS-TicTacToe-Multiplayer
  This is a multiplayer TicTacToe game where players go against each other remotely in private matches.  
  I created this project to investigate test driven development and learn React.  
  The project is currently hosted here: https://nodejs-tictactoe-multiplayer.onrender.com/

## Structure
  This project loosely follows REST principles in the sense that the client side and server side exist separately.  
  Program logic for both sides is divided up following the MVC pattern.  
  
## Function
  The client side consists of React components that communicate with controllers to send post requests to the server.  
  The server side stores a match state that is accessed by the client's post requests.  
  On receiving a post request the server generates a JSON response and then sends it to the clients in the relevent match using SocketIO and/or an HTML response.  
