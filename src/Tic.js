import React, { Component } from 'react';
import Circle from './../public/circle.png';
import Cross from './../public/cross.png';
import Block from './Block';
import './css/Tic.css';

// eslint-disable-next-line react/prefer-stateless-function
class Tic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPlayer: 0,
      Player1count: 0,
      Player2count: 0,
      Message: '',
      Win: 0,
      Blocks: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.CheckComplete = this.CheckComplete.bind(this);
    this.SetActiveBlock = this.SetActiveBlock.bind(this);
    this.SetMessage = this.SetMessage.bind(this);
    this.JudgeWin = this.JudgeWin.bind(this);
    this.ResetGame = this.ResetGame.bind(this);
    this.RenderBoard = this.RenderBoard.bind(this);
    this.RenderMessage = this.RenderMessage.bind(this);
  }

  componentWillMount() {
    const temp = this.state.Blocks;
    for (let i = 0; i < 9; i++) {
      const block = {
        Id: i,
        Active: true,
        Done: false,
        DoneBy: 0,
        SBlocks: [],
      };
      for (let j = 0; j < 9; j++) {
        const sblock =
          { Id: j,
            Type: 0,
          };
        block.SBlocks.push(sblock);
      }
      temp.push(block);
    }
    this.setState({
      CurrentPlayer: 1,
      Message: 'Player 1 (圈圈) 先下',
      Blocks: temp,
    });
  }

  handleClick(BlockId, SBlockId) {
    const temp = this.state.Blocks;
    if (temp[BlockId].Active === false) {
      this.SetMessage('請下在指定區域內(橘色)!');
      return;
    }
    if (temp[BlockId].SBlocks[SBlockId].Type !== 0) {
      this.SetMessage('這裡已經下過了!');
      return;
    }
    if (this.state.CurrentPlayer === 1) {
      this.SetMessage('輪到 Player 2 (叉叉)');
      temp[BlockId].SBlocks[SBlockId].Type = 1;
      this.setState({
        CurrentPlayer: 2,
      });
    } else {
      temp[BlockId].SBlocks[SBlockId].Type = 2;
      this.SetMessage('輪到 Player 1 (圈圈)');
      this.setState({
        CurrentPlayer: 1,
      });
    }
    this.CheckComplete(BlockId);
    this.SetActiveBlock(SBlockId);
  }

  CheckComplete(BlockId) {
    const temp = this.state.Blocks;
    if (((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[1].Type) && (temp[BlockId].SBlocks[1].Type === temp[BlockId].SBlocks[2].Type) && (temp[BlockId].SBlocks[2].Type === 1))
      || ((temp[BlockId].SBlocks[3].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[5].Type) && (temp[BlockId].SBlocks[5].Type === 1))
      || ((temp[BlockId].SBlocks[6].Type === temp[BlockId].SBlocks[7].Type) && (temp[BlockId].SBlocks[7].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 1))
      || ((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[3].Type) && (temp[BlockId].SBlocks[3].Type === temp[BlockId].SBlocks[6].Type) && (temp[BlockId].SBlocks[6].Type === 1))
      || ((temp[BlockId].SBlocks[1].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[7].Type) && (temp[BlockId].SBlocks[7].Type === 1))
      || ((temp[BlockId].SBlocks[2].Type === temp[BlockId].SBlocks[5].Type) && (temp[BlockId].SBlocks[5].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 1))
      || ((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 1))
      || ((temp[BlockId].SBlocks[2].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[6].Type) && (temp[BlockId].SBlocks[6].Type === 1))
    ) {
      temp[BlockId].Done = true;
      temp[BlockId].DoneBy = 1;
      this.setState({
        Player1count: this.state.Player1count + 1,
        Blocks: temp,
      });
      this.JudgeWin(temp, 1);
    } else if (((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[1].Type) && (temp[BlockId].SBlocks[1].Type === temp[BlockId].SBlocks[2].Type) && (temp[BlockId].SBlocks[2].Type === 2))
      || ((temp[BlockId].SBlocks[3].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[5].Type) && (temp[BlockId].SBlocks[5].Type === 2))
      || ((temp[BlockId].SBlocks[6].Type === temp[BlockId].SBlocks[7].Type) && (temp[BlockId].SBlocks[7].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 2))
      || ((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[3].Type) && (temp[BlockId].SBlocks[3].Type === temp[BlockId].SBlocks[6].Type) && (temp[BlockId].SBlocks[6].Type === 2))
      || ((temp[BlockId].SBlocks[1].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[7].Type) && (temp[BlockId].SBlocks[7].Type === 2))
      || ((temp[BlockId].SBlocks[2].Type === temp[BlockId].SBlocks[5].Type) && (temp[BlockId].SBlocks[5].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 2))
      || ((temp[BlockId].SBlocks[0].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[8].Type) && (temp[BlockId].SBlocks[8].Type === 2))
      || ((temp[BlockId].SBlocks[2].Type === temp[BlockId].SBlocks[4].Type) && (temp[BlockId].SBlocks[4].Type === temp[BlockId].SBlocks[6].Type) && (temp[BlockId].SBlocks[6].Type === 2))
    ) {
      temp[BlockId].Done = true;
      temp[BlockId].DoneBy = 2;
      this.setState({
        Player2count: this.state.Player2count + 1,
        Blocks: temp,
      });
      this.JudgeWin(temp, 2);
    } else if ((temp[BlockId].SBlocks[0].Type !== 0) && (temp[BlockId].SBlocks[1].Type !== 0) && (temp[BlockId].SBlocks[2].Type !== 0)
        && (temp[BlockId].SBlocks[3].Type !== 0) && (temp[BlockId].SBlocks[4].Type !== 0) && (temp[BlockId].SBlocks[5].Type !== 0)
        && (temp[BlockId].SBlocks[6].Type !== 0) && (temp[BlockId].SBlocks[7].Type !== 0) && (temp[BlockId].SBlocks[8].Type !== 0)
    ) {
      temp[BlockId].Done = true;
      temp[BlockId].DoneBy = 0;
      this.setState({
        Blocks: temp,
      });
      this.JudgeWin(temp, 0);
    }
  }

  SetActiveBlock(SBlockId) {
    const temp = this.state.Blocks;
    if (temp[SBlockId].Done === false) {
      for (let i = 0; i < 9; i++) {
        if (i === SBlockId) {
          temp[i].Active = true;
        } else {
          temp[i].Active = false;
        }
      }
    } else {
      for (let i = 0; i < 9; i++) {
        if (temp[i].Done === false) {
          temp[i].Active = true;
        } else {
          temp[i].Active = false;
        }
      }
    }
    this.setState({
      Blocks: temp,
    });
  }

  SetMessage(text) {
    this.setState({
      Message: text,
    });
  }

  JudgeWin(temp, player) {
    let done = 0;
    let player1 = this.state.Player1count;
    let player2 = this.state.Player2count;
    if (player === 1) {
      player1 += 1;
    } else if (player === 2) {
      player2 += 1;
    }
    for (let i = 0; i < 9; i++) {
      if (temp[i].Done) { done += 1; }
    }
    if (player1 >= 5) {
      this.setState({
        Message: 'Player 1 (圈圈) 獲勝!',
        Win: 1,
      });
    } else if (player2 >= 5) {
      this.setState({
        Message: 'Player 2 (叉叉) 獲勝!',
        Win: 2,
      });
    } else if (done === 9) {
      if (player1 > player2) {
        this.setState({
          Message: 'Player 1 (圈圈) 獲勝!',
          Win: 1,
        });
      } else if (player1 < player2) {
        this.setState({
          Message: 'Player 2 (叉叉) 獲勝!',
          Win: 2,
        });
      } else {
        this.setState({
          Message: '這局平手!',
          Win: 3,
        });
      }
    } else {
      this.setState({
        Win: 0,
      });
    }
  }

  ResetGame() {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      const block = {
        Id: i,
        Active: true,
        Done: false,
        DoneBy: 0,
        SBlocks: [],
      };
      for (let j = 0; j < 9; j++) {
        const sblock =
          { Id: j,
            Type: 0,
          };
        block.SBlocks.push(sblock);
      }
      temp.push(block);
    }
    this.setState({
      CurrentPlayer: 1,
      Player1count: 0,
      Player2count: 0,
      Message: 'Player 1 (圈圈) 先下',
      Win: 0,
      Blocks: temp,
    });
  }

  RenderBoard() {
    const Blocks = this.state.Blocks.map(block =>
      <Block
        key={block.Id} Id={block.Id} SBlocks={block.SBlocks}
        Active={block.Active} Done={block.Done} DoneBy={block.DoneBy}
        handleClick={this.handleClick}
      />,
    );
    const win = this.state.Win;
    if (win === 1) {
      return (
        <div className="Board">
          <div className="Player1">
            <p>Player 1</p>
            <img
              src={Circle} alt="Player 1 is circle!"
            />
            <p>已經獲得 {this.state.Player1count} 個區域</p>
          </div>
          <div className="Tic">
            <img
              className="Win" src={Circle} alt="Player 1 win!"
            />
          </div>
          <div className="Player2">
            <p>Player 2</p>
            <img
              src={Cross} alt="Player 2 is cross!"
            />
            <p>已經獲得 {this.state.Player2count} 個區域</p>
          </div>
        </div>
      );
    } else if (win === 2) {
      return (
        <div className="Board">
          <div className="Player1">
            <p>Player 1</p>
            <img
              src={Circle} alt="Player 1 is circle!"
            />
            <p>已經獲得 {this.state.Player1count} 個區域</p>
          </div>
          <div className="Tic">
            <img
              className="Win" src={Cross} alt="Player 2 win!"
            />
          </div>
          <div className="Player2">
            <p>Player 2</p>
            <img
              src={Cross} alt="Player 2 is cross!"
            />
            <p>已經獲得 {this.state.Player2count} 個區域</p>
          </div>
        </div>
      );
    } else if (win === 3) {
      return (
        <div className="Board">
          <div className="Player1">
            <p>Player 1</p>
            <img
              src={Circle} alt="Player 1 is circle!"
            />
            <p>已經獲得 {this.state.Player1count} 個區域</p>
          </div>
          <div className="Tic">
            <div className="Blocks">
              {Blocks}
            </div>
          </div>
          <div className="Player2">
            <p>Player 2</p>
            <img
              src={Cross} alt="Player 2 is cross!"
            />
            <p>已經獲得 {this.state.Player2count} 個區域</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Board">
          <div className="Player1">
            <p>Player 1</p>
            <img
              src={Circle} alt="Player 1 is circle!"
            />
            <p>已經獲得 {this.state.Player1count} 個區域</p>
          </div>
          <div className="Tic">
            <div className="Blocks">
              {Blocks}
            </div>
          </div>
          <div className="Player2">
            <p>Player 2</p>
            <img
              src={Cross} alt="Player 2 is cross!"
            />
            <p>已經獲得 {this.state.Player2count} 個區域</p>
          </div>
        </div>
      );
    }
  }

  RenderHeader() {
    return (
      <div className="Header">
        <p>Tic-Tac-Ku</p>
        <div className="Rules">
          <ui>
            <li>先手第一手可下在棋盤中任意區域 </li>
            <li>之後放的區域方位需與對方上一手放的棋格中方位相同 </li>
            <li>舉例：總共有九格棋盤，如果我下在正中間棋盤的右上角，對方接著必須下在右上角棋盤的任意格中 </li>
            <li>若該區域無法下子(已經被其中一方拿下)，可下在其他任意區域 </li>
            <li>同一區域中規則跟一般圈圈叉叉一樣，先連成直線者贏得該區域 </li>
            <li>總共得到較多區域，或者先獲得5個區域的一方獲勝 </li>
          </ui>
        </div>
      </div>
    );
  }

  RenderMessage() {
    if (this.state.Win === 0) {
      return (
        <div className="Message">
          <p>{this.state.Message}</p>
        </div>
      );
    } else {
      return (
        <div className="Message">
          <p>{this.state.Message}</p>
          <button className="Reset" onClick={this.ResetGame}>Reset</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.RenderHeader()}
        {this.RenderMessage()}
        {this.RenderBoard()}
      </div>
    );
  }
}

export default Tic;
