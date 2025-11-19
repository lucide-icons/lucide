import { h } from "preact";
import { ThumbsUp } from "lucide-preact";

function LikeButton() {
  return (
    <button style={{ color: "#fff" }}>
      <ThumbsUp />
      Like
    </button>
  );
}

export default LikeButton;
