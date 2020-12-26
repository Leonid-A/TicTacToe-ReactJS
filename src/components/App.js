import React from "react";
import Board from "./Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.inputValue = 0;
  }

  handleChange = (event) => {
    this.inputValue = event.target.value;
  };

  handleSubmit = () => {
    this.setState({
      value: parseInt(this.inputValue),
    });
  };

  render() {
    return (
      <>
        <h1>Tic Tac Toe Game</h1>
        <h3>Please enter number higher or equal 3 </h3>
        <input type="number" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.value > 2 ? <Board value={this.state.value} /> : null}
      </>
    );
  }
}

export default App;
