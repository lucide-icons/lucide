import { File } from "lucide-preact";
import { h } from "preact";

function App() {
  return (
    <div className="app">
      <File size={48}>
        <text
          x={7.5}
          y={19}
          font-size={8}
          font-family="Verdana,sans-serif"
          stroke-width={1}
        >
          JS
        </text>
      </File>
    </div>
  );
}

export default App;
