const React = require('react');
const ReactDOM = require('react-dom');

export default class Invite extends React.Component {
  render() {
    return(
      <h1>
        Join Status: {this.props.status}
      </h1>
    )
  }
}
