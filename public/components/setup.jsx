const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';
import {ToggleBox} from './utils.jsx';



export default class Setup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    // set host UI or opponent UI
    if(this.state.host) {
      return(
        <div>
          <span>
            <ToggleButton text={`Ready`} click={this.state.onReady} isOn={this.state.ready} />
            <ToggleButton text={`Go First`} click={this.state.onGoFirst} isOn={this.state.goFirst} />
          </span>
          <br></br>
          <span>
            <ToggleBox onText={'Opponent Ready'} offText={'Opponent Not Ready'} on={this.state.opponentReady} />
          </span>
        </div>
      );
    }
    return(
      <div>
        <span>
          <ToggleButton text={`Ready`} click={this.state.onReady} isOn={this.state.ready} />
        </span>
        <br></br>
        <span>
          <ToggleBox onText={'X'} offText={'O'} on={this.state.goFirst} />
          <ToggleBox onText={'Host Ready'} offText={'Host Not Ready'} on={this.state.opponentReady} />
        </span>
      </div>
    );
  }
}
