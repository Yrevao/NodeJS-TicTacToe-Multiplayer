const React = require('react');
const ReactDOM = require('react-dom');

export class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {on: false, gfxOn: false};
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
  }

  mouseover() {
    this.setState({gfxOn: true});
  }
  mouseout() {
    this.setState({gfxOn: false});
  }

  render() {
    let className = this.state.gfxOn ? 'on' : 'off';

    return(
      <button className={className} onMouseOver={this.mouseover} onMouseOut={this.mouseout}>{this.props.text}</button>
    )
  }
}
