import {
  CakeSlice,
  Candy,
  Apple,
  Cookie,
  Martini,
  IceCream2,
  Sandwich,
  Wine,
  Dessert,
} from "lucide-preact";
import { h } from "preact";
import "./icon.css";

function App() {
  return (
    <div className="grid">
      <CakeSlice />
      <Candy />
      <Apple />
      <Cookie />
      <Martini />
      <IceCream2 />
      <Sandwich />
      <Wine />
      <Dessert />
    </div>
  );
}

export default App;
