const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';

export default class Home extends React.Component {
  render() {
    return(
      <ToggleButton text={'New Match'} click={this.props.onNewMatch} />
    );
  }
}
