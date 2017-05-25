import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './../public/circle.png';
import Cross from './../public/cross.png';
import SBlock from './SBlock';
import './css/Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(BlockId, SBlockId) {
    this.props.handleClick(BlockId, SBlockId);
  }

  render() {
    const content = this.props.SBlocks.map(sb =>
      <SBlock
        key={sb.Id} Id={sb.Id} Type={sb.Type} BlockId={this.props.Id}
        Active={this.props.Active}
        handleClick={this.handleClick}
      />,
    );

    let style = '';
    if (this.props.Active) {
      style = 'ActiveBlock';
    } else {
      style = 'Block';
    }

    if (this.props.DoneBy !== 0) {
      if (this.props.DoneBy === 1) {
        return (
          <div className={style}>
            <img
              className="BigCircle" src={Circle} alt="this block is taken by circle!"
            />
          </div>
        );
      } else {
        return (
          <div className={style}>
            <img
              className="BigCross" src={Cross} alt="this block is taken by cross!"
            />
          </div>
        );
      }
    } else {
      return (
        <div className={style}>
          <div>
            {content}
          </div>
        </div>
      );
    }
  }
}

Block.propTypes = {
  Id: PropTypes.number.isRequired,
  SBlocks: PropTypes.array.isRequired,
  Active: PropTypes.bool.isRequired,
  DoneBy: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Block;
