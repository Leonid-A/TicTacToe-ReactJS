import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {checkWinner} from "./checkWin.js"


function Square(props){
    return (
        <div className="item" onClick={props.onClick}>
            {props.value}
        </div>
    )
}

class Board extends React.Component{
    n = 5;
    squares = [];
    fillInfo = () => {
        for (let b = 0; b < this.n; b++) {
            for (let a=0; a< this.n; a++){
                const square = {x: a, y: b, value: null}
                this.squares.push(square)
            };
        }
    };

    constructor(props){
        super(props);
        this.fillInfo();
        this.state = {
            squares: this.squares.slice(),
            xIsNext: true,
            status: null
        };
    } 
    
    handleClick(i){
        if (this.state.squares[i].value || this.state.status){
            return;
        }

        const squares = this.state.squares.slice();
        squares[i]= {
            x: this.state.squares[i].x,
            y: this.state.squares[i].y,
            value: this.state.xIsNext ? "X" : "O"
        };
        const winner = checkWinner(i, squares, this.n)
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            status: winner ? 'Winner is:' + winner : null
        });
    }

    resetGame(){
        this.setState( {
            squares: this.squares,
            xIsNext: true,
            status: null
        });
    }

    renderSquare(i){
        return <Square 
                    key = {i}
                    data-x={this.state.squares[i].x}
                    data-y={this.state.squares[i].y}
                    value={this.state.squares[i].value} 
                    onClick={() => this.handleClick(i)}
                />
    }

    render(){
        const style = {
            width: (50 * this.n) + "px",
            height: (50 * this.n) + "px",
        }
        return(
            <>
                <h1>Tic Tac Toe Game</h1>
                <div style = {style} className="game-block">
                    {this.state.squares.map((item, index) => this.renderSquare(index))}
                </div>
                <div className="center">
                    <button id="reset" onClick={() => this.resetGame()}>RESET</button>
                    <p id="info">{this.state.status} </p>
                </div>
            </>
        )
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);