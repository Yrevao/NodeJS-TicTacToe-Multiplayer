let player = {};   // index with player ID, stores match ID for that player and if the player is a host
let match = {};    // index with match ID, stores match state and player id's of match

// private methods
// return number of players in a match
const matchCount = (matchID) => {
  matchData = match[matchID];
  if(matchData) {
    if(matchData.host.ID != null) {
      if(matchData.opponent.ID != null)
        return 2;
      return 1;
    }
  }

  return -1;
}

// create formatted match object
const newMatch = (playerID) => {
  // match stores match state and player state
  return {
    host: {ID: playerID, ready: false},                       // host player
    opponent: {ID: null, ready: false},                       // opponent player
    hostPlayFirst: true,                                      // sets who goes first (x plays first o plays second)
    turn: 'x',                                                // current turn; x always starts
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],     // game board state; format: new row every 3 indexes
  };
}

// create formatted player object
const newPlayer = (matchID, isHost) => {
  return {
    match: matchID,
    host: isHost,
  }
}

// place a piece on the board; returns true if placement was successful
const place = (playerID, spot) => {
  const matchID = player[playerID].match;

  // check if its the given playerID's turn
  // host is x, opponent is o
  if(match[matchID].hostPlayFirst && match[matchID].host.ID == playerID && match[matchID].turn == 'o') return false;
  if(match[matchID].hostPlayFirst && match[matchID].opponent.ID == playerID && match[matchID].turn == 'x') return false;
  // host is o, opponent is x
  if(!match[matchID].hostPlayFirst && match[matchID].host.ID == playerID && match[matchID].turn == 'x') return false;
  if(!match[matchID].hostPlayFirst && match[matchID].opponent.ID == playerID && match[matchID].turn == 'o') return false;

  // check if spot is empty
  if(match[matchID].board[spot] == ' ') {
    match[matchID].board[spot] = match[matchID].turn;
    return true;
  }
  return false;
}

// check for a complete match in terms of board progress; return 1-8 win state or -1 for no win and player who won
const complete = (matchID) => {
  const board_ = match[matchID].board.slice(0);
  let piece = ['x', 'o'];

  let status = {
    winState: -1,
    winner: ' ',
  }

  // check 8 win states
  for(let i in piece) {
    if(board_[0] == piece[i] && board_[1] == piece[i] && board_[2] == piece[i]) status.winState = 1;
    else if(board_[3] == piece[i] && board_[4] == piece[i] && board_[5] == piece[i]) status.winState = 2;
    else if(board_[6] == piece[i] && board_[7] == piece[i] && board_[8] == piece[i]) status.winState = 3;

    else if(board_[0] == piece[i] && board_[3] == piece[i] && board_[6] == piece[i]) status.winState = 4;
    else if(board_[1] == piece[i] && board_[4] == piece[i] && board_[7] == piece[i]) status.winState = 5;
    else if(board_[2] == piece[i] && board_[5] == piece[i] && board_[8] == piece[i]) status.winState = 6;

    else if(board_[0] == piece[i] && board_[4] == piece[i] && board_[8] == piece[i]) status.winState = 7;
    else if(board_[2] == piece[i] && board_[4] == piece[i] && board_[6] == piece[i]) status.winState = 8;

    if(status.winState != -1) {
      status.winner = piece[i];
      break;
    }
  }

  // check for draw
  const full = board_.every((square) => {
    return (square != ' ');
  });

  if(full && status.winState == -1) {
    status.winner = 'draw';
    status.winState = 9;
  }

  return status;
}



// public methods

module.exports.getMatch = (playerID) => {
  if(player[playerID]) return player[playerID].match;
  return false;
}

// reset match for playerID
module.exports.resetMatch = (playerID) => {
  const player_ = player[playerID];

  // reset board and turn for player's match
  match[player_.match].board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  match[player_.match].turn = 'x';
  match[player_.match].hostPlayFirst = true;
  // reset players' ready state
  match[player_.match].host.ready = false;
  match[player_.match].opponent.ready = false;
}

// player joins match; returns error state and player count in match
module.exports.join = (playerID, matchID) => {
  let status = {
    error: false,
    count: -1,
  };

  // check if player is already joined
  if(!player[playerID]) {
    // check if match needs init
    if(!match[matchID]) {
      // init new match
      match[matchID] = newMatch(playerID);
      player[playerID] = newPlayer(matchID, true);
    }
    else {
      // check if match is full
      if(match[matchID].opponent.ID != null) status.error = true;
      // join as opponent if match has room
      else {
        match[matchID].opponent.ID = playerID;

        player[playerID] = newPlayer(matchID, false);
      }
    }
  }
  else
    status.error = true;
  status.count = matchCount(matchID);

  return status;
}

// switch if the host is going first or second
module.exports.switch = (playerID) => {
  let player_ = player[playerID];
  if(player_.host) {
    match[player_.match].hostPlayFirst = !match[player_.match].hostPlayFirst;
    // x goes first o goes second
    return match[player_.match].hostPlayFirst ? 'x' : 'o';
  }

  return 'error';
}

// player is ready for match start; returns true if all the players are ready
module.exports.ready = (playerID) => {
  const matchID = player[playerID].match;
  let isReady = null; // is the player ready or not

  // check if player is host or opponent then toggle ready state accordingly
  if(player[playerID].host) {
    match[matchID].host.ready = !match[matchID].host.ready;
    isReady = match[matchID].host.ready;
  }
  else {
    match[matchID].opponent.ready = !match[matchID].opponent.ready;
    isReady = match[matchID].opponent.ready;
  }

  // both: true only if both players are ready, ready: true if argument player is ready
  return {both: (match[matchID].host.ready && match[matchID].opponent.ready), ready: isReady};
}

// start match, return true if successful
module.exports.start = (playerID) => {
  const player_ = player[playerID];
  const match_ = match[player_.match];

  return (match_.host.ready && match_.opponent.ready);
}

// execute one play, return progress of game after play and if the play was successful
module.exports.play = (playerID, spot) => {
  const player_ = player[playerID];

  let status = {
    error: true,
    board: null,
    turn: null,
    winner: ' ',
    winState: -1,
  }

  // if placement then check for win
  if(player_ && place(playerID, spot)) {
    // switch turn on complete play
    match[player_.match].turn = match[player_.match].turn == 'x' ? 'o' : 'x';

    // set status
    const match_ = match[player_.match];
    status.error = false;
    status.board = match_.board.slice(0);
    status.turn = match_.turn;

    // check for win and set status on win
    const winStatus = complete(player_.match);
    if(winStatus.winState != -1) {
      status.winner = winStatus.winner;
      status.winState = winStatus.winState;
      // reset match on win
      module.exports.resetMatch(playerID);
    }
  }

  return status;
}

// delete player from state, return true if successful
module.exports.prune = (playerID) => {
  if(player[playerID]) {
    const player_ = player[playerID];

    // if player has opponent then reset match
    if(match[player_.match].opponent.ID != null) {
      // opponent is set to host
      match[player_.match] = newMatch(match[player_.match].opponent.ID);
    }
    // else fully delete match
    else {
      delete match[player_.match]
    }
    // delete player from player state
    delete player[playerID];
    return true;
  }

  return false;
}
