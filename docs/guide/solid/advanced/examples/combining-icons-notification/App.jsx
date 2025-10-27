import { Show } from "solid-js";
import { Mail } from "lucide-solid";

function App() {
  const hasUnreadMessages = true;

  return (
    <Mail size={48}>
      <Show when={hasUnreadMessages}>
        <circle
          r="3"
          cx="21"
          cy="5"
          stroke="none"
          fill="#F56565"
        />
      </Show>
    </Mail>
  );
}

export default App;
