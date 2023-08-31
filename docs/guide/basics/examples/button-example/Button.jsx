import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import getRandomColor from "./getRandomColor";
import "./Button.css";

function Button() {
  const [ color, setColor ] = useState('#3e9392');

  function setNewColor() {
    setColor(`#${getRandomColor()}`);
  }

  return (
    <button style={{ color }} onClick={setNewColor}>
      <ThumbsUp />
      Like
    </button>
  );
}

export default Button;
