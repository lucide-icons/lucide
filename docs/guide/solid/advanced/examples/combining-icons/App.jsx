import { Scan, User } from "lucide-solid";

function App() {
  return (
    <Scan size={48}>
      <User
        size={12}
        x={6}
        y={6}
        absoluteStrokeWidth
      />
    </Scan>
  );
}

export default App;
