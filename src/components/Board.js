import React from 'react';
import checkWinner from "../helpers/checkWinner";
import Square from "./Square";

class Board extends React.Component{

    fillInfo = () => {
        const squares = [];
        const { value } = this.props;

        for (let b = 0; b < value; b++) {
            for (let a=0; a< value; a++){
                squares.push({x: a, y: b, value: null})
            };
        }
        return squares;
    };

    constructor(props){
        super(props);

        this.state = {
            squares: this.fillInfo().slice(),
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
        const winner = checkWinner(i, squares, this.props.value)
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            status: winner ? 'Winner is:' + winner : null
        });
    }

    resetGame(){
        this.setState( {
            squares: this.fillInfo().slice(),
            xIsNext: true,
            status: null
        });
    }

    renderSquare(i){
        return <Square 
                    key = {i}
                    value={this.state.squares[i].value} 
                    onClick={() => this.handleClick(i)}
                />
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
        this.setState({
                squares: this.fillInfo().slice()
            }) 
        }
    }

    render(){
        const style = {
            width: (50 * this.props.value) + "px",
            height: (50 * this.props.value) + "px",
        }

        return(
            <>
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

export default Board;