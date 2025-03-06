import { KeyboardControls } from "@react-three/drei";
import "./App.css";
import Experience from "./game/Experience";
import { useMemo } from "react";

function App() {
  const map = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "back", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ],
    []
  );

  return (
    <>
      <KeyboardControls map={map}>
        <Experience />
      </KeyboardControls>
    </>
  );
}

export default App;
