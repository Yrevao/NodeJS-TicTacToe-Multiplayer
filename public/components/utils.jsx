const React = require('react');
const ReactDOM = require('react-dom');



export class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {gfxOn: false};
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.mouseclick = this.mouseclick.bind(this);
  }

  mouseover() {
    this.setState(this.state.gfxOn ? {gfxOn: false} : {gfxOn: true});
  }
  mouseout() {
    this.setState(this.state.gfxOn ? {gfxOn: false} : {gfxOn: true});
  }
  mouseclick() {
    if(this.props.toggle)
      this.setState(this.state.gfxOn ? {gfxOn: false} : {gfxOn: true});

    this.props.click();
  }

  render() {
    let className = this.state.gfxOn ? 'on' : 'off';
    if(this.props.isOn)
      className = this.state.gfxOn ? 'off' : 'on';

    return(
      <button className={className} onClick={this.mouseclick} onMouseOver={this.mouseover} onMouseOut={this.mouseout}>{this.props.text}</button>
    )
  }
}

export class ToggleBox extends React.Component {
  render() {
    const text = this.props.on ? this.props.onText : this.props.offText;
    const className = this.props.on ? 'on' : 'off';

    return(
      <button className={className}>{text}</button>
    )
  }
}
