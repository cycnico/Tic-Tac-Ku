import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './../public/circle.png';
import Cross from './../public/cross.png';
import Empty from './../public/empty.png';
import './css/SBlock.css';

class SBlock extends Component {
  constructor(props) {
    super(props);

    this.CheckPic = this.CheckPic.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.BlockId, this.props.Id);
  }

  handleOnFocus() {
    if (this.props.Type === 0 && this.props.Active) {
      document.getElementById(`B${this.props.BlockId}SB${this.props.Id}`).style.background = 'rgba(19, 195, 83, 0.68)';
    }
  }

  handleOnBlur() {
    document.getElementById(`B${this.props.BlockId}SB${this.props.Id}`).style.background = '';
  }

  CheckPic() {
    if (this.props.Type === 0) {
      return (
        <img
          className="Circle" src={Empty} alt="this block is empty!"
        />
      );
    } else if (this.props.Type === 1) {
      return (
        <img
          className="Circle" src={Circle} alt="this block is a circle!"
        />
      );
    } else {
      return (
        <img
          className="Circle" src={Cross} alt="this block is a cross!"
        />
      );
    }
  }

  render() {
    return (
      <div
        id={`B${this.props.BlockId}SB${this.props.Id}`} className="sblock" onClick={this.handleClick}
        onMouseOver={this.handleOnFocus} onMouseOut={this.handleOnBlur}
      >
        {this.CheckPic()}
      </div>
    );
  }
}

SBlock.propTypes = {
  Id: PropTypes.number.isRequired,
  Active: PropTypes.bool.isRequired,
  BlockId: PropTypes.number.isRequired,
  Type: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SBlock;
