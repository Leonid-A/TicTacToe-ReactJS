import { useRef, useState } from "react";
import Board from "./Board";
import Button from "./Button/Button";

function App() {
  const handleSubmit = () => {
    setValue(inputEl.current.valueAsNumber);
  };
  const inputEl = useRef(null);
  const [value, setValue] = useState(0);

  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <h3>Please enter number higher or equal 3 </h3>
      <input type="number" ref={inputEl} />
      <Button class="red" clicked={handleSubmit} text="Submit" />
      {value > 2 ? <Board value={value} /> : null}
    </>
  );
}

export default App;
