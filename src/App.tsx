import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import Controls from "./game/utils/controls";
import "./App.css";
import Experience from "./game/Experience";
import { useMemo } from "react";

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
      { name: Controls.run, keys: ["Shift"] },
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
