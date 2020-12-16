import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <div className="item" onClick={props.onClick}>
            {props.value}
        </div>
    )
}

class Board extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill({x: null, y: null, value: null }),
            xIsNext: true,
            status: null
        };
    } 

    handleClick(i,x,y){
        if (this.state.squares[i].value || this.state.status){
            return;
        }

        const squares = this.state.squares.slice();
        squares[i]= {
            x,
            y,
            value: this.state.xIsNext ? "X" : "O"
        };
        const winner = checkWinner(i, squares)

        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            status: winner ? 'Winner is:' + winner : null
        });
    }

    resetGame(){
        this.setState({
            squares: Array(9).fill({x: null, y: null, value: null }),
            xIsNext: true,
            status: null
        })
    }

    renderSquare(i, x, y){
        return <Square 
                    data-x={x}
                    data-y={y}
                    value={this.state.squares[i].value} 
                    onClick={() => this.handleClick(i,x,y)}
                />
    }

    render(){
        return(
            <>
                <h1>Tic Tac Toe Game</h1>
                <div className="game-block">
                    {this.renderSquare(0,0,0)}
                    {this.renderSquare(1,1,0)}
                    {this.renderSquare(2,2,0)}
                    {this.renderSquare(3,0,1)}
                    {this.renderSquare(4,1,1)}
                    {this.renderSquare(5,2,1)}
                    {this.renderSquare(6,0,2)}
                    {this.renderSquare(7,1,2)}
                    {this.renderSquare(8,2,2)}
                </div>
                <div className="center">
                    <button id="reset" onClick={() => this.resetGame()}>RESET</button>
                    <p id="info">{this.state.status} </p>
                </div>
            </>
        )
    }
}

function checkWinner(i, squares){
    const {value, x, y} = squares[i];
    const length = squares.length;
    let hor = 1;
    let vert = 1;
    let diagR = 1;
    let diagL = 1;
    let winner = null;
    const winCount = 3;
    let clickCount = 0;
    
    for (let j = 0; j < length; j++){
        const current = squares[j];
        if (current.value){
            clickCount++;
        }

        if ( j === i || current.value !== value){
            continue;
        }

        if (current.x === x){
            vert++;
        }
        if (current.y === y){
            hor++;
        }
        if (current.x === current.y && x === y){
            diagL++;
        }
        if (current.x + current.y === 2 && x + y === 2){
            diagL++;
        }
    }

    if ( vert === winCount || hor === winCount || diagL === winCount || diagR === winCount){
        winner = value;
    } else if (clickCount === 9){
        winner = "No one"
    }
    return winner;
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);