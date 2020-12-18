import React, { Component } from "react";
import "../style/Board.css";

window.oncontextmenu = function () {
  return false;
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mines_db: [],
      mines_user: [],
      numbers_db: [],
      clickable_db: [],
      gameStateFlag: 0,
      lineIndex: 0,
      cellIndex: 0,
      flagRemainingCount: 8,
      emojiState: "/smile.png",
    };
  }

  //initializing game
  init = () => {
    console.log("init game!");
    this.setState({
      gameStateFlag: 0,
      emojiState: "/smile.png",
    });
    let mines_tmp = [];
    let mines_user = [];
    let numbers_tmp = [];
    let clickable_tmp = [];
    for (let i = 0; i < 8; i++) {
      mines_tmp[i] = [];
      mines_user[i] = [];
      numbers_tmp[i] = [];
      clickable_tmp[i] = [];
      let mineNum = Math.round(Math.random() * 7);
      for (let j = 0; j < 8; j++) {
        mines_tmp[i][j] = false;
        mines_user[i][j] = false;
        numbers_tmp[i][j] = 0;
        clickable_tmp[i][j] = true;
      }
      mines_tmp[i][mineNum] = true;
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (mines_tmp[i][j]) {
          numbers_tmp[i][j] = 100;
          this.setNumber(i - 1, j - 1, numbers_tmp, mines_tmp);
          this.setNumber(i - 1, j, numbers_tmp, mines_tmp);
          this.setNumber(i - 1, j + 1, numbers_tmp, mines_tmp);
          this.setNumber(i, j - 1, numbers_tmp, mines_tmp);
          this.setNumber(i, j + 1, numbers_tmp, mines_tmp);
          this.setNumber(i + 1, j - 1, numbers_tmp, mines_tmp);
          this.setNumber(i + 1, j, numbers_tmp, mines_tmp);
          this.setNumber(i + 1, j + 1, numbers_tmp, mines_tmp);
        }
      }
    }
    this.setState({
      mines_db: mines_tmp,
      clickable_db: clickable_tmp,
      mines_user: mines_user,
    });
  };

  //setNumber in around of mine
  setNumber = (i, j, numbers_tmp, mines_tmp) => {
    if (i < 0 || j < 0 || i > 7 || j > 7 || mines_tmp[i][j]) {
      return;
    }
    numbers_tmp[i][j] = numbers_tmp[i][j] + 1;
    this.setState({
      numbers_db: numbers_tmp,
    });
  };

  //when player win in the game
  gameWin = () => {
    console.log("you win!");
    this.setState({
      gameStateFlag: 1,
      emojiState: "/laugh.png",
    });
  };

  //when player lose in the game
  gameLose = () => {
    console.log("you lose!");
    this.setState({
      gameStateFlag: 1,
      emojiState: "/sad.png",
    });
  };

  //set Numbers of mines on board
  setNumBomb = (num) => {
    console.log(num, "mines are on the board!");
  };

  //On mouseLeftClicked
  onMouseLeftClicked = (x, y) => {
    const { mines_db, numbers_db, mines_user } = this.state;
    if (mines_db[x][y]) {
      this.gameLose();
      return;
    }
    mines_user[x][y] = false;
    let flagSetedCount = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (mines_user[i][j]) {
          flagSetedCount++;
        }
      }
    }

    this.setState({
      mines_user: mines_user,
      flagRemainingCount: 8 - flagSetedCount,
    });
    if (numbers_db[x][y] === 0) {
      this.checkEmptyCellsOnAround(x, y);
    }
  };

  setStateCheck = (x, y) => {
    const { clickable_db } = this.state;
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      console.log(clickable_db[x][y], x, y);
      return clickable_db[x][y];
    } else {
      return false;
    }
  };

  checkEmptyCellsOnAround = (x, y) => {
    let { numbers_db, clickable_db } = this.state;
    if (numbers_db[x][y] > 0) {
      return;
    }
    console.log("--------------1");
    if (
      !(
        this.setStateCheck(x + 1, y) ||
        this.setStateCheck(x - 1, y) ||
        this.setStateCheck(x, y + 1) ||
        this.setStateCheck(x, y - 1)
      )
    ) {
      return;
    }
    console.log("------------------2");
    if (x + 1 >= 0 && x + 1 < 8 && y >= 0 && y < 8) {
      if (clickable_db[x + 1][y]) {
        clickable_db[x + 1][y] = false;
        this.checkEmptyCellsOnAround(x + 1, y);
      }
    }

    if (x - 1 >= 0 && x - 1 < 8 && y >= 0 && y < 8) {
      if (clickable_db[x - 1][y]) {
        clickable_db[x - 1][y] = false;
        this.checkEmptyCellsOnAround(x - 1, y);
      }
    }

    if (x >= 0 && x < 8 && y + 1 >= 0 && y + 1 < 8) {
      if (clickable_db[x][y + 1]) {
        clickable_db[x][y + 1] = false;
        this.checkEmptyCellsOnAround(x, y + 1);
      }
    }

    if (x >= 0 && x < 8 && y - 1 >= 0 && y - 1 < 8) {
      if (clickable_db[x][y - 1]) {
        clickable_db[x][y - 1] = false;
        this.checkEmptyCellsOnAround(x, y - 1);
      }
    }

    this.setState({
      clickable_db: clickable_db,
    });
  };

  //On mouseRightClicked
  onMouseRightClicked = (x, y) => {
    const { mines_user, mines_db } = this.state;
    mines_user[x][y] = !mines_user[x][y];
    let flagSetedCount = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (mines_user[i][j]) {
          flagSetedCount++;
        }
      }
    }

    this.setState({
      mines_user: mines_user,
      flagRemainingCount: 8 - flagSetedCount,
    });

    if (flagSetedCount === 8) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (mines_user[i][j] !== mines_db[i][j]) {
            console.log("you lose");
            this.setState({ gameStateFlag: 2 });
            return;
          }
        }
      }

      console.log("you win");
      this.setState({ gameStateFlag: 1 });
    }
  };

  componentDidMount() {
    this.init();
  }

  handleClick = (e) => {
    const { clickable_db, lineIndex, cellIndex } = this.state;
    if (this.state.gameStateFlag !== 0) {
      return;
    }
    if (e.type === "click") {
      console.log("Left click");
      if (clickable_db[lineIndex][cellIndex]) {
        this.onMouseLeftClicked(lineIndex, cellIndex);
        clickable_db[lineIndex][cellIndex] = false;
        this.setState({
          clickable_db: clickable_db,
        });
      }
      console.log("Left click");
    } else if (e.type === "contextmenu") {
      console.log("Right click");
      if (clickable_db[lineIndex][cellIndex]) {
        this.onMouseRightClicked(lineIndex, cellIndex);
      }
    }
  };

  render() {
    const {
      mines_db,
      mines_user,
      numbers_db,
      clickable_db,
      flagRemainingCount,
      gameStateFlag,
      emojiState,
    } = this.state;
    return (
      <>
        <div className="board-container">
          <div className="board-header">
            <div
              style={{
                backgroundColor: "#eee",
                borderRadius: 5,
                display: "inline-flex",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img width={30} height={30} src={"/flag.png"} alt="ok"></img>
              {flagRemainingCount}
            </div>
            <img
              src={emojiState}
              alt="gameState"
              width={50}
              height={50}
              style={{
                backgroundColor: "#eee",
                borderRadius: 5,
                cursor: "pointer",
                marginLeft: 30,
              }}
              onClick={this.init}
            />
          </div>

          {mines_db.map((line, lineIndex) => {
            return (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {line.map((cell, cellIndex) => {
                  let cellColor;
                  let numberColor;
                  if (clickable_db[lineIndex][cellIndex]) {
                    cellColor = "#e2e2e2";
                    numberColor = cellColor;
                  } else {
                    cellColor = "#999999";
                    switch (numbers_db[lineIndex][cellIndex]) {
                      case 0:
                        numberColor = cellColor;
                        break;
                      case 1:
                        numberColor = "black";
                        break;
                      case 2:
                        numberColor = "blue";
                        break;
                      case 3:
                        numberColor = "red";
                        break;
                      default:
                        numberColor = "yellow";
                        break;
                    }
                  }

                  return (
                    <div
                      class="cell"
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: cellColor,
                        color: numberColor,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 4,
                        borderRadius: 3,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={this.handleClick}
                      onContextMenu={this.handleClick}
                      onMouseEnter={() => {
                        this.setState({
                          lineIndex: lineIndex,
                          cellIndex: cellIndex,
                        });
                      }}
                    >
                      {gameStateFlag === 1 &&
                      mines_db[lineIndex][cellIndex] &&
                      !mines_user[lineIndex][cellIndex] &&
                      clickable_db[lineIndex][cellIndex] ? (
                        <img
                          src="/mine.png"
                          alt="mine"
                          width="36"
                          height="36"
                        />
                      ) : clickable_db[lineIndex][cellIndex] ? (
                        mines_user[lineIndex][cellIndex] ? (
                          <img
                            width={30}
                            height={30}
                            src={"/flag.png"}
                            alt="ok"
                          ></img>
                        ) : (
                          <></>
                        )
                      ) : mines_db[lineIndex][cellIndex] ? (
                        <img
                          src="/mine_red.png"
                          alt="mine"
                          width="36"
                          height="36"
                        />
                      ) : numbers_db[lineIndex][cellIndex] !== 0 ? (
                        numbers_db[lineIndex][cellIndex]
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Board;
