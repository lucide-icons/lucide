import { h } from "preact";
import { RollerCoaster } from "lucide-preact";

function App() {
  return (
    <div className="app">
      <RollerCoaster
        size={96}
        absoluteStrokeWidth={true}
      />
    </div>
  );
}

export default App;
