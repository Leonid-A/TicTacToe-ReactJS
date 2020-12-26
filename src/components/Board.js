import React, { useEffect, useState } from "react";
import checkWinner from "../helpers/checkWinner";
import Square from "./Square";
import Button from "./Button/Button";

function Board(props) {
  const fillInfo = () => {
    const squares = [];
    const { value } = props;

    for (let b = 0; b < value; b++) {
      for (let a = 0; a < value; a++) {
        squares.push({ x: a, y: b, value: null });
      }
    }
    return squares;
  };

  const renderSquare = (i) => {
    return (
      <Square key={i} value={squares[i].value} onClick={() => handleClick(i)} />
    );
  };

  const handleClick = (i) => {
    if (squares[i].value || status.status) {
      return;
    }

    squares[i].value = status.xIsNext ? "X" : "O";
    const winner = checkWinner(i, squares, props.value);
    setSquares(squares);
    setStatus({
      status: winner ? "Winner is:" + winner : null,
      xIsNext: !status.xIsNext,
    });
  };

  const resetGame = () => {
    setSquares(fillInfo());
    setStatus({
      status: null,
      xIsNext: true,
    });
  };

  useEffect(() => {
    setSquares(fillInfo());
  }, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const [squares, setSquares] = useState(fillInfo());
  const [status, setStatus] = useState({
    xIsNext: true,
    status: null,
  });

  const style = {
    width: 50 * props.value + "px",
    height: 50 * props.value + "px",
  };
  return (
    <>
      <div style={style} className="game-block">
        {squares.map((item, index) => renderSquare(index))}
      </div>
      <div className="center">
        <Button class="green" clicked={resetGame} text="RESET" />
        <p id="info">{status.status} </p>
      </div>
    </>
  );
}

export default Board;
