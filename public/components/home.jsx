const React = require('react');
const ReactDOM = require('react-dom');
import {ToggleButton} from './utils.jsx';
import style from '../style/home.css';



export default class Home extends React.Component {
  render() {
    return(
      <div class='title'>
        <div class='row1'>Tic</div>
        <div class='row2'>Tac</div>
        <div class='row3'>Toe</div>

        <div class='startButton'>
          <ToggleButton text={'New Match'} click={this.props.onNewMatch} />
        </div>
      </div>
    );
  }
}
