const React = require('react');
const ReactDOM = require('react-dom');



export default class Invite extends React.Component {
  render() {
    return(
      <div>
        <CopyBox link={window.location.href} />
        <h1 class="waitText"> Waiting for Opponent </h1>
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
  }

  render() {
    // set text of copy message based on state
    const copyText = (this.state.clipboard ? 'Copied' : 'Click to Copy');

    // show link and copy message
    return(
      <div class="copyBox" onClick={this.onClick}>
        <span class="copyText">{copyText}</span>
        <br></br>
        <span class="copyText">{this.props.link}</span>
      </div>
    )
  }
}
