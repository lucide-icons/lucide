import { File } from "lucide-react";

function App() {
  return (
    <div className="app">
      <File size={48}>
        <text
          x={7.5}
          y={19}
          fontSize={8}
          fontFamily="Verdana,sans-serif"
          strokeWidth={1}
        >
          JS
        </text>
      </File>
    </div>
  );
}

export default App;
