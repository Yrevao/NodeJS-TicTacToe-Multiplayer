const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleBox} from './utils.jsx';
import {Board} from './utils.jsx';
import style from '../style/match.css';


export default class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onPlay: this.props.onPlay,
      piece: this.props.piece
    };
  }

  render() {
    return(
      <div class='match'>
        <span class={this.props.yourTurn ? 'yourTurn' : 'oppTurn'}>
          {this.props.yourTurn ? 'Your Turn' : 'Waiting for opponent'}
        </span>

        <Board hover={true} onPlay={this.state.onPlay} board={this.props.board} />

        <span class='player'>
          {`Player : ${this.state.piece}`}
        </span>
      </div>
    );
  }
}
