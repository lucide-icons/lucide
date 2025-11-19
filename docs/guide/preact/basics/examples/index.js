import { render, h } from "preact";
import App from "./App";
import "./styles.css"

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
