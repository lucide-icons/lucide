import { ThumbsUp } from "lucide-react";
import "./Button.css";

export default function Button() {
  return (
    <button
      style={{ color: '#3e9392' }}
    >
      <ThumbsUp />
      Like
    </button>
  );
}