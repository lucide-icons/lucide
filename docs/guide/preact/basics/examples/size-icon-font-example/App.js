import { h } from "preact";
import { Star } from "lucide-preact";
import "./icon.css";

function App() {
  return (
    <div className="text-wrapper">
      <Star class="my-icon" />
      <div>Yes</div>
    </div>
  );
}

export default App;
