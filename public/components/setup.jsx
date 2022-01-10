const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';
import {ToggleBox} from './utils.jsx';
import {Board} from './utils.jsx';
import style from '../style/setup.css';



export default class Setup extends React.Component {
  constructor(props) {
    super(props);

    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let statusText = 'Match Setup'
    // show post game results after match
    if(this.props.status) {
      board = this.props.status.board;
      statusText = `Winner : ${this.props.status.winner}`;
    }

    this.state = {
      board: board,
      statusText: statusText,
      onReady: this.props.onReady,
      onGoFirst: this.props.onGoFirst,
      ready: this.props.ready,
      opponentReady: this.props.opponentReady,
      goFirst: this.props.goFirst,
      host: this.props.host
     };
  }

  // maintain state
  static getDerivedStateFromProps(props, state) {
    if(props.ready != undefined)
      return {
        ready: props.ready,
        opponentReady: state.opponentReady,
        goFirst: state.goFirst,
        host: state.host
      };
    if(props.opponentReady != undefined)
      return {
        ready: state.ready,
        opponentReady: props.opponentReady,
        goFirst: state.goFirst,
        host: state.host
      };
    if(props.goFirst != undefined)
      return {
        ready: state.ready,
        opponentReady: state.opponentReady,
        goFirst: props.goFirst,
        host: state.host
      };

    return null;
  }

  render() {
    // set winner text

    // set host UI or opponent UI
    if(this.state.host) {
      return(
        <div class='setup'>
          <div class='statusText'>{this.state.statusText}</div>

          <div class='interface'>
            <ToggleBox class='opponent' onText={'Opponent Ready'} offText={'Opponent Not Ready'} on={this.state.opponentReady} />
            <ToggleButton class='piece' staticStyle={true} toggle={true} onText={'o'} offText={'x'} click={this.state.onGoFirst} isOn={this.state.goFirst} />
            <ToggleButton class='ready' staticStyle={true} toggle={true} text={`Ready`} click={this.state.onReady} isOn={this.state.ready} />
          </div>

          <Board class='status' hover={false} board={this.state.board} onPlay={(i)=>{}} />
        </div>
      );
    }
    return(
      <div class='setup'>
        <div class='statusText'>{this.state.statusText}</div>

        <div class='interface'>
          <ToggleBox class='opponent' onText={'Opponent Ready'} offText={'Opponent Not Ready'} on={this.state.opponentReady} />
          <ToggleBox class='piece' staticStyle={true} onText={'x'} offText={'o'} on={this.state.goFirst} />
          <ToggleButton class='ready' staticStyle={true} toggle={true} text={`Ready`} click={this.state.onReady} isOn={this.state.ready} />
        </div>

        <Board class='status' hover={false} board={this.state.board} onPlay={(i)=>{}}/>
      </div>
    );
  }
}
