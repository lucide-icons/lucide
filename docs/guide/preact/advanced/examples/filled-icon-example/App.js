import { Star, StarHalf } from "lucide-preact";
import { h } from "preact";
import "./icon.css";

function App() {
  return (
    <div className="app">
      <div className="star-rating">
        <div className="stars">
          { Array.from({ length: 5 }, () => (
              <Star fill="#111" strokeWidth={0} />
          ))}
        </div>
        <div className="stars rating">
          <Star fill="yellow" strokeWidth={0} />
          <Star fill="yellow" strokeWidth={0} />
          <StarHalf fill="yellow" strokeWidth={0} />
        </div>
      </div>
    </div>
  );
}

export default App;
