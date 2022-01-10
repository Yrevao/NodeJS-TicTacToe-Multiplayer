const React = require('react');
const ReactDOM = require('react-dom');
import style from '../style/utils.css';
import boardStyle from '../style/board.css';


// button that can be graphically toggled
export class ToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {on: false};
    this.mouseclick = this.mouseclick.bind(this);
  }

  mouseclick() {
    if(this.props.toggle)
      this.setState(this.state.on ? {on: false} : {on: true});

    this.props.click();
  }

  render() {
    // show graphical view of the button being on or off
    let className = this.state.on ? 'on' : 'off';
    if(this.props.staticStyle)
      className = 'off';

    // set text based on props and on state
    let text = this.props.text;
    if(this.props.onText)
      text = this.state.on ? this.props.onText : this.props.offText;

    return(
      <button className={`button ${className} ${this.props.class}`} onClick={this.mouseclick}>
          {text}
      </button>
    )
  }
}

// text box with two set states
export class ToggleBox extends React.Component {
  render() {
    // graphical on or off
    let className = this.props.on ? 'on' : 'off';
    if(this.props.staticStyle)
      className = 'off';

    // text on or off
    const text = this.props.on ? this.props.onText : this.props.offText;

    return(
      <button className={`${this.props.class} ${className}`}>
        {text}
      </button>
    )
  }
}

// draw tic tac toe board from board array
export class Board extends React.Component {
  render() {
    let boardArr = [];

    for(let i = 0; i < this.props.board.length; i++)
      boardArr.push(<button class={`sq${i} ${this.props.hover ? 'squareHover' : 'square'}`} onClick={() => this.props.onPlay(i)}>{this.props.board[i]}</button>);

    return(
      <div className={`${this.props.class} board`}>
        {boardArr}
      </div>
    );
  }
}
