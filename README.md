# NodeJS-TicTacToe-Multiplayer
This is a multiplayer TicTacToe game where players go against eachother remotly in private matches.  
I created this project to investigate test driven devleopment and learn React.  

## Structure
  This project loosely follows REST principles in the sense that the client side and server side exist separately.  
  Program logic for both sides is divided up following the MVC pattern.  
  
## Function
  On the client side React components are used to render the user interface, which is used to make post requests to the server.  
  The server side stores a match state that is accessed by the client's post requests.  
  Once the server receives a post request a JSON response is generated and then sent to the clients in the relevent match using socketIO and/or the response of the post request.
