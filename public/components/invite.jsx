const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';
import {ToggleBox} from './utils.jsx';
import style from '../style/invite.css';



export default class Invite extends React.Component {
  render() {
    return(
      <div class='invite'>
        <span class="sendToText"> Send this link to your opponent </span>
        <CopyBox link={window.location.href} />
        <span class="waitingText"> Waiting for Opponent </span>
      </div>
    )
  }
}

// text box that copys it's text to the clipboard when clicked
class CopyBox extends React.Component {
  constructor(props) {
    super(props);

    // flag indicating if link has been copied to clipboard or not
    this.state = {clipboard: false};

    this.onClick = this.onClick.bind(this);
    }

  onClick() {
    // copy to clipboard then update state once complete
    navigator.clipboard.writeText(this.props.link)
      .then(() => {
        this.setState({clipboard: true});
      });

    // after 5 seconds reset toggle
    setTimeout(() => {this.setState({clipboard: false})}, 5000);
  }

  render() {
    // set text of copy message based on state
    const copyText = (this.state.clipboard ? 'Copied' : 'Click to Copy');

    // show link and copy message
    return(
      <div class='copyBox' onClick={this.onClick}>
        <span class='copyBoxItem'>{copyText}</span>
        <span class='copyBoxItem'>{this.props.link}</span>
      </div>
    )
  }
}
