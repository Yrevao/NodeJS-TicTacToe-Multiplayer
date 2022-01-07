const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleBox} from './utils.jsx';



export default class Match extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onPlay: this.props.onPlay
    };
  }

  render() {
    let boardArr = [];
    for(let i = 0; i < 3; i++) {
      let row = []
      for(let j = 0; j < 3; j++) {
        row.push(<button onClick = {() => {this.state.onPlay((i*3)+j)}}> |{this.props.board[(i*3)+j]}| </button>);
      }
      boardArr.push(<div> {row} </div>);
    }

    return(boardArr);
  }
}
