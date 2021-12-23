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
    hostPlayFirst: true,                                      // sets who goes first
    started: false,                                           // is the match started or not
    turn: 'x',                                                // current turn; x always starts
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],     // game board state; format: new row every 3 indexes
  };
}

// place a piece on the board; returns true if placement was successful
const place = (matchID, spot) => {
  // check if spot is empty
  if(match[matchID].board[spot] == ' ') {
    match[matchID].board[spot] == match[matchID].turn;
    return true;
  }
  return false;
}

// check for a complete match in terms of board progress; return 1-8 win state or -1 for no win and player who won
const complete = (matchID) => {
  const board_ = match[matchID].board;
  let piece = ['x', 'o'];

  let status = {
    winState: -1,
    winner: ' ',
  }

  // check 8 win states
  for(let i in piece) {
    if(board_[0] == i && board[1] == i && board[2] == i) status.winState = 1;
    else if(board_[3] == i && board[4] == i && board[5] == i) status.winState = 2;
    else if(board_[6] == i && board[7] == i && board[8] == i) status.winState = 3;

    else if(board_[0] == i && board[3] == i && board[6] == i) status.winState = 4;
    else if(board_[1] == i && board[4] == i && board[7] == i) status.winState = 5;
    else if(board_[2] == i && board[5] == i && board[8] == i) status.winState = 6;

    else if(board_[0] == i && board[4] == i && board[8] == i) status.winState = 7;
    else if(board_[2] == i && board[4] == i && board[6] == i) status.winState = 8;

    if(status.winState != -1) {
      status.winner = i;
      break;
    }
  }

  return status;
}



// public methods
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
      player[playerID] = {match: matchID, host: true};
    }
    else {
      // check if match is full
      if(match[matchID].opponent.ID != null) status.error = true;
      // join as opponent if match has room
      else {
        match[matchID].opponent.ID = playerID;

        player[playerID] = {match: matchID, host: false};
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

  // check if player is host or opponent then toggle ready state accordingly
  if(player[playerID].host)
    match[matchID].host.ready = !match[matchID].host.ready;
  else
    match[matchID].opponent.ready = !match[matchID].opponent.ready;

  // true only if both players are ready
  return (match[matchID].host.ready && match[matchID].opponent.ready) ? true : false;
}

module.exports.start = (playerID) => {
  const player_ = player[playerID];
  const match_ = match[player_.match];

  return (player_.host && match_.host.ready && match_.opponent.ready) ? true : false;
}

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
  if(player_ && place(player_.match, spot)) {
    const match_ = match[player_.match];
    status.error = false;
    status.board = match_.board;
    status.turn = match_.turn;
    // check for win
    const winStatus = complete(player_.match);
    if(winStatus.winState != -1) {
      status.winner = winStatus.winner;
      status.winState = winStatus.winState;
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
