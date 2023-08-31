import { useState } from "react";
import { Smile } from "lucide-react";
import getRandomColor from "./getRandomColor";

function App() {
  const [ color, setColor ] = useState('#3e9392');

  const setNewColor = () => {
    setColor(`#${getRandomColor()}`);
  }

  return (
    <div className="app">
      <Smile color={color} />

      <button onClick={setNewColor}>
        Change color
      </button>
    </div>
  );
}

export default App;
