const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';



export default class Setup extends React.Component {
  render() {
    if(this.props.host) {
      return(
        <div>
          <ToggleButton text={`Ready`} click={this.props.onReady} toggle={true} />
          <ToggleButton text={`Go First`} click={this.props.onGoFirst} toggle={true} />
        </div>
      );
    }
    return(
      <div>
        <ToggleButton text={`Ready`} click={this.props.onReady} toggle={true} />
      </div>
    );
  }
}
