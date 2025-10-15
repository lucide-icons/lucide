import { Scan, User } from "lucide-react";

function App() {
  return (
    <div className="app">
      <Scan size={48}>
        <User
          size={12}
          x={6}
          y={6}
          absoluteStrokeWidth
        />
      </Scan>
    </div>
  );
}

export default App;
